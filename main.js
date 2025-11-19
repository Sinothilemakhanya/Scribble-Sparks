// js_assets/main.js

// Form Validation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initFormValidation();
    initFAQ();
    initSearch();
    initGallery();
});

// Splash Loader
window.addEventListener('load', function() {
    const splash = document.getElementById('splash-loader');
    setTimeout(() => {
        splash.classList.add('hide');
    }, 2000); // Display splash for 2 seconds
});


// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                submitForm(this);
            }
        });

        

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const fields = form.querySelectorAll('[required]');
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    clearFieldError(field);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    if (field.type === 'tel' && value) {
const phoneRegex = /^(\+?\d{1,3})?[\s\-]?\(?\d{1,4}\)?[\s\-]?\d{3,4}[\s\-]?\d{3,4}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Form Submission
function submitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate AJAX request
    setTimeout(() => {
        showFormMessage(form, 'Thank you for your message! We will get back to you soon.', 'success');
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show enquiry response if it's an enquiry form
        if (form.id === 'enquiryForm') {
const oldResponse = document.querySelector('.enquiry-response');
if (oldResponse) oldResponse.remove();
        }
    }, 2000);
}

function showFormMessage(form, message, type) {
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    form.insertBefore(messageDiv, form.firstChild);
}

function showEnquiryResponse() {
    const responseDiv = document.createElement('div');
    responseDiv.className = 'form-message success';
    responseDiv.innerHTML = `
        <strong>Enquiry Received!</strong><br>
        Estimated Cost Range: R150 - R450<br>
        Production Time: 2-3 weeks<br>
        We'll contact you within 24 hours with detailed information.
    `;
    
    const form = document.getElementById('enquiryForm');
    form.parentNode.insertBefore(responseDiv, form.nextSibling);
}

// FAQ Accordion
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Search Functionality
function initSearch() {
    const searchInput = document.querySelector('input[type="search"]');
    if (!searchInput) return;
    
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchInput.parentNode.appendChild(searchResults);
    
    const searchData = [
        { title: 'Soy Candles', page: 'services.html', category: 'Products' },
        { title: 'Custom Orders', page: 'services.html', category: 'Services' },
        { title: 'Candle Workshops', page: 'services.html', category: 'Services' },
        { title: 'Our Mission', page: 'mission.html', category: 'About' },
        { title: 'Contact Us', page: 'contact.html', category: 'Contact' },
        { title: 'FAQ', page: 'enquiries.html', category: 'Support' }
    ];
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        searchResults.innerHTML = '';
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        const matches = searchData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.category.toLowerCase().includes(query)
        );
        
        if (matches.length > 0) {
            matches.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <strong>${item.title}</strong><br>
                    <small>${item.category} - <a href="${item.page}">View Page</a></small>
                `;
                resultItem.addEventListener('click', function() {
                    window.location.href = item.page;
                });
                searchResults.appendChild(resultItem);
            });
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
            searchResults.style.display = 'block';
        }
    });
    
    // Hide results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.parentNode.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// Image Gallery Lightbox
function initGallery() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    if (galleryImages.length === 0) return;
    
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="" alt="" class="lightbox-img">
        </div>
    `;
    document.body.appendChild(lightbox);
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const lightboxImg = lightbox.querySelector('.lightbox-img');
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightbox.classList.add('active');
        });
    });
    
    lightbox.querySelector('.lightbox-close').addEventListener('click', function() {
        lightbox.classList.remove('active');
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
}