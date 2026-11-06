import { useState } from "react";

import productsData from "./data/products.json";

import Header from "./components/Header";
import Filter from "./components/Filter";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

import "./App.css";

function App() {
  // State variables
  const [products] = useState(productsData);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [sort, setSort] = useState("");

  const [inStock, setInStock] = useState(false);

  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Search, filter and sort products
  let filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category === "All" || product.category === category;

    const matchStock = !inStock || product.inStock === true;

    return matchSearch && matchCategory && matchStock;
  });

  // Sort by price
  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Calculate cart count
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="app">
      <Header cartCount={cartCount} />

      <div className="container">
        <h1>Our Products</h1>

        <p>Discover our latest collection</p>

        <Filter
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
          inStock={inStock}
          setInStock={setInStock}
        />

        <ProductList products={filteredProducts} addToCart={addToCart} />

        <Cart cart={cart} removeFromCart={removeFromCart} />
      </div>
    </div>
  );
}

export default App;
