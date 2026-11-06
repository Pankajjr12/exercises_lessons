function Header({ cartCount }) {
    return (
      <header className="header">
        <h2>ShopEase</h2>
  
        <div className="cart-icon">
          🛒 Cart ({cartCount})
        </div>
      </header>
    );
  }
  
  export default Header;