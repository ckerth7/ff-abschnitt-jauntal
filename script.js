
// Number of articles that should be visible, i.e., articles above that value are archived
const number_of_articles = 2;

// Articles ordered from the most to the least current one
const articles = [
      {title: "02.03.2010 - Einsatz in XYZ", content: "Lorem äpsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse" }
    , {title: "01.07.2009 - Hilfeleistung in ABC", content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam" } 
    , {title: "01.07.2006 - Hilfeleistung in ABC", content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam" } 
];

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
        let s = document.getElementById("article-container");
        var tag = document.createElement("article");
        var h2 = document.createElement("h2");
        h2.classList.add("subtitle");
        var title = document.createTextNode(article.title);
        h2.appendChild(title);
        var p = document.createElement("p");
        p.classList.add("block");
        var content = document.createTextNode(article.content);
        p.appendChild(content);
        tag.appendChild(h2);
        tag.appendChild(p);
        s.appendChild(tag);
}
