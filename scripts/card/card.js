$(document).ready(function () {

    // Show error message initially in case of failure
    const errorMessage = $(".card-errors");
    errorMessage.hide();  // Hide error message initially

     // Load JSON data
    $.getJSON('../json/card.json', function (data) {
        const container = $('.container');
        
        // Product Card
        const product = data.card.find(item => item.type === 'product');
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="Product Image" class="product-image">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">${product.price}</p>
                <button class="product-button">${product.buttonText}</button>
            </div>
        `;
        container.append(productCard);  // Append product card to container

        // Subscription Section
        const subscription = data.card.find(item => item.type === 'subscription');
        const subscriptionCard = `
            <div class="subscription">
                <h3>${subscription.title}</h3>
                <p>${subscription.description}</p>
                <form class="subscription-form">
                    <input type="email" placeholder="Enter your email" required>
                    <button type="submit">Subscribe</button>
                </form>
            </div>
        `;
        container.append(subscriptionCard); // Append subscription section to container

        // Offer Card
        const offer = data.card.find(item => item.type === 'offer');
        const offerCard = `
            <div class="offer-card">
                <h3 class="offer-title">${offer.title}</h3>
                <p class="offer-details">${offer.details}</p>
                <p class="offer-expiry">${offer.expiry}</p>
                <button class="offer-button">${offer.buttonText}</button>
            </div>
        `;
        container.append(offerCard); // Append offer card to container

        // Handle Product Card Button click
        $(document).on('click', '.product-button', function () {
            const messageBar = $('#message-bar');
            const messageText = $('.message-text');
            messageText.text('Item added to cart successfully!');
            messageBar.show(); // Show message bar with success text
        });

        // Handle Subscription Form submission
        $(document).on('submit', '.subscription-form', function (e) {
            e.preventDefault(); // Prevent form from submitting normally
            const messageBar = $('#message-bar');
            const messageText = $('.message-text');
            messageText.text('Thank you for subscribing!'); // Update message
            messageBar.show(); // Show message bar
            $('.subscription-form input').val(''); // Clear input field after submission
        });

        // Handle Offer Card Button click
        $(document).on('click', '.offer-button', function () {
            const messageBar = $('#message-bar');
            const messageText = $('.message-text');  
            messageText.text('Redirecting to offers page!'); // Update message text
            messageBar.show(); // Show message bar indicating redirection
        });

        // Close the message bar on click of the close button
        $(document).on('click', '#close-bar', function () {
            $('#message-bar').hide(); // Hide the message bar
        });

         // Hide error message once content is loaded
         errorMessage.hide(); // Hide the error message if JSON is loaded successfully

    }).fail(function () {
         // Show error message if JSON loading fails
         $(".card-errors").text("Error loading content. Please try again later.").show();
    });
});



