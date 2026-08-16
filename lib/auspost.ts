/**
 * Australia Post Shipping & Volumetric Freight Utilities
 * Cubic weight factor: 250 kg / m^3
 */

export interface PackageDimensions {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  weightGrams: number;
}

export function calculateCubicWeightGrams(lengthCm: number, widthCm: number, heightCm: number): number {
  // Cubic weight (kg) = (Length (m) * Width (m) * Height (m)) * 250 kg/m^3
  // Cubic weight (g) = (Length (cm) * Width (cm) * Height (cm) / 1,000,000) * 250,000
  // = (L * W * H) * 0.25
  return Math.ceil((lengthCm * widthCm * heightCm) * 0.25);
}

export function calculateChargeableWeightGrams(pkg: PackageDimensions): number {
  const cubicWeightG = calculateCubicWeightGrams(pkg.lengthCm, pkg.widthCm, pkg.heightCm);
  return Math.max(pkg.weightGrams, cubicWeightG);
}

export async function getShippingQuote(_postcode: string, _chargeableWeightG: number) {
  // Placeholder for Australia Post PAC API integration
  return {
    carrier: "AusPost",
    postcode: _postcode,
    chargeableWeightG: _chargeableWeightG,
    costCents: 1000,
  };
}
