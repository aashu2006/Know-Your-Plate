import {createContext, useContext, useState, useCallback } from "react";
import { fetchFood } from "../api/fetchFood";
import { formatFoodData  } from "../helpers/formatFoodData";

const FoodContext = createContext();

export function FoodProvider({ children }) {
    const [foodData, setFoodData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchFood = useCallback(async (query) => {
        if (!query || query.trim() === '') {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");
        setFoodData(null);

        try {
            const raw = await fetchFood(query);

            // OpenFoodFacts API returns { products: [...] }
            const products = raw?.products || raw || [];
            
            if (!products || products.length === 0) {
                setError("No food found.");
                setLoading(false);
                return;
            }

            const product = products[0];
            
            // Normalize the product data structure for the helpers
            // OpenFoodFacts uses 'nutriments' but helpers expect 'nutrients'
            const rawNutriments = product.nutriments || product.nutrients || {};
            
            // Normalize nutriments keys - OpenFoodFacts may use dashes or different formats
            // Also handle cases where values are objects with 'value' property
            const normalizeValue = (val) => {
                if (val === null || val === undefined) return null;
                if (typeof val === 'object' && val.value !== undefined) {
                    return val.value;
                }
                return val;
            };
            
            const normalizedNutriments = {};
            if (rawNutriments && typeof rawNutriments === 'object') {
                // Map common OpenFoodFacts field variations
                Object.keys(rawNutriments).forEach(key => {
                    // Convert 'energy-kcal_100g' to 'energy_kcal_100g', etc.
                    const normalizedKey = key.replace(/-/g, '_');
                    normalizedNutriments[normalizedKey] = normalizeValue(rawNutriments[key]);
                });
                
                // Also try direct mappings for common fields with fallbacks
                const getNutrient = (...keys) => {
                    for (const k of keys) {
                        const val = rawNutriments[k];
                        if (val !== null && val !== undefined) {
                            return normalizeValue(val);
                        }
                    }
                    return null;
                };
                
                normalizedNutriments.energy_kcal_100g = normalizedNutriments.energy_kcal_100g || 
                    getNutrient('energy-kcal_100g', 'energy-kcal', 'energy_kcal_100g', 'energy_kcal') || null;
                normalizedNutriments.fat_100g = normalizedNutriments.fat_100g || 
                    getNutrient('fat_100g', 'fat') || null;
                normalizedNutriments.sugars_100g = normalizedNutriments.sugars_100g || 
                    getNutrient('sugars_100g', 'sugars') || null;
                normalizedNutriments.protiens_100g = normalizedNutriments.protiens_100g || 
                    getNutrient('proteins_100g', 'proteins', 'protein_100g', 'protein') || null;
                normalizedNutriments.salt_100g = normalizedNutriments.salt_100g || 
                    getNutrient('salt_100g', 'salt') || null;
            }
            
            const normalizedProduct = {
                ...product,
                nutrients: normalizedNutriments,
                // Ensure ecoscore_data exists
                ecoscore_data: product.ecoscore_data || {},
                ecoscore_grade: product.ecoscore_grade || null,
            };
            
            console.log('Raw product nutriments:', rawNutriments); // Debug
            console.log('Normalized nutriments:', normalizedNutriments); // Debug
            console.log('Normalized product:', normalizedProduct); // Debug
            
            const cleanData = formatFoodData(normalizedProduct);
            console.log('Formatted food data:', cleanData); // Debug

            setFoodData(cleanData);
        } catch (err) {
            console.error('Error fetching food:', err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <FoodContext.Provider value={{ foodData, loading, error, searchFood }}>
            {children}
        </FoodContext.Provider>

    );

}

export function useFood() {
    const context = useContext(FoodContext);
    if (!context) {
        throw new Error('useFood must be used within FoodProvider');
    }
    return context;
}