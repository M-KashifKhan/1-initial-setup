document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    // Fetch and insert header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            // Add event listeners here if needed
            addHeaderEventListeners();
        })
        .catch(error => console.error('Error fetching header:', error));

    // Fetch and insert footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
            // Add event listeners here if needed
            addFooterEventListeners();
        })
        .catch(error => console.error('Error fetching footer:', error));
});

function addHeaderEventListeners() {
    // Add any specific event listeners for the header
    console.log("Adding header event listeners");
}

function addFooterEventListeners() {
    // Add any specific event listeners for the footer
    console.log("Adding footer event listeners");
}
