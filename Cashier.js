const products = {
    cakes: [
        { id: 1, name: 'Black Forest Cake', price: 600, image: 'https://livforcake.com/wp-content/uploads/2017/07/black-forest-cake-6-768x1152.jpg' },
        { id: 2, name: 'Ube Cake', price: 650, image: 'https://th.bing.com/th/id/R.9ab7dd18e6b0c18326941a71b8f912ec?rik=iEkgNLSZhDUV1A&riu=http%3a%2f%2fflavorsoflife.com.ph%2fwp-content%2fuploads%2f2020%2f01%2fimage2-resized.jpg&ehk=bzqGPXcFGrvcj8evI3ZXaFBQ3Hc3DtQG7UIB3eDNX14%3d&risl=&pid=ImgRaw&r=0' },
        { id: 3, name: 'Red Velvet Cake', price: 700, image: 'https://bakeitwithlove.com/wp-content/uploads/2022/09/red-velvet-cake-sq.jpg' }
    ],
    cupcakes: [
        { id: 4, name: 'Red V Cupcakes (dozen)', price: 300, image: 'https://www.rainbownourishments.com/wp-content/uploads/2023/02/vegan-red-velvet-cupcakes-1.jpg' },
        { id: 5, name: 'Ube Cupcakes (dozen)', price: 350, image: 'https://th.bing.com/th/id/OIP.dg4gWHVvcHyfMngo2WqozAHaHa?rs=1&pid=ImgDetMain' },
        { id: 6, name: 'Choco Cupcakes (dozen)', price: 320, image: 'https://glutenfreeonashoestring.com/wp-content/uploads/2017/09/Hero-Chocolate-Cupcake.jpg' }
    ],
    pies: [
        { id: 7, name: 'Classic Apple Pie (slice)', price: 75, image: 'https://th.bing.com/th/id/OIP.Yt59z6BzSJNBCIARa9K9ygHaHa?w=1024&h=1024&rs=1&pid=ImgDetMain' },
        { id: 8, name: 'Lemon Meringue Pie (slice)', price: 85, image: 'https://www.healthbenefitstimes.com/recipe/wp-content/uploads/2018/06/How-to-Make-Luscious-Meringue-Lemon-Pie-1024x993.jpg' },
        { id: 9, name: 'Pumpkin Pie (slice)', price: 80, image: 'https://sugarspunrun.com/wp-content/uploads/2021/09/Best-Pumpkin-Pie-Recipe-1-of-1.jpg' }
    ],
    donuts: [
        { id: 10, name: 'Glazed Donuts (dozen)', price: 150, image: 'https://www.sprinkleofthis.com/wp-content/uploads/2020/03/DSC_9390-2.jpg' },
        { id: 11, name: 'Chocolate Donuts (dozen)', price: 180, image: 'https://prettysimplesweet.com/wp-content/uploads/2019/07/Chocolate-Donuts.jpg' },
        { id: 12, name: 'Cinnamon Sugar Donuts (dozen)', price: 160.00, image: 'https://www.daringgourmet.com/wp-content/uploads/2017/03/GF-Donuts-7-square.jpg' }
    ],
    cookies: [
        { id: 13, name: 'Chocolate Chip Cookies (dozen)', price: 200, image: 'https://th.bing.com/th/id/OIP.Yas85-jqOnbVpynbDckiBQHaHa?rs=1&pid=ImgDetMain' },
        { id: 14, name: 'Oatmeal Raisin Cookies (dozen)', price: 220, image: 'https://th.bing.com/th/id/OIP.IJVW3254w9V4kSUf41DC2gHaLH?rs=1&pid=ImgDetMain' },
        { id: 15, name: 'Db Chocolate Cookies (dozen)', price: 230, image: 'https://buttermilkbysam.com/wp-content/uploads/2022/09/bakery-style-double-chocolate-chip-cookies-2.jpg' }
    ]
};

let selectedItems = [];
let currentCategory = 'all';

function getAllProducts() {
    return Object.values(products).flat();
}

