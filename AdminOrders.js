// Get the overlay and close button elements
const overlay = document.getElementById('overlay');
const closeOverlayBtn = document.getElementById('close-overlay');

// Get all the "VIEW" links
const viewButtons = document.querySelectorAll('.view-btn');

// Add event listeners to all "VIEW" buttons
viewButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Get the customer name from the data-name attribute of the clicked button
        const customerName = button.getAttribute('data-name');
        
        // Get the order details from the data-order attribute (JSON string)
        const orderDetails = JSON.parse(button.getAttribute('data-order'));
        
        // Get the address and delivery date from the data attributes
        const customerAddress = button.getAttribute('data-address');
        const deliveryDate = button.getAttribute('data-delivery');

        // Set the customer name inside the overlay
        document.getElementById('customer-name').textContent = customerName;

        // Build the HTML for the order details
        let orderDetailsHTML = `<table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>`;

        // Variable to store the total payment
        let totalPayment = 0;

        // Loop through each item in the order and add a row to the table
        orderDetails.forEach(item => {
            orderDetailsHTML += `
                <tr>
                    <td>${item.item}</td>
                    <td>${item.quantity}</td>
                    <td>₱${item.amount}</td>
                </tr>
            `;
            // Add the amount to the total payment
            totalPayment += item.amount;
        });

        // Close the table tag
        orderDetailsHTML += '</tbody></table>';

        // Set the order details inside the overlay
        document.getElementById('order-details').innerHTML = orderDetailsHTML;

        // Set the address and delivery date in the overlay
        document.getElementById('customer-address').textContent = customerAddress;
        document.getElementById('delivery-date').textContent = deliveryDate;

        // Set the total payment in the overlay
        document.getElementById('total-payment').textContent = totalPayment;

        // Display the overlay
        overlay.style.display = 'flex';
    });
});

// Add event listener to close the overlay when the close button is clicked
closeOverlayBtn.addEventListener('click', function() {
    overlay.style.display = 'none';
});

// Close the overlay if the user clicks outside of the overlay content
window.addEventListener('click', function(event) {
    if (event.target === overlay) {
        overlay.style.display = 'none';
    }
});

$(document).ready(function () {
    $('#filter-date').on('change', function () {
        const selectedDate = $(this).val();
        $('table.customer-table tbody tr').each(function () {
            const rowDate = $(this).find('td:nth-child(5)').text().trim(); // Transaction Date column
            const rowDateFormatted = new Date(rowDate).toISOString().split('T')[0];

            if (selectedDate === '' || selectedDate === rowDateFormatted) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});
