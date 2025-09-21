let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {
  cart.push({name, price, image});
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  window.location.href = "cart.html";
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function renderCart() {
  let container = document.getElementById("cart-items");
  let totalBox = document.getElementById("total");
  let orderDetails = document.getElementById("orderDetails");

  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    container.innerHTML += `
      <div class="cart-row">
        <img src="${item.image}" width="50"> 
        ${item.name} - $${item.price} 
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>`;
  });

  if (totalBox) totalBox.innerText = "Total: $" + total;

  if (orderDetails) {
    orderDetails.value = cart.map(p => `${p.name} - $${p.price}`).join("\n") + `\nTotal: $${total}`;
  }
}

function updateCartCount() {
  let count = document.getElementById("cart-count");
  if (count) count.innerText = cart.length;
}

window.onload = function() {
  renderCart();
  updateCartCount();
};

function startPayment() {
  alert("Redirecting to Payment Gateway (Demo Mode)...");

  // SSLCommerz demo redirect (open in new tab or same tab)
  window.location.href = "https://sandbox.sslcommerz.com/EasyCheckOut/testcde123";

  // Simulate payment success after 5 sec
  setTimeout(() => {
    alert("✅ Payment Successful! Confirming your order...");
    document.getElementById("finalSubmit").click();
  }, 5000);
}
