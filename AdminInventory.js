document.addEventListener("DOMContentLoaded", function () {
    const addBtn = document.querySelector(".add-btn");
    const tableBody = document.querySelector(".product-table tbody");
    let productIdCounter = getLastId() + 1;

    // Get the last used ID in the table
    function getLastId() {
        const lastRow = tableBody.querySelector("tr:last-child");
        return lastRow ? parseInt(lastRow.cells[0].textContent) : 0;
    }

    addBtn.addEventListener("click", function () {
        const newRow = document.createElement("tr");
    
        newRow.innerHTML = `
            <td>${String(productIdCounter).padStart(3, '0')}</td>
            <td><input type="text" class="edit-input" placeholder="Enter product name"></td>
            <td><input type="number" class="edit-input" min="0" value="0"></td>
            <td><span class="stock-level">In Stock</span></td>
            <td>
                <button class="save-btn">Save</button>
                <button class="cancel-btn">Cancel</button>
            </td>
        `;
    
        tableBody.appendChild(newRow);
        newRow.scrollIntoView({ behavior: "smooth", block: "center" }); // ← Automatically scrolls to new row
        attachRowEvents(newRow);
        productIdCounter++;
    });
    
    // Attach events to existing rows
    const allRows = document.querySelectorAll(".product-table tbody tr");
    allRows.forEach(row => attachRowEvents(row));

    // Function to attach events to row buttons
    function attachRowEvents(row) {
        const saveBtn = row.querySelector(".save-btn");
        const cancelBtn = row.querySelector(".cancel-btn");
        const editBtn = row.querySelector(".edit-btn");
        const deleteBtn = row.querySelector(".delete-btn");
        const qtyInput = row.querySelector("input[type='number']");

        if (editBtn) {
            editBtn.addEventListener("click", () => enterEditMode(row));
        }

        if (deleteBtn) {
            deleteBtn.addEventListener("click", () => {
                if (confirm("Are you sure you want to delete this product?")) {
                    row.remove();
                }
            });
        }

        if (saveBtn) {
            saveBtn.addEventListener("click", () => {
                const inputs = row.querySelectorAll("input");
                const nameInput = inputs[0].value.trim();
                const qtyInput = parseInt(inputs[1].value.trim());

                if (nameInput === "" || isNaN(qtyInput) || qtyInput < 0) {
                    alert("Please enter valid product information.");
                    return;
                }

                // Automatically update stock level based on quantity
                const { stockLevel, color } = calculateStockLevel(qtyInput);

                row.innerHTML = `
                    <td>${row.cells[0].textContent}</td>
                    <td>${nameInput}</td>
                    <td>${qtyInput}</td>
                    <td><span class="stock-level" style="color: ${color};">${stockLevel}</span></td> <!-- Updated stock level with color -->
                    <td>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </td>
                `;
                attachRowEvents(row);
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener("click", () => {
                revertToOriginalState(row);
            });
        }

        // Event listener for quantity input change
        if (qtyInput) {
            qtyInput.addEventListener("input", () => {
                const qty = parseInt(qtyInput.value);
                const { stockLevel, color } = calculateStockLevel(qty);
                row.querySelector(".stock-level").textContent = stockLevel; // Update stock level display
                row.querySelector(".stock-level").style.color = color; // Update stock level color
            });
        }
    }

    // Switch row to edit mode
    function enterEditMode(row) {
        const name = row.cells[1].textContent.trim();
        const qty = row.cells[2].textContent.trim();
        const stockLevel = row.cells[3].textContent.trim();  // Stock level

        // Save the original state in case we need to revert
        row.dataset.originalName = name;
        row.dataset.originalQty = qty;
        row.dataset.originalStockLevel = stockLevel;  // Save original stock level

        row.innerHTML = `
            <td>${row.cells[0].textContent}</td>
            <td><input type="text" class="edit-input" value="${name}"></td>
            <td><input type="number" class="edit-input" min="0" value="${qty}"></td>
            <td><span class="stock-level">${stockLevel}</span></td> <!-- Stock level in edit mode -->
            <td>
                <button class="save-btn">Save</button>
                <button class="cancel-btn">Cancel</button>
            </td>
        `;
        attachRowEvents(row);
    }

    // Revert row to its original state (when cancel is clicked during edit)
    function revertToOriginalState(row) {
        row.innerHTML = `
            <td>${row.cells[0].textContent}</td>
            <td>${row.dataset.originalName}</td>
            <td>${row.dataset.originalQty}</td>
            <td>${row.dataset.originalStockLevel}</td> <!-- Display original stock level -->
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        attachRowEvents(row);
    }

    // Function to calculate stock level automatically based on quantity
    function calculateStockLevel(qty) {
        let stockLevel = "";
        let color = "";

        if (qty === 0) {
            stockLevel = "Out of Stock";  // When no stock available
            color = "red";  // Color for out of stock
        } else if (qty > 0 && qty < 5) {
            stockLevel = "Low Stock";  // When stock is low
            color = "orange";  // Color for low stock
        } else {
            stockLevel = "In Stock";  // When stock is sufficient
            color = "green";  // Color for in stock
        }

        return { stockLevel, color };  // Return both the stock level message and the color
    }
});
