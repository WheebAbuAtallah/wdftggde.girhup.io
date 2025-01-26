// Load Products from localStorage
function loadProducts() {
   let products = JSON.parse(localStorage.getItem("products")) || [];
   let productContainer = document.getElementById("product-list");
   productContainer.innerHTML = "";

   products.forEach((product) => {
       let productCard = document.createElement("div");
       productCard.classList.add("product");

       productCard.innerHTML = `
           <img src="${product.image}" alt="${product.name}" />
           <h3>${product.name}</h3>
           <p>Category: ${product.category}</p>
       `;

       productContainer.appendChild(productCard);
   });
}

// Call loadProducts on page load
document.addEventListener("DOMContentLoaded", loadProducts);
