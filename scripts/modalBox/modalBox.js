$(document).ready(function() {
    const modalDataUrl = '../json/modal_box.json';  // URL of the JSON file
    const modalsContainer = $('#modals-container'); // Reference to the container where modals will be appended

    // Load modal data from the JSON file
    $.getJSON(modalDataUrl, function(data) {
        
         // Iterate through the modal data and dynamically generate modal HTML
        $.each(data.modalBox, function(index, modal) {
             // Create the HTML structure for each modal
            const modalHtml = `
                <div class="modal" id="${modal.id}">
                    <div class="modal-content">
                        <span class="close-modal" data-modal="${modal.id}">&times;</span>
                        <h2>${modal.title}</h2>
                        <p>${modal.content}</p>
                        <button class="close-button" data-modal="${modal.id}">Close</button>
                    </div>
                </div>
            `;
            modalsContainer.append(modalHtml);  // Append each modal to the container
        });

        // Open modal functionality
        $('.open-modal').on('click', function() {
            const modalId = $(this).data('modal');
            $(`#${modalId}`).css('display', 'flex');
        });

        // Close modal functionality
        $('.close-modal, .close-button').on('click', function() {
            const modalId = $(this).data('modal');
            $(`#${modalId}`).css('display', 'none');
        });

        // Close modal when clicking outside of modal content
        $('.modal').on('click', function(event) {
            if ($(event.target).hasClass('modal')) {
                $(this).css('display', 'none');
            }
        });
    });
});

