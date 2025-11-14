export function getAdditives(product) {
    return product.additives_original_tags || product.additives_tags || [];
}