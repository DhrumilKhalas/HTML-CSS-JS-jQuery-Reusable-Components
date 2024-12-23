$(document).ready(function() {
    let currentIndex = 0; // Initialize the current index for carousel navigation

    // Load carousel data from JSON file
    $.getJSON('../json/carousel.json', function(data) {
        const carouselContainer = $('.carousel'); // Get the carousel container element

        // Dynamically create carousel slides based on the JSON data
        $.each(data.carousel, function(index, item) {
            const slide = $('<div>').addClass('carousel-slide');  // Create a new slide
            slide.html('<img src="' + item.src + '" alt="' + item.alt + '">'); // Add image to the slide
            carouselContainer.append(slide); // Append the slide to the carousel container
        });

        // Update the carousel with the first image initially
        updateCarousel();

         // Event listeners for navigating slides
        $('.prev-btn').on('click', prevSlide); // Navigate to previous slide when "prev" button is clicked
        $('.next-btn').on('click', nextSlide); // Navigate to next slide when "next" button is clicked

        // Auto slide every 3 seconds
        setInterval(nextSlide, 3000); // Automatically go to next slide every 3 seconds
    });

     // Function to navigate to the next slide
    function nextSlide() {
        const slides = $('.carousel-slide'); // Get all carousel slides
        const totalSlides = slides.length; // Get the total number of slides

        if (currentIndex < totalSlides - 1) {
            currentIndex++;  // Increment the index if it's not the last slide
        } else {
            currentIndex = 0;  // Loop back to the first slide
        }

        updateCarousel(); // Update the carousel view after the slide change
    }

     // Function to navigate to the previous slide
    function prevSlide() {
        const slides = $('.carousel-slide'); // Get all carousel slides
        const totalSlides = slides.length; // Get the total number of slides

        if (currentIndex > 0) {
            currentIndex--; // Decrement the index if it's not the first slide
        } else {
            currentIndex = totalSlides - 1;  // Loop back to the last slide
        }

        updateCarousel();  // Update the carousel view after the slide change
    }

     // Function to update the carousel to show the current slide
    function updateCarousel() {
        const slides = $('.carousel'); // Get the carousel container
        const slideWidth = $('.carousel-slide').outerWidth(); // Get the width of a single slide
        slides.css('transform', 'translateX(-' + (currentIndex * slideWidth) + 'px)');  // Apply CSS transform to move the slides
    }
});

  