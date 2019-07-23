
// The article manager.
var articleManager: Blog.ArticleManager;

// Entry point
window.addEventListener("load", function () {
    articleManager = new Blog.ArticleManager("articles");
    articleManager.loadNextArticle();
});

// Automatically load another post when scrolled to the bottom.
window.addEventListener("scroll", function () {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        articleManager.loadNextArticle();
    }
});