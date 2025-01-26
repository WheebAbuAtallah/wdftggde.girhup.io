const clientID = "2ab108dfa385dbd"; // Replace with your Imgur Client ID

// Upload image to Imgur
async function uploadToImgur(imageFile) {
    let formData = new FormData();
    formData.append("image", imageFile);

    let response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
            Authorization: `Client-ID ${clientID}`,
        },
        body: formData,
    });

    let data = await response.json();
    return data.success ? data.data.link : null;
}

// Handle Form Submission
document.getElementById("product-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    let name = document.getElementById("product-name").value;
    let category = document.getElementById("product-category").value;
    let imageFile = document.getElementById("product-image").files[0];

    if (!name || !category || !imageFile) {
        alert("Please fill all fields!");
        return;
    }

    // Upload image to Imgur
    let imageUrl = await uploadToImgur(imageFile);

    if (!imageUrl) {
        alert("Image upload failed!");
        return;
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push({ name, category, image: imageUrl });
    localStorage.setItem("products", JSON.stringify(products));

    alert("Product saved successfully!");
    location.reload(); // Refresh the page
});

// Load Products in Admin Panel
function loadProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let productContainer = document.getElementById("product-list");
    productContainer.innerHTML = "";

    products.forEach((product, index) => {
        let productCard = document.createElement("div");
        productCard.classList.add("product");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <button onclick="editProduct(${index})">Edit</button>
            <button onclick="deleteProduct(${index})">Delete</button>
        `;

        productContainer.appendChild(productCard);
    });
}

// Edit Product
function editProduct(index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let product = products[index];

    let newName = prompt("Edit product name:", product.name);
    let newCategory = prompt("Edit product category:", product.category);

    if (newName && newCategory) {
        product.name = newName;
        product.category = newCategory;
        products[index] = product;
        localStorage.setItem("products", JSON.stringify(products));
        loadProducts();
    }
}

// Delete Product
function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts();
}

// Load products on page load
document.addEventListener("DOMContentLoaded", loadProducts);
