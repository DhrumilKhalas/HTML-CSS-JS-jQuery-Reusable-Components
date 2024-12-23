$(document).ready(function() {
    // Load JSON data from the specified file
    $.getJSON("../json/accordion.json", function(data) {
        const accordionContainer = $(".accordion-container");
        
        // Loop through each accordion item in the JSON data and create HTML structure
        data.accordion.forEach(function(item) {
            const accordionItem = $(`
                <div class="accordion-item">
                    <button class="accordion-header">
                        <span>${item.title}</span>
                        <span class="accordion-icon">▼</span>
                    </button>
                    <div class="accordion-content">
                        <p>${item.content}</p>
                    </div>
                </div>
            `);
            accordionContainer.append(accordionItem); // Append the new item to the container
        });

         // Click event handler to toggle accordion content visibility
        $(".accordion-header").on("click", function() {
            const $header = $(this);
            const $content = $header.next(".accordion-content"); // Get the associated content div
            const $icon = $header.find(".accordion-icon"); // Get the icon to rotate
            const $otherContents = $(".accordion-content").not($content); // Other content divs
            const $otherIcons = $(".accordion-icon").not($icon); // Other icons

            // Toggle the clicked content's visibility
            if ($content[0].style.maxHeight) {
                $content[0].style.maxHeight = null; // Close content if open
                $icon.css("transform", "rotate(0deg)"); // Reset icon rotation
            } else {
                $content[0].style.maxHeight = $content[0].scrollHeight + "px"; // Open content
                $icon.css("transform", "rotate(180deg)"); // Rotate icon to indicate open state
            }

            // Close other open accordion sections
            $otherContents.each(function() {
                this.style.maxHeight = null;  // Close the content
            });
            $otherIcons.css("transform", "rotate(0deg)"); // Reset other icons
        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        // Handle errors if the JSON file fails to load
        $(".accordion-container").html(
            '<p style="color: red;">Error loading accordion content. Please try again later.</p>'
        ); 
    });
}); 