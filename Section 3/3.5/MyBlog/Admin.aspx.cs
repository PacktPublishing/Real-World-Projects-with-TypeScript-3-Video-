using MyBlog.src;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MyBlog {
    public partial class Admin : System.Web.UI.Page {
        protected void Page_Load(object sender, EventArgs e) {

            // Boot out if not logged in.
            if (!User.Identity.IsAuthenticated) {
                FormsAuthentication.RedirectToLoginPage();
            }

            ArticleManager.Initialize();

            var articles = ArticleManager.GetArticleIdsAndTitltes();
            foreach (var article in articles) {
                articleList.Items.Add(
                    new ListItem(article.Title, article.Id.ToString()));
            }
        }

        protected void logoutButton_Click(object sender, EventArgs e) {
            FormsAuthentication.SignOut();
            Session.Abandon();
            FormsAuthentication.RedirectToLoginPage();
        }

        protected void createArticle_Click(object sender, EventArgs e) {
            Response.Redirect("EditArticle.aspx");
        }

        protected void editArticleButton_Click(object sender, EventArgs e) {
            Response.Redirect("EditArticle.aspx?articleId=" +
                articleList.SelectedValue.ToString());
        }
    }
}