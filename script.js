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
// Get cart data from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsContainer = document.getElementById("cart-items");
const totalItems = document.getElementById("total-items");
const totalPrice = document.getElementById("total-price");

// Function to render cart items
function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span>₹${item.price * item.quantity}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  totalItems.textContent = cart.length;
  totalPrice.textContent = total;
}

// Remove item function
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Run renderCart when page loads
renderCart();
