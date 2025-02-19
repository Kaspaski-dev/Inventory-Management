document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();

    const form = document.getElementById("add-product-form");
    const successMessage = document.getElementById("success-message");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const price = parseFloat(document.getElementById("price").value);
        const stock = parseInt(document.getElementById("stock").value);

        if (!name || isNaN(price) || price <= 0 || isNaN(stock) || stock < 0) {
            alert("Invalid input. Please enter valid values.");
            return;
        }

        console.log("Sending data:", { name, price, stock });

        try {
            const response = await fetch("/add_product", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, price, stock }),
            });

            if (response.ok) {
                successMessage.style.display = "block";
                setTimeout(() => successMessage.style.display = "none", 3000);
                fetchProducts();
                event.target.reset();
            } else {
                const errorData = await response.json();
                alert("Error: " + (errorData.message || "Could not add product."));
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to connect to server.");
        }
    });
});

async function fetchProducts() {
    try {
        const response = await fetch("/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();

        const tableBody = document.getElementById("product-table");
        tableBody.innerHTML = "";

        data.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduct(${product.id}, '${product.name}', ${product.price}, ${product.stock})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error loading products:", error);
        alert("Error loading products. Please check the console for details.");
    }
}

}

async function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
        const response = await fetch(`/delete_product/${id}`, { method: "DELETE" });
        if (response.ok) {
            fetchProducts();
        } else {
            alert("Error deleting product.");
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
    }
}
async function editProduct(id, name, price, stock) {
    const newName = prompt("Enter new name:", name);
    const newPrice = parseFloat(prompt("Enter new price:", price));
    const newStock = parseInt(prompt("Enter new stock:", stock));

    if (!newName || isNaN(newPrice) || newPrice <= 0 || isNaN(newStock) || newStock < 0) {
        alert("Invalid input. Please enter valid values.");
        return;
    }

    try {
        const response = await fetch(`/update_product/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newName, price: newPrice, stock: newStock })
        });

        if (response.ok) {
            fetchProducts();
        } else {
            alert("Error updating product.");
        }
    } catch (error) {
        console.error("Error updating product:", error);
        alert("Failed to update product.");
    }
}
