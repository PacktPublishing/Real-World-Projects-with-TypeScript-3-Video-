// The article manager.
var articleManager;
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
var Blog;
(function (Blog) {
    /**
     * Manages the retrieval of articles in the system.
     */
    var ArticleManager = /** @class */ (function () {
        /**
         * Creates a new article manager.
         * @param elementId The identifier of the HTML element to insert into.
         */
        function ArticleManager(elementId) {
            this._articleContainer = document.getElementById(elementId);
            if (this._articleContainer === undefined) {
                throw new Error("Unable to find element named: " + elementId);
            }
        }
        /**
         * Loads the next article in the system.
         */
        ArticleManager.prototype.loadNextArticle = function () {
            var request = new XMLHttpRequest();
            request.addEventListener("readystatechange", this.onArticleLoaded.bind(this, request));
            request.addEventListener("error", this.onArticleLoadError.bind(this, request));
            request.addEventListener("abort", this.onArticleLoadAborted.bind(this, request));
            var url = "GetNextArticle.aspx";
            if (this._lastLoadedArticleId !== undefined) {
                url += "?lastArticleId=" + this._lastLoadedArticleId;
            }
            request.open("GET", url, true);
            request.send(null);
        };
        /**
         * Called when an article request has loaded.
         * @param request The request object.
         */
        ArticleManager.prototype.onArticleLoaded = function (request) {
            if (request.readyState === XMLHttpRequest.DONE) {
                var responseText = request.responseText.trim();
                if (responseText === "") {
                    throw new Error("Error parsing response.");
                }
                // Parse the JSON response.
                var articleInfo = JSON.parse(responseText);
                // Set the last post loaded marker.
                this._lastLoadedArticleId = articleInfo.Id;
                // Create the post elements and add it to the page.
                var articleElement = Blog.DocumentHelper.createArticleEntry(articleInfo);
                if (articleElement !== undefined) {
                    this._articleContainer.appendChild(articleElement);
                }
            }
        };
        /**
         * Called when there is an error loading an article.
         * @param request The request object.
         */
        ArticleManager.prototype.onArticleLoadError = function (request) {
            console.warn("Error loading post: " + request.status + " - " + request.statusText);
        };
        /**
         * Called when the article request is aborted.
         * @param request The request object.
         */
        ArticleManager.prototype.onArticleLoadAborted = function (request) {
            console.warn("Article load aborted.");
        };
        return ArticleManager;
    }());
    Blog.ArticleManager = ArticleManager;
})(Blog || (Blog = {}));
var Blog;
(function (Blog) {
    /**
     * A utility class to assist with the creation of document elements.
     */
    var DocumentHelper = /** @class */ (function () {
        function DocumentHelper() {
        }
        /**
         * Creates an article entry using the provided info. Returns an element to be added to the page.
         * @param articleInfo The article info to create the entry from.
         */
        DocumentHelper.createArticleEntry = function (articleInfo) {
            var wrapper = DocumentHelper.createDiv("article");
            wrapper.id = "article_" + articleInfo.Id;
            var header = DocumentHelper.createHeader(2, articleInfo.Title, "article-title");
            wrapper.appendChild(header);
            var content = DocumentHelper.createDiv("article-content");
            content.innerHTML = articleInfo.Content;
            wrapper.appendChild(content);
            return wrapper;
        };
        /**
         * Creates a div element.
         * @param className Optional class name to be applied to created div.
         */
        DocumentHelper.createDiv = function (className) {
            var element = document.createElement("div");
            if (className) {
                element.className = className;
            }
            return element;
        };
        /**
         * Creates a header element with the specified level (i.e. h1, h2, etc.)
         * @param level The level of element to create [1-6]
         * @param text The text to add to the element.
         * @param className Optional class name to be applied to created element.
         */
        DocumentHelper.createHeader = function (level, text, className) {
            var element = document.createElement("h" + level);
            element.innerHTML = text;
            if (className) {
                element.className = className;
            }
            return element;
        };
        return DocumentHelper;
    }());
    Blog.DocumentHelper = DocumentHelper;
})(Blog || (Blog = {}));
//# sourceMappingURL=main.js.map