
// When the user scrolls the page, execute myFunction
window.onscroll = function() {
    // myFunction();
};

// Sets fire fighter logo transparent depending upon scrollbar
function myFunction() {

    var logo = document.getElementById("logo");
    // var x = document.getElementsByClassName("mySlides");

    var logo_height = logo.offsetHeight;
    var opac = 1 - window.pageYOffset / logo_height;
    if (opac < 0) {
        logo.style.opacity = 0;
        // for (i = 0; i < x.length; i++) {
        //     x[i].style.opacity = 0;
        // }
    } else {
        logo.style.opacity = opac - 0.2;
        // for (i = 0; i < x.length; i++) {
        //     x[i].style.opacity = opac - 0.2;
        // }
    }

}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// automatic slideshow code starts here
window.onload = function() {
    // carousel();
}

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block";
  setTimeout(carousel, 2000); // Change image every 2 seconds
}

var slideIndex = 0;

// automatic slideshow code ends here 

/* 
window.onresize = function() {
    var frame = document.getElementById("news");
    frame.style.width = "2000"
}
*/
