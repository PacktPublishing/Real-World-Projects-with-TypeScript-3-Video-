<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="MyBlog.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Login</title>
    <link type="text/css" rel="stylesheet" href="main.css" />
</head>
<body>
    <h1>Login</h1>
    <ul>
        <li><a href="Default.aspx">Home</a></li>
    </ul>
    <form id="form1" runat="server">
        <div>
            Username: <asp:TextBox ID="username" runat="server" /><br />
            Password: <asp:TextBox ID="password" runat="server" TextMode="Password" /><br />
            <asp:Button ID="loginButton" Text="Login" OnClick="loginButton_Click" runat="server" />
        </div>
    </form>
</body>
</html>
