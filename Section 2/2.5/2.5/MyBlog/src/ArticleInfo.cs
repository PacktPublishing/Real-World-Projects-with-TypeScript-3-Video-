namespace MyBlog.src {

    /// <summary>
    /// Holds article information.
    /// </summary>
    public class ArticleInfo {

        /// <summary>
        /// Creates a new ArticleInfo object.
        /// </summary>
        /// <param name="id">The identifier of this object.</param>
        /// <param name="title">The title of this object.</param>
        /// <param name="content">The content of this object.</param>
        public ArticleInfo(int id, string title, string content) {
            Id = id;
            Title = title;
            Content = content;
        }

        /// <summary>
        /// The identifier of this object.
        /// </summary>
        public int Id { get; private set; }

        /// <summary>
        /// The title of this object.
        /// </summary>
        public string Title { get; private set; }

        /// <summary>
        /// The content of this object.
        /// </summary>
        public string Content { get; private set; }
    }
}