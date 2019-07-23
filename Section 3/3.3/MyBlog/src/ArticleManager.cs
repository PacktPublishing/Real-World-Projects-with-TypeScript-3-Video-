using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.src {

    /// <summary>
    /// Manages articles in the system.
    /// </summary>
    public static class ArticleManager {
        private static IArticleDataProvider _provider;

        /// <summary>
        /// Performs initialization routines on the article manager.
        /// </summary>
        public static void Initialize() {

            // Hook up the data provider.
            _provider = new FakeArticleDataProvider();

            // Initialize the data provider.
            _provider.Initialize();
        }

        /// <summary>
        /// Gets the article with the provided identifier. If it is not found,
        /// the one with the next highest identifier is returned.
        /// </summary>
        /// <param name="id">The article identifier.</param>
        /// <returns></returns>
        public static ArticleInfo GetArticleById(int id, bool getNext) {
            return _provider.GetArticleById(id, getNext);
        }

        /// <summary>
        /// Gets the latest article in the system.
        /// </summary>
        /// <returns></returns>
        public static ArticleInfo GetLatestArticle() {
            return _provider.GetLatestArticle();
        }

        public static IEnumerable<ArticleInfo> GetArticleIdsAndTitltes() {
            return _provider.GetArticleIdsAndTitles();
        }

        public static void UpdateArticle(ArticleInfo article) {
            _provider.UpdateArticle(article.Id, article.Title, article.Content);
        }

        public static int CreateArticle(string title, string content) {
            return _provider.CreateArticle(title, content);
        }
    }
}