$(document).ready(function() {
    // Load the JSON data using jQuery
    $.getJSON('../json/signin_form.json', function(data) {
        var labels = data.labels; // Store labels from JSON
        var placeholders = data.placeholders; // Store placeholders
        var icons = data.icons; // Store icon paths
        var buttonText = data.buttonText; // Store button text

        // Populate the form labels and button texts from the JSON data
        $('#emailLabel').text(labels.emailLabel);
        $('#passwordLabel').text(labels.passwordLabel);
        $('#rememberMeLabel').text(labels.rememberMeLabel);
        $('#forgotPasswordLabel').text(labels.forgotPasswordLabel);
        $('#signUpTextQuestion').text(labels.signUpTextQuestion);
        $('#signUpText').text(labels.signUpText);
        $('#orWithText').text(labels.orWithText);
        $('#googleButtonText').text(labels.googleButtonText);
        $('#appleButtonText').text(labels.appleButtonText);

        // Set placeholders for input fields
        $('#email').attr('placeholder', placeholders.emailPlaceholder);
        $('#password').attr('placeholder', placeholders.passwordPlaceholder);

        // Set icons for the inputs and buttons
        $('#emailIcon').attr('src', icons.emailIcon);
        $('#passwordIcon').attr('src', icons.passwordIcon);
        $('#eyeIcon').attr('src', icons.eyeIcon);
        $('#googleIcon').attr('src', icons.googleIcon);
        $('#appleIcon').attr('src', icons.appleIcon);

        // Set the sign-in button text
        $('#signInButton').text(buttonText.signInButtonText);
    });

    // Password visibility toggle logic
    $('#eyeIcon').on('click', function() {
        var passwordInput = $('#password'); // Get password input
        var toggleIcon = $('#eyeIcon'); // Get eye icon
        
        if (passwordInput.attr('type') === 'password') {
             // Change input type to text and update icon to 'open eye'
            passwordInput.attr('type', 'text');
            toggleIcon.attr('src', '../utils/images/signInForm/closedEye.png').attr('alt', 'Closed Eye');
        } else {
            // Change input type back to password and update icon to 'closed eye'
            passwordInput.attr('type', 'password');
            toggleIcon.attr('src', '../utils/images/signInForm/eye.png').attr('alt', 'Eye');
        }
    });

    // Form submit validation
    $('#signInForm').on('submit', function() {
        var formEmail = $('#email').val(); // Get email input value
        var formPassword = $('#password').val(); // Get password input value
        
        $('.showdata').html(''); // Clear previous data
        var error = ''; // Store error messages
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex for email validation
        
        // Check if email is entered and valid
        if (!formEmail) {
            error = 'Please enter your email.';
        } else if (!emailRegex.test(formEmail)) {
            error = 'Please enter a valid email address.';
        }

        // Check if password is entered and valid
        if (!error) {
            var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,20}$/; // Regex for password validation
            if (!formPassword) {
                error = 'Please enter your password.';
            } else if (!passwordRegex.test(formPassword)) {
                error = 'Password must be 8-20 characters long and contain at least:<br>' +
                    '<ul>' +
                    '<li>One uppercase letter</li>' +
                    '<li>One lowercase letter</li>' +
                    '<li>One number</li>' +
                    '<li>One special character (@, $, !, %, *, ?, &, etc.)</li>' +
                    '</ul>';
            }
        }

        var errorElement = $('.signin-form-errors'); // Get error element
        var showElement = $('.showdata'); // Get success message element
        if (error) {
            errorElement.html(error); // Display error message
            showElement.html(''); // Clear any previous content
            showElement.hide(); // Hide success message
        } else {
            errorElement.html(''); // Clear error message

             // Style and show the success message
            showElement.css({
                'border': '1px solid #0069c446',
                'height': 'max-content',
                'width': 'max-content',
                'padding': '20px 30px',
                'border-radius': '10px',
                'background-color': '#FFFFFF',
                '-webkit-box-shadow': '7px 7px 5px 0px rgba(214,214,214,1)',
                '-moz-box-shadow': '7px 7px 5px 0px rgba(214,214,214,1)',
                'box-shadow': '7px 7px 5px 0px rgba(214,214,214,1)',
                'text-align': 'center',
                'margin-top': '10px'
            });

            // Show successful sign-in message with email
            showElement.html(`
                <p class="successful-login-text"><b>Successfully Signed In!</b></p>
                <p><b>Email:</b> ${formEmail}</p>
                <p>Thank you for signing in! We appreciate your trust in us.</p>
            `);

            showElement.show(); // Display the success message

             // Reset the form after successful sign-in
        $('#signInForm')[0].reset();
        }

        return false; // Prevent form submission to stay on the page
    });
});
