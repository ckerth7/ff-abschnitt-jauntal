// ******************************************
// Script parameters
// ******************************************

let baseUrl = 'https://www.feuerwehr-abschnitt-jauntal.at/articles/';

// Number of articles that exist in total on the server
var number_of_articles = 1;
// Number of articles that should be shown on the website
var number_of_visible_articles = 0;
// Number of articles that have already been loaded from the server 
var number_of_loaded_articles = 0;

// Currently, images are not displayed due to missing loading handlers and scaling
const show_article_images = false;

// Articles being initialized using asynchronous requests 
var articles = [];

// ******************************************
// Code
// ******************************************

// Dynamic content loading start 

function loadContent() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var a = JSON.parse(this.responseText);
	  number_of_articles = a.NumberOfArticles; 
	  number_of_visible_articles = a.NumberOfVisibleArcticles;
	  loadArticles();
    }
  };
  xhttp.open("GET", baseUrl + 'settings.json', true);
  xhttp.send();
}

function loadArticles() {
	loadArticle(number_of_articles);
}

function loadArticle(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var article = JSON.parse(this.responseText);
	  articles.push(article);
	  number_of_loaded_articles++;
	  if (number_of_loaded_articles < number_of_visible_articles) {
		number_of_articles--;
		loadArticle(number_of_articles);
	  } else {
	    visualizeArticles();
	  }
    }
  };
  xhttp.open("GET", baseUrl + id + '/' + id + '.json', true);
  xhttp.send();
}

function visualizeArticles() {
	for (var i = 0; i < articles.length; i++) {
        addArticle(articles[i]);
    }
}

// Dynamic content loading end 

window.onload = (event) => {
	loadContent();
};

// Returns true if the given string is defined and not empty.
function hasValue(value) {
    var result = typeof value !== 'undefined' && value !== null && value.length > 0;
    return result;
}

// Creates a DOM structure based upon the given article and adds it to the article-container div.
function addArticle(article) {
    let article_container = document.getElementById("article-container");
    var single_article = document.createElement("article");
    // title
    var title = document.createElement("h2");
    title.classList.add("subtitle");
    if (hasValue(article.title)) {
        title.appendChild(document.createTextNode(article.title));
    } else {
        title.appendChild(document.createTextNode('Achtung Titel fehlt!'));
    }
    single_article.appendChild(title);

    // date and place
    if (hasValue(article.date)) {
        var date = document.createElement("h3");
        date.classList.add("subtitle");
        date.appendChild(document.createTextNode('am ' + article.date));
        single_article.appendChild(date);
    }
    if (hasValue(article.place)) {
        var place = document.createElement("h3");
        place.classList.add("subtitle");
        place.appendChild(document.createTextNode('in ' + article.place));
        single_article.appendChild(place);
    }

    // images
    if (show_article_images) {
        var image_grid = createImageGrid(article);
        if (image_grid !== null) {
            single_article.appendChild(image_grid);
        }
    }

    // content
    var content = document.createElement("p");
    content.classList.add("block");
    if (hasValue(article.content)) {
        content.appendChild(document.createTextNode(article.content));
    } else {
        content.appendChild(document.createTextNode('Achtung Inhalt fehlt!'));
    }

    single_article.appendChild(content);
    article_container.appendChild(single_article);
}

// Creates a flexible grid containing the images of the article. Returns the grid or null if it could not be created.
function createImageGrid(article) {

    if (!hasValue(article.imagesDirectory)) {
        return null;
    }
    if (typeof article.images === 'undefined' || article.images === null) {
        return null;
    }

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
        img.classList.add("image-grid-item");

        var srcset = directory_of_article + i + "-220w.jpg 220w, " +
            directory_of_article + i + "-320w.jpg 320w, " +
            directory_of_article + i + "-640w.jpg 640w";
        var sizes = "(max-width: 1000px) 220px, (max-width: 1500px) 320px, 640px";

        img.srcset = srcset;
        img.sizes = sizes;
        img.src = directory_of_article + i + "-640w.jpg";

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
