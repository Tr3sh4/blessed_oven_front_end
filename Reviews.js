// Toggle the visibility of the reviews
function toggleReviews() {
    const hiddenReviews = document.querySelectorAll('.review.hidden');
    const viewAllButton = document.querySelector('.view-all-button');
    
    // Check if reviews are hidden or visible
    const isHidden = hiddenReviews.length > 0;
    
    // Toggle the 'hidden' class based on the current state
    if (isHidden) {
        // Show all hidden reviews
        hiddenReviews.forEach(review => review.classList.remove('hidden'));
        viewAllButton.textContent = "Hide Reviews"; // Change button text
    } else {
        // Hide all reviews except the first two
        const reviews = document.querySelectorAll('.review');
        reviews.forEach((review, index) => {
            if (index >= 2) {
                review.classList.add('hidden');
            }
        });
        viewAllButton.textContent = "View All Reviews"; // Change button text
    }
}

// Handle the review form submission
document.getElementById('review-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from reloading the page
    
    const reviewText = this.querySelector('textarea').value;
    const reviewsDisplay = document.getElementById('reviews-display');
    
    // Create a new review element
    const newReview = document.createElement('div');
    newReview.classList.add('review');
    newReview.innerHTML = ` 
        <p class="review-text">${reviewText}</p>
        <p class="review-author">- You</p>
        <p class="review-date">${new Date().toLocaleDateString()}</p>
    `;
    
    // Add the new review to the display section
    reviewsDisplay.insertBefore(newReview, reviewsDisplay.firstChild);
    
    // Clear the textarea after submission
    this.querySelector('textarea').value = '';
    
    // Get all the reviews and ensure only the first two are visible
    const reviews = document.querySelectorAll('.review');
    reviews.forEach((review, index) => {
        if (index < 2) {
            review.classList.remove('hidden'); // Ensure first two are visible
        } else {
            review.classList.add('hidden'); // Hide reviews after the second
        }
    });
});
