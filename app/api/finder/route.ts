import { NextRequest, NextResponse } from "next/server";

const TYPE_MAP: Record<string, string> = {
  hair_care: "Salon", beauty_salon: "Salon", hair_salon: "Salon",
  barber_shop: "Barber",
  nail_salon: "Nail Salon",
  spa: "Spa", massage_therapist: "Wellness", physiotherapist: "Wellness",
  plumber: "Contractor", electrician: "Contractor", roofing_contractor: "Contractor",
  painter: "Contractor", locksmith: "Contractor",
  moving_company: "Moving",
  car_repair: "Auto", car_wash: "Auto",
  laundry: "Cleaning", veterinary_care: "Pet", pet_store: "Pet",
  florist: "Florist", gym: "Fitness", real_estate_agency: "Real Estate",
};

// Only use type strings confirmed valid in Places API (New)
const TYPE_GROUPS = [
  ["plumber", "electrician", "roofing_contractor", "painter", "locksmith", "moving_company"],
  ["barber_shop", "hair_care", "beauty_salon", "nail_salon", "spa"],
  ["laundry", "car_wash", "car_repair", "pet_store", "veterinary_care"],
  ["florist", "gym", "physiotherapist", "real_estate_agency"],
];

const FIELD_MASK = [
  "places.displayName",
  "places.formattedAddress",
  "places.types",
  "places.rating",
  "places.userRatingCount",
  "places.websiteUri",
  "places.regularOpeningHours",
  "places.location",
  "places.nationalPhoneNumber",
  "places.businessStatus",
].join(",");

function distanceMiles(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dlat = (lat2 - lat1) * 111320;
  const dlng = (lng2 - lng1) * 111320 * Math.cos((lat1 * Math.PI) / 180);
  return Math.sqrt(dlat * dlat + dlng * dlng) / 1609.34;
}

function scoreAndNotes(p: Record<string, unknown>, hasWebsite: boolean, reviews: number, rating: number, hasHours: boolean) {
  let score = 0;
  const parts: string[] = [];

  if (!hasWebsite) { score += 40; parts.push("No website"); }
  if (reviews === 0) { score += 25; parts.push("Zero Google reviews"); }
  else if (reviews < 10) { score += 15; parts.push(`Only ${reviews} reviews`); }
  else if (reviews < 25) { score += 8; parts.push(`${reviews} reviews — room to grow`); }
  if (rating > 0 && rating < 4.0) { score += 10; parts.push(`${rating}★ rating could improve`); }
  if (!hasHours) { score += 12; parts.push("No hours on Google"); }
  if (!p.nationalPhoneNumber) { score += 8; parts.push("No phone listed"); }

  if (parts.length === 0) parts.push("Solid online presence — lower priority");

  return { score: Math.min(score, 100), notes: parts.join(". ") + "." };
}

async function searchGroup(
  apiKey: string, lat: number, lng: number, radius: number, types: string[]
): Promise<Record<string, unknown>[]> {
  try {
    const res = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      body: JSON.stringify({
        locationRestriction: { circle: { center: { latitude: lat, longitude: lng }, radius } },
        includedTypes: types,
        maxResultCount: 20,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error(`Places API error for types [${types.join(",")}]:`, data.error?.message);
      return [];
    }
    return (data.places ?? []) as Record<string, unknown>[];
  } catch (e) {
    console.error(`Fetch error for types [${types.join(",")}]:`, e);
    return [];
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get("lat") ?? "0");
  const lng = parseFloat(searchParams.get("lng") ?? "0");
  const radius = parseInt(searchParams.get("radius") ?? "5000");

  if (!lat || !lng) {
    return NextResponse.json({ error: "lat and lng are required" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const groupResults = await Promise.all(
    TYPE_GROUPS.map(group => searchGroup(apiKey, lat, lng, radius, group))
  );

  // Deduplicate by formatted address
  const seen = new Set<string>();
  const allPlaces: Record<string, unknown>[] = [];
  for (const group of groupResults) {
    for (const p of group) {
      if ((p.businessStatus as string) === "CLOSED_PERMANENTLY") continue;
      const key = (p.formattedAddress as string) ?? (p.displayName as { text: string })?.text ?? "";
      if (key && !seen.has(key)) {
        seen.add(key);
        allPlaces.push(p);
      }
    }
  }

  const businesses = allPlaces.map((p) => {
    const loc = p.location as { latitude: number; longitude: number };
    const dist = distanceMiles(lat, lng, loc.latitude, loc.longitude).toFixed(1);
    const hasWebsite = !!p.websiteUri;
    const hasHours = !!(p.regularOpeningHours);
    const reviews = (p.userRatingCount as number) || 0;
    const rating = (p.rating as number) || 0;

    const types = (p.types as string[]) || [];
    let displayType = "Business";
    for (const t of types) {
      if (TYPE_MAP[t]) { displayType = TYPE_MAP[t]; break; }
    }

    const googleProfile = (!hasHours && !p.nationalPhoneNumber) ? "none" as const
      : (!hasWebsite) ? "partial" as const
      : "complete" as const;

    const { score, notes } = scoreAndNotes(p, hasWebsite, reviews, rating, hasHours);

    return {
      name: (p.displayName as { text: string })?.text ?? "Unknown",
      type: displayType,
      distance: `${dist} mi`,
      reviews, rating, hasWebsite, hasSocial: false, hasBooking: false,
      googleProfile, score,
      address: (p.formattedAddress as string) ?? "",
      notes,
    };
  });

  businesses.sort((a, b) => b.score - a.score);

  return NextResponse.json({ businesses: businesses.slice(0, 40), total: allPlaces.length });
}
