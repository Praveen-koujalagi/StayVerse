// Bootstrap form validation
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// Additional real-time validation for better UX
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.needs-validation input, .needs-validation textarea')
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.checkValidity()) {
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
            } else {
                this.classList.remove('is-valid')
                this.classList.add('is-invalid')
            }
        })
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid') && this.checkValidity()) {
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
            }
        })
    })

    // Star Rating Functionality
    const starRating = document.querySelector('.star-rating');
    const ratingInput = document.getElementById('rating-value');
    
    if (starRating && ratingInput) {
        const stars = starRating.querySelectorAll('.star');
        
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                const rating = index + 1;
                ratingInput.value = rating;
                
                // Update star appearance
                updateStars(rating);
                
                // Mark as valid since user selected a rating
                ratingInput.classList.remove('is-invalid');
                ratingInput.classList.add('is-valid');
            });
            
            star.addEventListener('mouseenter', function() {
                const rating = index + 1;
                highlightStars(rating);
            });
        });
        
        starRating.addEventListener('mouseleave', function() {
            const currentRating = parseInt(ratingInput.value) || 0;
            updateStars(currentRating);
        });
        
        function updateStars(rating) {
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.classList.remove('far');
                    star.classList.add('fas');
                    star.style.color = '#333';
                } else {
                    star.classList.remove('fas');
                    star.classList.add('far');
                    star.style.color = '#ddd';
                }
            });
        }
        
        function highlightStars(rating) {
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.classList.remove('far');
                    star.classList.add('fas');
                    star.style.color = '#555';
                } else {
                    star.classList.remove('fas');
                    star.classList.add('far');
                    star.style.color = '#ddd';
                }
            });
        }
        
        // Initialize stars
        updateStars(0);
    }

    // Filter functionality for listings
    const filterItems = document.querySelectorAll('.filter-item');
    
    if (filterItems.length > 0) {
        filterItems.forEach(item => {
            item.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Remove active class from all filter items
                filterItems.forEach(filter => filter.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Navigate to filtered listings
                const currentUrl = new URL(window.location);
                if (category === 'all') {
                    currentUrl.searchParams.delete('category');
                } else {
                    currentUrl.searchParams.set('category', category);
                }
                
                window.location.href = currentUrl.toString();
            });
        });
    }
})

// Mobile search toggle functionality
function toggleMobileSearch() {
    const overlay = document.getElementById('mobileSearchOverlay');
    overlay.classList.toggle('active');
    
    // Prevent body scrolling when overlay is open
    if (overlay.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close mobile search when clicking outside content
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('mobileSearchOverlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                toggleMobileSearch();
            }
        });
    }
});
