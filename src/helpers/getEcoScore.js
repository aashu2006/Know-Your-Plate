export function getEcoScore(product) {
    const eco = product?.ecoscore_data?.agribalyse || {};

    return {
        grade: product?.ecoscore_grade || "unknown",
        co2: eco.co2_total ?? null,
        waterUsage: eco.water_usage ?? null,
    };
}