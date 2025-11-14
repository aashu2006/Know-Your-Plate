export function parseNutrition(product) {
    const n = product?.nutrients || {};

    return {
        calories: n.energy_kcal_100g ?? null,
        fat: n.fat_100g ?? null,
        sugar: n.sugars_100g ?? null,
        protien: n.protiens_100g ?? null,
        salt: n.salt_100g ?? null,
    };
}