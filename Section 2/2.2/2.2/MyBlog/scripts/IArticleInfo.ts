module Blog {

    /**
     * Represents an article in the system.
     */
    export interface IArticleInfo {

        /** The article identifier. */
        Id: number;

        /** The article title. */
        Title: string;

        /** The content of the article. */
        Content: string;
    }
}