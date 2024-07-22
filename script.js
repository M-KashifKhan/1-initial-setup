document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    fetch('header.html')
        .then(response => {
            console.log("Header fetch status:", response.status);
            return response.text();
        })
        .then(data => {
            console.log("Header content fetched:", data);
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error fetching header:', error));

    fetch('footer.html')
        .then(response => {
            console.log("Footer fetch status:", response.status);
            return response.text();
        })
        .then(data => {
            console.log("Footer content fetched:", data);
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error fetching footer:', error));
});
