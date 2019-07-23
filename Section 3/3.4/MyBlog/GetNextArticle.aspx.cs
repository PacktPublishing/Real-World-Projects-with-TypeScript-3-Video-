using MyBlog.src;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MyBlog {
    public partial class GetNextArticle : System.Web.UI.Page {
        protected void Page_Load(object sender, EventArgs e) {
            // Make sure response is clear and set to return JSON.
            Response.Clear();
            Response.ContentType = "application/json; charset=utf-8";

            // Initialize the article manager.
            ArticleManager.Initialize();

            ArticleInfo articleInfo;

            // If no query string is provided, get the latest article. 
            // Otherwise get the article by id.
            string articleIdStr = Request.QueryString["lastArticleId"];
            if (string.IsNullOrEmpty(articleIdStr)) {
                articleInfo = ArticleManager.GetLatestArticle();
            } else {
                if (int.TryParse(articleIdStr, out int articleId)) {
                    articleInfo = ArticleManager.GetArticleById(articleId, true);
                } else {
                    throw new Exception("Unable to parse article id.");
                }
            }

            // Now that an article has been obtained, serialize it to JSON.
            string output = JsonConvert.SerializeObject(articleInfo);

            Response.Write(output);
            Response.End();
        }
    }
}