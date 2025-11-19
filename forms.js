// js_assets/forms.js
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                
                // If it's an enquiry form, show cost info
                if (this.id === 'enquiryForm') {
                    setTimeout(() => {
                        alert('Based on your enquiry, estimated costs range from R150 - R450. We\'ll contact you within 24 hours with detailed information.');
                    }, 500);
                }
            }
        });
    });
    
    function validateForm(form) {
        let isValid = true;
        const required = form.querySelectorAll('[required]');
        
        required.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'red';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });
        
        return isValid;
    }
});