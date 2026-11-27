/* State the guide keeps, read back when Lucy returns to it. The email (entry screen) clears it. */
export const SLUG = "flow-2-first-visit-prep"

export const BRING = [
  { id: "b1", done: true, label: "Previous vet or shelter records", note: "Upload them in the portal or bring a copy" },
  { id: "b2", done: true, label: "Vaccination history", note: "Including the date of the last rabies shot" },
  { id: "b3", done: false, label: "Leash, harness or carrier", note: "Keeps Waffles safe in the waiting room" },
  { id: "b4", done: false, label: "Current food and medications", note: "Names and amounts, or a photo of the labels" },
  { id: "b5", done: false, label: "Favourite treats or toy", note: "Helps make the visit a good experience" },
  { id: "b6", done: false, label: "Your questions", note: "Jot them down so nothing gets missed" },
]

export const TEAM = [
  { initials: "PS", name: "Dr. Priya Shah", role: "Veterinarian · Waffles’ primary vet" },
  { initials: "VT", name: "[VET TECH NAME]", role: "Veterinary technician" },
  { initials: "CC", name: "[CLIENT CARE NAME]", role: "Client care · check-in and billing" },
]

export type Temper = "calm" | "anxious" | "reactive"

export const DEFAULTS = {
  bring: Object.fromEntries(BRING.map((b) => [b.id, b.done])) as Record<string, boolean>,
  temper: "anxious" as Temper,
  open: ["anxious"] as string[],
  notes: "",
}

export function clearGuideState() {
  try { sessionStorage.removeItem(`proto:${SLUG}`) } catch { /* storage off */ }
}
