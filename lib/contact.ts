// SINGLE SOURCE OF TRUTH FOR PUBLIC CONTACT DETAILS.
//
// The phone is the Google Voice business line, which replaced his personal mobile in
// August 2026. It was hardcoded in 34 places, so it lives here and nowhere else.
//
// Keep the LLC's registered address as it is filed with the Georgia Secretary of State,
// control number 25075361. The website disagreeing with a state record is worse for an
// entity than an out-of-date city, and that address is already public in the filing.
// His RESIDENCE is a different thing and appears nowhere on this site, deliberately.

export const CONTACT = {
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

  // Stripe Payment Link for the $325 website deposit (half of the $650 one-page site). Empty
  // until Elijah creates it in Stripe. Only a buy.stripe.com link goes here. /contact shows a
  // "Pay the deposit" button only when this is set.
  depositLink: "",
} as const;
