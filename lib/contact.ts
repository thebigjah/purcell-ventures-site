// SINGLE SOURCE OF TRUTH FOR PUBLIC CONTACT DETAILS.
//
// The phone number was hardcoded in 34 places. Elijah asked to replace every public
// instance with a Google Voice business line so his personal mobile stops being a
// searchable fact about him, and a 34-place find-and-replace is exactly how one gets
// missed and sits on a page for a year.
//
// When the Google Voice number exists, change PHONE here and nothing else.
//
// Keep the LLC's registered address as it is filed with the Georgia Secretary of State,
// control number 25075361. The website disagreeing with a state record is worse for an
// entity than an out-of-date city, and that address is already public in the filing.
// His RESIDENCE is a different thing and appears nowhere on this site, deliberately.

export const CONTACT = {
  // TODO(elijah): swap to the Google Voice line. This is currently his mobile.
  phone: "(205) 462-7839",
  phoneE164: "+12054627839",
  email: "elijah@purcell-ventures.com",

  // The person
  personCity: "Tuscaloosa",
  personRegion: "AL",

  // The company, as filed
  llcCity: "Acworth",
  llcRegion: "GA",
  llcControlNumber: "25075361",

  serviceArea: "Metro Atlanta and Tuscaloosa",
} as const;
