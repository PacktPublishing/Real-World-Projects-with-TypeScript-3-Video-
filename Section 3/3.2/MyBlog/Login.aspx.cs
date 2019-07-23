using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace MyBlog {
    public partial class Login : System.Web.UI.Page {
        protected void Page_Load(object sender, EventArgs e) {

        }

        protected void loginButton_Click(object sender, EventArgs e) {
            if (username.Text.ToLower() == "admin" && password.Text == "password") {
                FormsAuthentication.RedirectFromLoginPage(username.Text, true);
            } else {
                Response.Write("Login failed!");
            }
        }
    }
}