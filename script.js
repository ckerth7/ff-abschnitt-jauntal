// ******************************************
// Script parameters
// ******************************************

// Number of articles that should be visible, i.e., articles above that value are archived
const number_of_articles = 2;

// Currently, images are not displayed due to missing loading handlers and scaling
const show_article_images = false;

// Articles ordered from the most to the least current one
const articles = [
    { 
        title: "02.03.2010 - Einsatz in XYZ",
        imagesDirectory: "articles/1",
        images: 8,
        content: "Lorem äpsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse"
    },
    { 
        title: "01.07.2009 - Hilfeleistung in ABC", 
        imagesDirectory: "articles/2", 
        images: 4, 
        content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
    }
    , 
    { 
        title: "01.07.2006 - Hilfeleistung in ABC", 
        imagesDirectory: "articles/3", 
        images: 2, 
        content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
    }
];

// ******************************************
// Code
// ******************************************

// For debuging purposes only
if (number_of_articles > articles.length) {
    alert("Adjust number_of_articles");
}

window.onload = (event) => {
    for (var i = 0; i < number_of_articles; i++) {
        addArticle(articles[i]);
    }
};

// Creates a DOM structure based upon the given article and adds it to the article-container div.
function addArticle(article) {
    let article_container = document.getElementById("article-container");
    var single_article = document.createElement("article");
    var title = document.createElement("h2");
    title.classList.add("subtitle");
    title.appendChild(document.createTextNode(article.title));
    var content = document.createElement("p");
    content.classList.add("block");
    content.appendChild(document.createTextNode(article.content));
    single_article.appendChild(title);
    if (show_article_images) {
        var image_grid = createImageGrid(article);
        single_article.appendChild(image_grid);
    }
    single_article.appendChild(content);
    article_container.appendChild(single_article);
}

// Creates a flexible grid containing the images of the article.
function createImageGrid(article) {
    // create flex container for images
    var image_grid = document.createElement("div");
    image_grid.classList.add("image-grid");
    // determine location of images and number of images
    var directory_of_article = article.imagesDirectory;
    var number_of_images = article.images;

    var images = [];

    // collect images and scale them down
    for (var i = 1; i <= number_of_images; i++) {
        var img = document.createElement("img");
        // img.addEventListener( 'load', imageLoaded, false );
        img.classList.add("image-grid-item");
        img.src = directory_of_article + "/" + i + ".jpg";
        images.push(img);
    }

    images.sort((a, b) => b.height - a.height);

    // add image to flex container
    for (var i = 0; i < images.length; i++) {
        var img = images[i];
        image_grid.append(img);
    }

    return image_grid;
}

// Switches the horizontal menu to the vertical one and vice versa.
function toggleNavbar() {
    var x = document.getElementsByClassName("mobile-bar");
    var y = document.getElementsByClassName("responsive-bar");
    if (x !== null && x.length === 1) {
        var menu = x[0];
        menu.className = "responsive-bar";
    }
    else {
        var menu = y[0];
        menu.className = "mobile-bar";
    }
}
