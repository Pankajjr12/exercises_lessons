function Cart({ cart, removeFromCart }) {

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  
    return (
      <div className="cart">
  
        <h2>Shopping Cart</h2>
  
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
  
              <span>
                {item.name} x {item.quantity}
              </span>
  
              <span>
                ₹{item.price * item.quantity}
              </span>
  
              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
  
            </div>
          ))
        )}
  
        <h3>Total: ₹{total.toLocaleString("en-IN")}</h3>
  
      </div>
    );
  }
  
  export default Cart;