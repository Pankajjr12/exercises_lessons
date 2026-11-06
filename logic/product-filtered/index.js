const {products} = require("../filtered-orders/data/orders");

function filterProducts(products, search, category, minPrice, maxPrice) {
  search = search.toLowerCase().trim();
  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes((search || "").toLowerCase());

    // Filter by category
    const categoryMatch = !category || product.category === category;

    // Filter by minimum price
    const minPriceMatch = minPrice === null || product.price >= minPrice;

    // Filter by maximum price
    const maxPriceMatch = maxPrice === null || product.price <= maxPrice;

    return nameMatch && categoryMatch && minPriceMatch && maxPriceMatch;
  });

  return filteredProducts;
}

const result = filterProducts(products, "lap", "Electronics", 10000, 60000);

console.log(result);
