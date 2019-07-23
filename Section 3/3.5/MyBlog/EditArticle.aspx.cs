using MyBlog.src;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MyBlog {
    public partial class EditArticle : System.Web.UI.Page {

        private bool _create = false;

        protected void Page_Load(object sender, EventArgs e) {
            if (IsPostBack) {
                return;
            }

            string articleId = Request.QueryString["articleId"];
            if (string.IsNullOrEmpty(articleId)) {
                // New article.
                _create = true;
                saveButton.Text = "Create";
            } else {
                // Edit an existing article.
                if (int.TryParse(articleId, out int id)) {
                    ArticleInfo article = ArticleManager.GetArticleById(id, false);
                    title.Text = article.Title;
                    content.Text = article.Content;
                    articleIdField.Value = article.Id.ToString();
                }
            }
        }

        protected void saveButton_Click(object sender, EventArgs e) {
            _create = string.IsNullOrEmpty(articleIdField?.Value);
            if (_create) {
                int newid = ArticleManager.CreateArticle(
                    title.Text, content.Text);

                Response.Redirect("EditArticle.aspx?articleId=" + 
                    newid.ToString());
            } else {
                if (int.TryParse(articleIdField?.Value, out int articleId)) {
                    ArticleManager.UpdateArticle(
                        new ArticleInfo(articleId, title.Text, content.Text));
                    Response.Redirect("EditArticle.aspx?articleId=" + 
                        articleIdField?.Value.ToString());
                } else {
                    throw new Exception("Unable to parse article id");
                }
            }
        }
    }
}