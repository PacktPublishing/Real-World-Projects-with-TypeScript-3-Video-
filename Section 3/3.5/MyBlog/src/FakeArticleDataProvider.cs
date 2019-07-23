using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyBlog.src {

    /// <summary>
    /// Provides fake, hard-coded data for use with the blog.
    /// </summary>
    public class FakeArticleDataProvider : IArticleDataProvider {

        private List<ArticleInfo> _articles = new List<ArticleInfo>();

        public ArticleInfo GetArticleById(int id, bool getNext = true) {

            // NOTE: In a DB, we would want to check for 
            // the highest article id *under* this id.
            int actualId;
            if (getNext) {
                actualId = (id - 1) % _articles.Count();
            } else {
                actualId = id;
            }
            return _articles[actualId];
        }

        public ArticleInfo GetLatestArticle() {
            return _articles.Last();
        }

        public void Initialize() {

            // Generate some random articles here.
            for (int i = 0; i < 100; ++i) {
                string title = $"Article #{i} Title";

                string content = "<img src=\"https://placekitten.com/400/300\"/>" +
                    "<ul>" +
                    "<li>Some point about something</li>" +
                    "<li><a href='http://packtpub.com' target='_blank'>Packt</a></li>" +
                    "</ul>";

                _articles.Add(new ArticleInfo(i, title, content));
            }
        }

        /// <summary>
        /// Gets the article ids and titles.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<ArticleInfo> GetArticleIdsAndTitles() {
            return _articles;
        }

        /// <summary>
        /// Updates the article.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="title">The title.</param>
        /// <param name="content">The content.</param>
        /// <returns>True if successful; otherwise false.</returns>
        public bool UpdateArticle(int id, string title, string content) {
            _articles[id] = new ArticleInfo(id, title, content);
            return true;
        }

        /// <summary>
        /// Creates a new article.
        /// </summary>
        /// <param name="title">The title.</param>
        /// <param name="content">The content.</param>
        /// <returns>The id of the newly created article.</returns>
        public int CreateArticle(string title, string content) {
            _articles.Add(new ArticleInfo(_articles.Count, title, content));
            return _articles.Count - 1;
        }
    }
}