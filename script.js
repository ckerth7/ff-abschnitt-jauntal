// ******************************************
// Script parameters
// ******************************************

// Number of articles that should be visible, i.e., articles above that value are archived
const number_of_articles = 1;

// Currently, images are not displayed due to missing loading handlers and scaling
const show_article_images = true;

// Articles ordered from the most to the least current one.
const articles = [
    {
        title: "WILLKOMMEN!",
        content: "Liebe Besucherinnen und Besucher, wir – das Feuerwehrkommando des Abschnittes Jauntal – heißen Sie herzlich auf unserer Homepage willkommen! Schauen Sie sich gerne um. Es gibt einiges zu entdecken. In naher Zukunft finden Sie hier Informationen zu Einsätzen, Veranstaltungen und verschiedenen Themen rund um das Feuerwehrwesen. Schauen Sie also gerne immer wieder hier vorbei. Viel Spaß beim Stöbern! Ihre Feuerwehr :)"
    },
    {
        date: "01.07.2009",
        place: "Abtei",
        title: "Hilfeleistung",
        imagesDirectory: "articles/2/",
        images: 4,
        content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
    }
    ,
    {
        date: "02.03.2006",
        place: "Gallizien",
        title: "Hilfeleistung",
        imagesDirectory: "articles/3/",
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
