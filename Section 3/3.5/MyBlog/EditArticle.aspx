<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EditArticle.aspx.cs" Inherits="MyBlog.EditArticle" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Edit Article</title>
    <link type="text/css" rel="stylesheet" href="main.css" />
    <link type="text/css" rel="stylesheet" href="admin.css" />
</head>
<body>
    <form id="form1" runat="server">
        <h1>Edit Article</h1>
        <ul>
            <li><a href="Default.aspx">Home</a></li>
            <li><a href="Admin.aspx">Admin Home</a></li>
        </ul>
        <div>
            <asp:TextBox ID="title" runat="server" CssClass="titleBox">Title</asp:TextBox><br />
            <asp:TextBox ID="content" TextMode="MultiLine" runat="server">
                Article content goes here.
            </asp:TextBox><br />
            <asp:Button ID="saveButton" runat="server" Text="Save" OnClick="saveButton_Click" />
            <asp:HiddenField ID="articleIdField" Value="" runat="server" />
        </div>
    </form>
</body>
</html>
