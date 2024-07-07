document.getElementById('dataEntryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const jsonData = JSON.stringify(Object.fromEntries(formData));

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData,
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').textContent = data.message;
        this.reset();
    })
    .catch(error => {
        document.getElementById('response').textContent = 'Error: ' + error;
    });
});
