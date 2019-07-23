<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Admin.aspx.cs" Inherits="MyBlog.Admin" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Admin Home</title>
</head>
<body>
    <form id="form1" runat="server">
        <h1>Admin Home</h1>
        <ul>
            <li><a href="Default.aspx">Home</a></li>
        </ul>
        <div>
            <asp:Button ID="logoutButton" Text="Logout" OnClick="logoutButton_Click" runat="server" /> | 
        </div>
    </form>
</body>
</html>
