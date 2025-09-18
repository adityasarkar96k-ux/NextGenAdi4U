// Cart localStorage मध्ये save होईल
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Cart count update
function updateCartCount() {
  document.querySelectorAll("#cart-count").forEach(el => {
    el.innerText = cart.length;
  });
}
updateCartCount();

// Add to Cart
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(name + " added to cart!");
}

// Show Cart
if (document.getElementById("cart-items")) {
  let cartItemsDiv = document.getElementById("cart-items");
  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach((item, index) => {
    let div = document.createElement("div");
    div.innerHTML = `
      <p>${item.name} - ₹${item.price} 
      <button onclick="removeFromCart(${index})">❌ Remove</button></p>`;
    cartItemsDiv.appendChild(div);

    totalItems++;
    totalPrice += item.price;
  });

  document.getElementById("total-items").innerText = totalItems;
  document.getElementById("total-price").innerText = totalPrice;
}

// Remove from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

// Buy Now
function buyNow() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Redirecting to payment gateway...");
    // इथे payment integration नंतर करू शकतो
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  }
}
