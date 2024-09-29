// Initialize EmailJS (replace 'YOUR_USER_ID' with your actual user ID)
emailjs.init("FgynicDDuERe6rISX");

function sendEmail(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Send email to the owner
    emailjs.send("service_6mdzbfj", "template_92390xr", {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    }).then(response => {
        console.log('Owner email sent successfully!', response.status, response.text);
    }).catch(error => {
        console.error('Failed to send owner email', error);
    });

    // Send confirmation email to the user
    emailjs.send("service_6mdzbfj", "template_olxayjs", {
        to_name: name,
        to_email: email
    }).then(response => {
        console.log('User email sent successfully!', response.status, response.text);
        alert("Your message has been sent successfully!");
    }).catch(error => {
        console.error('Failed to send user email', error);
        alert("There was an error sending your message. Please try again.");
    });

    // Optionally, clear the form fields
    document.querySelector('form').reset();
}

// Add event listener for form submission
document.querySelector('form').addEventListener('submit', sendEmail);
