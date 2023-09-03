(function ($) {
  "use strict";

  $(document).ready(function () {
    // Pre Loader

    $(window).on("load", function () {
      // Animate loader off screen
      $(".preloader").fadeOut("slow");
    });

    // Scroll To Top

    //Get the button
    var mybutton = document.getElementById("scrtop");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }

    // Smooth Scroll
    $("a.smooth-menu").on("click", function (event) {
      var $anchor = $(this);
      var headerH = "85";
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top - headerH + "px",
          },
          1500,
          "easeInOutExpo",
        );
      event.preventDefault();
    });

    // Ajax API Calls

    // Make an AJAX call to the Numbers API
    // Select the loader element
    var loader = $(".ajax-loader");
    // Hide the loader initially
    loader.hide();
    $.ajax({
      url: "http://numbersapi.com/1/30/date?json",
      dataType: "json",
      beforeSend: function () {
        // Show the loader when the request is about to be sent
        loader.show();
      },
      success: function (data) {
        // Display the content in the .numberapi-response div
        $(".numberapi-response").html("<p>" + data.text + "</p>");
      },
      complete: function () {
        // Hide the loader when the request is complete (success or error)
        loader.hide();
      },
      error: function (error) {
        console.error(
          "Error fetching data from Numbers API: " + error.statusText,
        );
      },
    });

    // File Uploader
    // Specify the server's URL where Node.js is running
    var serverUrl = "http://localhost:4000/uploadimages"; // Replace with your server's URL and port
    $("#thefiles").FancyFileUpload({
      url: serverUrl,
      maxfilesize: 1000000,
    });
  }); // end document ready function
})(jQuery); // End jQuery
