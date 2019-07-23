CREATE TABLE [dbo].[Articles]
(
	[id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [title] NVARCHAR(255) NOT NULL, 
    [content] NTEXT NOT NULL
)
