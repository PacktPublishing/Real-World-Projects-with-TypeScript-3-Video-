<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="MyBlog.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>MyBlog</title>
    <script type="text/javascript" src="main.js"></script>
    <link type="text/css" rel="stylesheet" href="main.css" />
</head>
<body>
    <form id="form1" runat="server">
        <h1 class="banner">MyBlog</h1>
        <ul>
            <% if ( User.Identity.IsAuthenticated ) { %>
            <li><a href="Admin.aspx">Admin</a></li>
            <% }else { %>
            <li><a href="Login.aspx">Login</a></li>
            <% } %>
        </ul>
        <div id="articles"></div>
        <div class="more" onclick="articleManager.loadNextArticle();return false;">Load Next Article</div>
    </form>
</body>
</html>
