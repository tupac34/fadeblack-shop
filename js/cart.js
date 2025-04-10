function addToCart(id) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  }