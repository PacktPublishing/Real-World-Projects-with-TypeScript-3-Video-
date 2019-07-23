using System.Collections.Generic;

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
        ArticleInfo GetArticleById(int id, bool getNext);

        /// <summary>
        /// Gets the latest article.
        /// </summary>
        /// <returns></returns>
        ArticleInfo GetLatestArticle();

        /// <summary>
        /// Gets the article ids and titles.
        /// </summary>
        /// <returns></returns>
        IEnumerable<ArticleInfo> GetArticleIdsAndTitles();

        /// <summary>
        /// Updates the article.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="title">The title.</param>
        /// <param name="content">The content.</param>
        /// <returns>True if successful; otherwise false.</returns>
        bool UpdateArticle(int id, string title, string content);

        /// <summary>
        /// Creates a new article.
        /// </summary>
        /// <param name="title">The title.</param>
        /// <param name="content">The content.</param>
        /// <returns>The id of the newly created article.</returns>
        int CreateArticle(string title, string content);
    }
}
