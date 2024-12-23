// Show the button when scrolled 100px from top.
window.onscroll = function () {

    const goToTopButton = document.getElementById("goToTopButton");
  
    if (
      document.documentElement.scrollTop > 100 ||
      document.body.scrollTop > 100
    ) {
      goToTopButton.style.display = "block";
    } else {
      goToTopButton.style.display = "none";
    }
  
  };
  
  // Smooth scroll back to top.
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  