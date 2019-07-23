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

        public ArticleInfo GetArticleById(int id) {

            // NOTE: In a DB, we would want to check for 
            // the highest article id *under* this id.
            actualId = (id - 1) % _articles.Count();
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
    }
}