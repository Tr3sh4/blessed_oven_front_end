// Function to filter sales based on remarks (Done, Cancelled, All)
function filterByRemarks() {
  const selectedStatus = document.getElementById("remarks-filter").value;
  const rows = document.querySelectorAll("#sales-table-body tr");

  let totalSales = 0;

  rows.forEach(row => {
    const remarks = row.cells[5].textContent.trim();
    const amountText = row.cells[4].textContent.replace('₱', '');
    const amount = parseFloat(amountText);

    // Handle row visibility based on the selected filter
    if (selectedStatus === "All" || remarks === selectedStatus) {
      row.style.display = "";
      totalSales += amount;
    } else {
      row.style.display = "none";
    }
  });

  // Update the total sales amount dynamically
  document.getElementById("total-sales-amount").textContent = `₱${totalSales.toFixed(2)}`;
}

// Function to filter sales based on the selected date
function filterSales() {
  const selectedDate = document.getElementById("date-filter").value;
  const rows = document.querySelectorAll("#sales-table-body tr");
  let totalSales = 0;

  rows.forEach(row => {
    const saleDate = row.cells[2].textContent.trim();
    const amountText = row.cells[4].textContent.replace('₱', '');
    const amount = parseFloat(amountText);

    // Handle row visibility based on the selected date filter
    if (selectedDate === "" || saleDate === selectedDate) {
      row.style.display = "";
      totalSales += amount;
    } else {
      row.style.display = "none";
    }
  });

  // Update the total sales amount dynamically
  document.getElementById("total-sales-amount").textContent = `₱${totalSales.toFixed(2)}`;
}

// Initialize the total sales amount when the page loads
window.onload = function() {
  filterByRemarks();
  filterSales();
};
