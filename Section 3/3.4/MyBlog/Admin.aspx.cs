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
        }

        protected void logoutButton_Click(object sender, EventArgs e) {
            FormsAuthentication.SignOut();
            Session.Abandon();
            FormsAuthentication.RedirectToLoginPage();
        }
    }
}