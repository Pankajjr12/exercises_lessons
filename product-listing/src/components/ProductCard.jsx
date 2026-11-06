function ProductCard({ product, addToCart }) {
    return (
      <div className="product-card">
  
        <img src={product.image} alt={product.name} />
  
        <div className="product-info">
  
          <h3>{product.name}</h3>
  
          <p>{product.description}</p>
  
          <p className="category">
            {product.category}
          </p>
  
          <h3>₹{product.price}</h3>
  
          <button onClick={() => addToCart(product)}>
            Add To Cart
          </button>
  
        </div>
  
      </div>
    );
  }
  
  export default ProductCard;