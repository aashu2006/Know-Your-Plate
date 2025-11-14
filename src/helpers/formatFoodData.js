import { parseNutrition } from "./parseNutrition.js";
import { getEcoScore } from "./getEcoScore.js";
import { getAdditives } from "./getAdditives.js";

export function formatFoodData(product) {
    if (!product) return null;

    return {
        name: product.product_name || "UNknown Product",
        brand: product.brands || "Unknown",
        image: product.image_front_url || "",
        nutriScore: product.nutriscore_grade || "unknown",

        nutrition: parseNutrition(product),
        eco: getEcoScore(product),
        additives: getAdditives(product),

        ingredients: product.ingredients_text || "No ingredients listed",
        categories: product.categories || "",
    };
}
