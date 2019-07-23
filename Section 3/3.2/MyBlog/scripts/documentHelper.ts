module Blog {

    /**
     * A utility class to assist with the creation of document elements.
     */
    export class DocumentHelper {

        /**
         * Creates an article entry using the provided info. Returns an element to be added to the page.
         * @param articleInfo The article info to create the entry from.
         */
        public static createArticleEntry(articleInfo: IArticleInfo): HTMLDivElement {
            let wrapper = DocumentHelper.createDiv("article");
            wrapper.id = "article_" + articleInfo.Id;

            let header = DocumentHelper.createHeader(2, articleInfo.Title,
                "article-title");
            wrapper.appendChild(header);

            let content = DocumentHelper.createDiv("article-content");
            content.innerHTML = articleInfo.Content;
            wrapper.appendChild(content);

            return wrapper;
        }

        /**
         * Creates a div element.
         * @param className Optional class name to be applied to created div.
         */
        private static createDiv(className?: string): HTMLDivElement {
            let element = document.createElement("div") as HTMLDivElement;
            if (className) {
                element.className = className;
            }
            return element;
        }

        /**
         * Creates a header element with the specified level (i.e. h1, h2, etc.)
         * @param level The level of element to create [1-6]
         * @param text The text to add to the element.
         * @param className Optional class name to be applied to created element.
         */
        private static createHeader(level: number, text: string, className?: string): HTMLHeadingElement {
            let element = document.createElement("h" + level) as HTMLHeadingElement;
            element.innerHTML = text;
            if (className) {
                element.className = className;
            }
            return element;
        }
    }
}