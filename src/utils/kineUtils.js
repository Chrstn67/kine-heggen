import { specialites } from "../data/specialites.js";

export function getSpecialitesByKine(kineId) {
  return specialites.filter((s) => s.kineIds.includes(kineId));
}
