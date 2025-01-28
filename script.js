document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        
        // Toggle the 'active' class
        faqItem.classList.toggle('active');

        // Close other opened items (optional)
        document.querySelectorAll('.faq-item').forEach((item) => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
    });
});
