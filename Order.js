const productOptions = {
    cakes: [
        { name: "Black Forest Cake", price: 600 },
        { name: "Ube Cake", price: 650 },
        { name: "Red Velvet Cake", price: 700 }
    ],
    cupcakes: [
        { name: "Red Velvet Cupcakes", price: 300 },
        { name: "Ube Cupcakes", price: 350 },
        { name: "Chocolate Cupcakes", price: 320 }
    ],
    pies: [
        { name: "Classic Apple Pie", price: 250 },
        { name: "Lemon Meringue Pie", price: 280 },
        { name: "Pumpkin Pie", price: 220 }
    ],
    donuts: [
        { name: "Glazed Donuts", price: 150 },
        { name: "Chocolate Donuts", price: 180 },
        { name: "Cinnamon Sugar Donuts", price: 160 }
    ],
    cookies: [
        { name: "Chocolate Chip Cookies", price: 200 },
        { name: "Oatmeal Raisin Cookies", price: 220 },
        { name: "Double Chocolate Cookies", price: 230 }
    ]
};

// Update product options based on selected category
function updateProducts() {
    const categorySelect = document.getElementById("category");
    const productSelect = document.getElementById("product");
    const priceInput = document.getElementById("price");

    const selectedCategory = categorySelect.value;
    productSelect.innerHTML = '<option value="" disabled selected>Select a product</option>';

    if (productOptions[selectedCategory]) {
        productOptions[selectedCategory].forEach((product) => {
            const option = document.createElement("option");
            option.value = product.name;
            option.textContent = product.name;
            option.setAttribute("data-price", product.price);
            productSelect.appendChild(option);
        });
    }

    priceInput.value = 0;
}

// Update price when a product is selected
document.getElementById("product").addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex];
    const price = selectedOption.getAttribute("data-price");
    document.getElementById("price").value = price;

    updateTotalAmount();
});

// Update total and downpayment
document.getElementById("quantity").addEventListener("input", updateTotalAmount);

function updateTotalAmount() {
    const price = parseFloat(document.getElementById("price").value || 0);
    const quantity = parseInt(document.getElementById("quantity").value || 1);
    const total = price * quantity;
    document.getElementById("total-amount").value = total.toFixed(2);  // Ensures two decimal places
    document.getElementById("downpayment").value = (total * 0.5).toFixed(2);  // Ensures two decimal places
}

document.querySelector("form").addEventListener("submit", function (e) {
    const total = parseFloat(document.getElementById("total-amount").value || 0);
    const requiredDownpayment = total * 0.5;
    const enteredDownpayment = parseFloat(document.getElementById("downpayment-amount").value || 0);

    if (enteredDownpayment < requiredDownpayment) {
        e.preventDefault();
        alert("You must pay at least 50% of the total amount to reserve the order.");
    } else {
        e.preventDefault(); // Prevent actual form submission for demo
        alert("Order placed! Please wait for the approval through your provided contact number. Thank you!");
        // Optionally, you can reset the form or redirect after a timeout
        this.reset(); // Reset the form fields
        document.getElementById("total-amount").value = "";
        document.getElementById("downpayment").value = "";
    }
});

document.addEventListener("DOMContentLoaded", function () {

    // Function to add a new product form
    document.getElementById("add-product-btn").addEventListener("click", function () {
        const container = document.getElementById("products-container");
        const productGroups = container.querySelectorAll(".product-group");
        const lastGroup = productGroups[productGroups.length - 1];
        const clone = lastGroup.cloneNode(true);

        // Reset form values in the cloned element
        clone.querySelectorAll("select, input").forEach((input) => {
            if (input.tagName === "SELECT") {
                input.selectedIndex = 0;  // Reset the category and product selection
            } else {
                input.value = input.name === "price[]" ? "0" : "";
            }
        });

        // Append the cloned product group to the container
        container.appendChild(clone);
    });

    // Function to remove the last product form
    document.getElementById("remove-product-btn").addEventListener("click", function () {
        const container = document.getElementById("products-container");
        const productGroups = container.querySelectorAll(".product-group");
        if (productGroups.length > 1) {
            container.removeChild(productGroups[productGroups.length - 1]);
        }
    });
});
// Update price when a product is selected
document.getElementById("product").addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex];
    const price = parseFloat(selectedOption.getAttribute("data-price"));
    document.getElementById("price").value = price.toFixed(2);  // Ensures two decimal places

    updateTotalAmount();
});
