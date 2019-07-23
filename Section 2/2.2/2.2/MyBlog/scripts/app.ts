
// The article manager.
var articleManager: Blog.ArticleManager;

// Entry point
window.addEventListener("load", function () {
    articleManager = new Blog.ArticleManager("articles");
    articleManager.loadNextArticle();
});
