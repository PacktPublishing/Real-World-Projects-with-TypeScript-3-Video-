module Blog {

    /**
     * Manages the retrieval of articles in the system.
     */
    export class ArticleManager {

        private _articleContainer: HTMLDivElement;
        private _lastLoadedArticleId: number;

        /**
         * Creates a new article manager.
         * @param elementId The identifier of the HTML element to insert into.
         */
        public constructor(elementId: string) {
            this._articleContainer = document.getElementById(elementId) as HTMLDivElement;
            if (this._articleContainer === undefined) {
                throw new Error("Unable to find element named: " + elementId);
            }
        }

        /**
         * Loads the next article in the system.
         */
        public loadNextArticle(): void {
            let request = new XMLHttpRequest();
            request.addEventListener("readystatechange", this.onArticleLoaded.bind(this, request));
            request.addEventListener("error", this.onArticleLoadError.bind(this, request));
            request.addEventListener("abort", this.onArticleLoadAborted.bind(this, request));

            let url = "GetNextArticle.aspx";
            if (this._lastLoadedArticleId !== undefined) {
                url += "?lastArticleId=" + this._lastLoadedArticleId;
            }
            request.open("GET", url, true);
            request.send(null);
        }

        /**
         * Called when an article request has loaded.
         * @param request The request object.
         */
        private onArticleLoaded(request: XMLHttpRequest): void {
            if (request.readyState === XMLHttpRequest.DONE) {

                let responseText = request.responseText.trim();
                if (responseText === "") {
                    throw new Error("Error parsing response.");
                }

                // Parse the JSON response.
                let articleInfo: IArticleInfo = JSON.parse(responseText) as IArticleInfo;

                // Set the last post loaded marker.
                this._lastLoadedArticleId = articleInfo.Id;

                // Create the post elements and add it to the page.
                let articleElement = DocumentHelper.createArticleEntry(articleInfo);
                if (articleElement !== undefined) {
                    this._articleContainer.appendChild(articleElement);
                }
            }
        }

        /**
         * Called when there is an error loading an article.
         * @param request The request object.
         */
        private onArticleLoadError(request: XMLHttpRequest): void {
            console.warn("Error loading post: " + request.status + " - " + request.statusText);
        }

        /**
         * Called when the article request is aborted.
         * @param request The request object.
         */
        private onArticleLoadAborted(request: XMLHttpRequest): void {
            console.warn("Article load aborted.");
        }
    }
}