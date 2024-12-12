export const getUser = () => localStorage.getItem("user");
export const saveUser = (user) => localStorage.setItem("user", user);
export const removeUser = () => localStorage.removeItem("user");

export const getPosts = () => JSON.parse(localStorage.getItem("posts")) || [];
export const savePost = (post) => {
    const posts = getPosts();
    post.id = Date.now();
    post.comments = [];
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
};

export const getPost = (id) => getPosts().find((post) => post.id === id);

// 댓글 저장
export const saveComment = (postId, comment) => {
    const posts = getPosts();
    const post = posts.find((p) => p.id === postId);
    if (post) {
        post.comments.push(comment);
        localStorage.setItem("posts", JSON.stringify(posts));
    }
};

// 게시글 삭제
export const deletePost = (postId) => {
    const posts = getPosts();
    const updatedPosts = posts.filter((p) => p.id !== postId);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
};

// 댓글 삭제
export const deleteComment = (postId, commentIndex) => {
    const posts = getPosts();
    const post = posts.find((p) => p.id === postId);
    if (post && post.comments[commentIndex]) {
        post.comments.splice(commentIndex, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
    }
};
