function loadHTML() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) {
        fetch('header.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                headerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Error loading header:', error));
    }

    if (footerPlaceholder) {
        fetch('footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    }
}

// Ensure the function runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadHTML);
