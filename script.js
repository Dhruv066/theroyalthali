// Prices map — converted to INR (₹)
const prices = {
  samosa: 99,
  "spring-rolls": 119,
  bruschetta: 149,
  "garlic-bread": 89,
  "stuffed-mushrooms": 179,
  "tomato-soup": 159,
  "chicken-soup": 189,
  "mushroom-soup": 219,
  "vegetable-soup": 149,
  "sweet-corn-soup": 179,
  "lentil-soup": 129,
  "caesar-salad": 219,
  "greek-salad": 239,
  "garden-salad": 189,
  "fruit-salad": 159,
  "pasta-salad": 199,
  "paneer-butter-masala": 299,
  "chole-bhature": 269,
  "vegetable-curry": 249,
  "dal-makhani": 219,
  "aloo-gobi": 239,
  "baingan-bharta": 209,
  "butter-chicken": 349,
  "grilled-chicken": 329,
  "fish-curry": 389,
  "chicken-biryani": 299,
  "mutton-rogan-josh": 429,
  "egg-curry": 259,
  "vegetable-biryani": 269,
  "chicken-biryani2": 299,
  "egg-fried-rice": 249,
  "jeera-rice": 199,
  "peas-pulao": 239,
  "butter-naan": 79,
  "garlic-naan": 89,
  roti: 49,
  paratha: 69,
  chapati: 39,
  "stuffed-naan": 99,
  "gulab-jamun": 129,
  "ice-cream": 99,
  rasmalai: 149,
  kheer: 119,
  "chocolate-brownie": 159,
  "fruit-salad2": 129,
  coffee: 79,
  tea: 49,
  lemonade: 69,
  soda: 39,
  milkshake: 99,
  juice: 79,
  burger: 159,
  pizza: 249,
  "french-fries": 99,
  "hot-dog": 129,
  sandwich: 149,
  tacos: 179
};

// The cart array holds {id, qty}
let cart = [];

// Add or update item in cart
function addToCart(itemId, qty) {
  let existing = cart.find(item => item.id === itemId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: itemId, qty: qty });
  }
}

// Render the cart list UI
function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";
  if (cart.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty</li>";
    return;
  }
  cart.forEach(({ id, qty }) => {
    let price = prices[id];
    let itemText = id.replace(/-/g, " ") + ` - Qty: ${qty} - ₹${(price * qty).toFixed(0)}`;
    let li = document.createElement("li");
    li.textContent = itemText;
    cartList.appendChild(li);
  });
}

// Setup event listeners for buttons
function setup() {
  // Add to Cart buttons in each food section
  document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      const box = button.closest(".boxes");
      const inputs = box.querySelectorAll("input.inpbox");

      inputs.forEach(input => {
        let qty = parseInt(input.value);
        if (!isNaN(qty) && qty > 0) {
          addToCart(input.id, qty);
          input.value = ""; // reset input after adding to cart
        }
      });

      renderCart();
    });
  });

  // Order button to sum prices and show success message
  document.getElementById("order-btn").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before ordering.");
      return;
    }
    let totalPrice = cart.reduce((acc, item) => acc + prices[item.id] * item.qty, 0);
    alert(`Order successful! Total Price: ₹${totalPrice.toFixed(0)}`);
    cart = [];
    renderCart();
  });

  // Initial render empty cart
  renderCart();
}

// Run setup after DOM loads
document.addEventListener("DOMContentLoaded", setup);