function displayProducts(category) {
    currentCategory = category;
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    let itemsToShow = category === 'all' ? getAllProducts() : products[category];

    itemsToShow.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('product-item');
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width:100px;height:auto;">
            <span>${product.name} - ₱${product.price.toFixed(2)}</span>
            <button onclick="addToReceipt(${product.id})">Add</button>
        `;
        productList.appendChild(div);
    });
}

function addToReceipt(productId) {
    const allProducts = getAllProducts();
    const product = allProducts.find(p => p.id === productId);
    const existing = selectedItems.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        selectedItems.push({ ...product, quantity: 1 });
    }

    updateReceipt();
    // Re-display current category after adding
    displayProducts(currentCategory);
}

function updateReceipt() {
    const receipt = document.getElementById('receipt');
    const totalDiv = document.getElementById('total');
    receipt.innerHTML = ''; // Clear current receipt content

    let total = 0;

    // Add headers for the receipt table
    const header = document.createElement('div');
    header.classList.add('receipt-header');
    header.innerHTML = `
        <span class="item-name"><strong>Product</strong></span>
        <span class="quantity-controls"><strong>Quantity</strong></span>
        <span class="price"><strong>Price</strong></span>
    `;
    receipt.appendChild(header);

    // Loop through selected items and display them
    selectedItems.forEach(item => {
        const itemTotal = item.price * item.quantity; // Calculate item subtotal
        total += itemTotal;

        const div = document.createElement('div');
        div.classList.add('receipt-item');
        div.innerHTML = `
            <div class="item-details">
                <span class="item-name">${item.name}</span>
                <span class="quantity-controls">
                    <button onclick="changeQuantity(${item.id}, -1)">−</button>
                    <input type="number" min="1" value="${item.quantity}" onchange="setQuantity(${item.id}, this.value)">
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </span>
                <span class="price">₱${item.price}</span> <!-- Price per item -->
            </div>
        `;
        receipt.appendChild(div);
    });

    // If no items are added to the receipt
    if (selectedItems.length === 0) {
        receipt.innerHTML = '<p>No items added to receipt yet.</p>';
    }

    // Display total price
    totalDiv.textContent = `Total: ₱${total}`;
}

function changeQuantity(productId, delta) {
    const product = selectedItems.find(item => item.id === productId);
    
    if (product) {
        product.quantity += delta;

        // Remove item if quantity is 0
        if (product.quantity <= 0) {
            selectedItems = selectedItems.filter(item => item.id !== productId);
        }

        updateReceipt(); // Update the receipt after changing quantity
    }
}

function setQuantity(productId, newQty) {
    const product = selectedItems.find(item => item.id === productId);
    const quantity = parseInt(newQty);

    if (product && quantity > 0) {
        product.quantity = quantity;
    } else {
        // Remove the item if quantity is 0 or invalid
        selectedItems = selectedItems.filter(item => item.id !== productId);
    }

    updateReceipt();
}

function updateReceipt() {
    const receipt = document.getElementById('receipt');
    const totalDiv = document.getElementById('total');
    receipt.innerHTML = ''; // Clear current receipt content

    let total = 0;

    // Loop through selected items
    selectedItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const div = document.createElement('div');
        div.classList.add('receipt-item');
        div.innerHTML = `
            <div class="item-details">
                <span class="item-name">${item.name}</span>
                <span class="quantity-controls">
                    <button onclick="changeQuantity(${item.id}, -1)">−</button>
                    <input type="number" min="1" value="${item.quantity}" 
                        onchange="setQuantity(${item.id}, this.value)" 
                        style="width: 40px; text-align: center;">
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </span>
                <span class="price">₱${item.price.toFixed(2)}</span>
            </div>
        `;
        receipt.appendChild(div);
    });

    if (selectedItems.length === 0) {
        receipt.innerHTML = '<p>No items added to receipt yet.</p>';
    }

    totalDiv.textContent = `Total: ₱${total.toFixed(2)}`;
}

function changeQuantity(productId, delta) {
    const product = selectedItems.find(item => item.id === productId);
    
    if (product) {
        product.quantity += delta;

        // Remove item if quantity is 0
        if (product.quantity <= 0) {
            selectedItems = selectedItems.filter(item => item.id !== productId);
        }

        updateReceipt(); // Update the receipt after changing quantity
    }
}

function generateReceipt() {
    if (selectedItems.length === 0) {
        alert('No items to print!');
        return;
    }

    let receiptWindow = window.open('', '', 'width=400,height=600');
    receiptWindow.document.write('<html><head><title>Receipt</title></head><body>');
    receiptWindow.document.write('<h2>Receipt</h2>');

    let total = 0;

    selectedItems.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        receiptWindow.document.write(`<p>${item.name} x ${item.quantity} = ₱${itemTotal.toFixed(2)}</p>`);
    });

    receiptWindow.document.write(`<hr><p><strong>Total: ₱${total.toFixed(2)}</strong></p>`);
    receiptWindow.document.write('</body></html>');
    receiptWindow.document.close();
    receiptWindow.print();

    // Clear after printing
    selectedItems = [];
    updateReceipt();

    // Show message after printing
    setTimeout(() => {
        alert('Receipt has been printed successfully!');
    }, 500);  // Slight delay before showing the message
}

// Show all products on first load
window.onload = function () {
    displayProducts('all');
};
