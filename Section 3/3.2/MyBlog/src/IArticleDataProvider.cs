namespace MyBlog.src {

    /// <summary>
    /// An interface to an article provider.
    /// </summary>
    public interface IArticleDataProvider {

        /// <summary>
        /// Initializes this provider.
        /// </summary>
        void Initialize();

        /// <summary>
        /// Gets an article by the provided identifier.
        /// </summary>
        /// <param name="id">The identifier to get the article by.</param>
        /// <returns></returns>
        ArticleInfo GetArticleById(int id);

        /// <summary>
        /// Gets the latest article.
        /// </summary>
        /// <returns></returns>
        ArticleInfo GetLatestArticle();
    }
}
