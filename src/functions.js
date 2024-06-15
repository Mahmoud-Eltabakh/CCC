document.getElementById("gform").addEventListener('submit', function (event) {
    event.preventDefault();
    // Get form data
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const templateFile = "text.txt"


    // Read the template file
    fetch(templateFile)
        .then(response => response.text())
        .then(template => {
            // Replace placeholders with actual data
            const filledTemplate = template
                .replace('{{fname}}', fname)
                .replace('{{lname}}', lname)
                .replace('{{email}}', email);


            // // Create a blob from the filled template
            // const blob = new Blob([filledTemplate], { type: 'text/plain' });

            // // Create a link to download the blob as a file
            // const link = document.createElement('a');
            // link.href = URL.createObjectURL(blob);

            // link.download = 'output.txt';
            // link.click();

            // // Clean up URL.createObjectURL resources
            // URL.revokeObjectURL(link.href);

            // Create a PDF from the filled template using jsPDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const lines = doc.splitTextToSize(filledTemplate, 180); // Wrap text to fit within 180 units width

            doc.text(lines, 10, 10);
            doc.save('output.pdf');

        }
        )
        .catch(error => console.error('Error fetching the template:', error));
    var extraData = {}
    $('#gform').ajaxSubmit({
        data: extraData,
        dataType: 'jsonp',  // This won't really work. It's just to use a GET instead of a POST to allow cookies from different domain.
        error: function () {
            // Submit of form should be successful but JSONP callback will fail because Google Forms
            // does not support it, so this is handled as a failure.
            alert('Form Submitted. Thanks.')
            // You can also redirect the user to a custom thank-you page:
            window.location.reload()
            // history.back()

        }
    })
});