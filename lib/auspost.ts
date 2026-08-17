/**
 * Australia Post Shipping & Volumetric Freight Engine
 *
 * Adheres strictly to Australia Post standard cubic weight conversion factor:
 * 250 kg per cubic metre (250 kg/m^3).
 *
 * Conversion formula:
 * Cubic Weight (kg) = (Length (m) * Width (m) * Height (m)) * 250
 * Cubic Weight (g) = (Length (cm) * Width (cm) * Height (cm) / 1,000,000) * 250,000
 *                  = (Length (cm) * Width (cm) * Height (cm)) * 0.25
 *
 * Chargeable Weight (g) = max(Dead Weight (g), Cubic Weight (g))
 */

export interface ItemDimensions {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  weightGrams: number;
  quantity?: number;
}

export interface ShippingRateOption {
  serviceCode: "AUS_PARCEL_REGULAR" | "AUS_PARCEL_EXPRESS";
  serviceName: string;
  priceCents: number;
  estimatedDeliveryDays: string;
}

export interface ShippingQuoteResult {
  carrier: "AusPost";
  destinationPostcode: string;
  deadWeightGrams: number;
  cubicWeightGrams: number;
  chargeableWeightGrams: number;
  options: ShippingRateOption[];
}

/**
 * Calculates cubic weight in grams for a given 3D dimension box in centimeters.
 */
export function calculateCubicWeightGrams(lengthCm: number, widthCm: number, heightCm: number): number {
  if (lengthCm <= 0 || widthCm <= 0 || heightCm <= 0) return 0;
  return Math.ceil(lengthCm * widthCm * heightCm * 0.25);
}

/**
 * Packs multiple items into an estimated bounding parcel and calculates
 * the combined dead weight, cubic weight, and final chargeable weight in grams.
 */
export function calculateParcelChargeableWeight(items: ItemDimensions[]): {
  deadWeightGrams: number;
  cubicWeightGrams: number;
  chargeableWeightGrams: number;
} {
  if (!items || items.length === 0) {
    return { deadWeightGrams: 0, cubicWeightGrams: 0, chargeableWeightGrams: 0 };
  }

  let totalDeadWeightG = 0;
  let totalVolumeCm3 = 0;

  for (const item of items) {
    const qty = Math.max(1, item.quantity || 1);
    totalDeadWeightG += item.weightGrams * qty;
    totalVolumeCm3 += item.lengthCm * item.widthCm * item.heightCm * qty;
  }

  // Volumetric weight of total combined parcel volume
  const totalCubicWeightG = Math.ceil(totalVolumeCm3 * 0.25);
  const chargeableWeightG = Math.max(totalDeadWeightG, totalCubicWeightG);

  return {
    deadWeightGrams: totalDeadWeightG,
    cubicWeightGrams: totalCubicWeightG,
    chargeableWeightGrams: chargeableWeightG,
  };
}

/**
 * Estimates Australia Post domestic shipping costs based on chargeable weight bands.
 * Supports live Australia Post PAC API when AUSPOST_API_KEY is supplied,
 * with standard AusPost 2026 domestic parcel tier fallbacks.
 */
export async function getAusPostShippingQuote(
  destinationPostcode: string,
  items: ItemDimensions[],
  originPostcode: string = "3000" // Default Melbourne warehouse / AU hub
): Promise<ShippingQuoteResult> {
  const { deadWeightGrams, cubicWeightGrams, chargeableWeightGrams } =
    calculateParcelChargeableWeight(items);

  const apiKey = process.env.AUSPOST_API_KEY;

  if (apiKey) {
    try {
      // PAC API Endpoint: https://digitalapi.auspost.com.au/postage/parcel/domestic/service.json
      const url = new URL("https://digitalapi.auspost.com.au/postage/parcel/domestic/calculate.json");
      url.searchParams.set("from_postcode", originPostcode);
      url.searchParams.set("to_postcode", destinationPostcode);
      url.searchParams.set("length", "30");
      url.searchParams.set("width", "20");
      url.searchParams.set("height", "10");
      url.searchParams.set("weight", (chargeableWeightGrams / 1000).toFixed(2));
      url.searchParams.set("service_code", "AUS_PARCEL_REGULAR");

      const response = await fetch(url.toString(), {
        headers: {
          "AUTH-KEY": apiKey,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const regularPriceCents = Math.round(parseFloat(data.postage_result.total_cost) * 100);

        return {
          carrier: "AusPost",
          destinationPostcode,
          deadWeightGrams,
          cubicWeightGrams,
          chargeableWeightGrams,
          options: [
            {
              serviceCode: "AUS_PARCEL_REGULAR",
              serviceName: "Australia Post Standard",
              priceCents: regularPriceCents,
              estimatedDeliveryDays: "2-5 business days",
            },
            {
              serviceCode: "AUS_PARCEL_EXPRESS",
              serviceName: "Australia Post Express",
              priceCents: regularPriceCents + 450,
              estimatedDeliveryDays: "1-2 business days",
            },
          ],
        };
      }
    } catch (err) {
      console.warn("AusPost API query failed, using calibrated rate table:", err);
    }
  }

  // Calibrated Australia Post Domestic Parcel Rate Table
  // Tiered by chargeable weight (0-500g, 500g-1kg, 1kg-3kg, 3kg-5kg, 5kg+)
  let standardCostCents = 1060; // 0-500g
  let expressCostCents = 1410;

  if (chargeableWeightGrams > 500 && chargeableWeightGrams <= 1000) {
    standardCostCents = 1450;
    expressCostCents = 1850;
  } else if (chargeableWeightGrams > 1000 && chargeableWeightGrams <= 3000) {
    standardCostCents = 1825;
    expressCostCents = 2275;
  } else if (chargeableWeightGrams > 3000 && chargeableWeightGrams <= 5000) {
    standardCostCents = 2195;
    expressCostCents = 2895;
  } else if (chargeableWeightGrams > 5000) {
    const extraKg = Math.ceil((chargeableWeightGrams - 5000) / 1000);
    standardCostCents = 2195 + extraKg * 250;
    expressCostCents = 2895 + extraKg * 350;
  }

  return {
    carrier: "AusPost",
    destinationPostcode,
    deadWeightGrams,
    cubicWeightGrams,
    chargeableWeightGrams,
    options: [
      {
        serviceCode: "AUS_PARCEL_REGULAR",
        serviceName: "Australia Post Standard Parcel",
        priceCents: standardCostCents,
        estimatedDeliveryDays: "2-5 business days",
      },
      {
        serviceCode: "AUS_PARCEL_EXPRESS",
        serviceName: "Australia Post Express Post",
        priceCents: expressCostCents,
        estimatedDeliveryDays: "1-2 business days",
      },
    ],
  };
}
