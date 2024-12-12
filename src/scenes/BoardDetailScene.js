import Phaser from "phaser";
import {
    getPost,
    saveComment,
    deletePost,
    deleteComment,
} from "./utils/localStorageUtils";

export default class BoardDetailScene extends Phaser.Scene {
    constructor() {
        super("BoardDetailScene");
    }

    init(data) {
        this.postId = data.postId;
    }

    create() {
        const post = getPost(this.postId);

        if (!post) {
            console.error(`Post with id ${this.postId} not found`);
            this.scene.start("BoardListScene");
            return;
        }

        // 게시판 제목 추가
        const title = this.add.dom(350, 20, "div");
        title.node.innerHTML = `<h1 style="cursor: pointer;">게시판</h1>`;
        title.node.addEventListener("click", () => {
            this.scene.start("BoardListScene");
        });

        // 게시글 상세 HTML 구조 생성
        const postContainer = this.add.dom(130, 100).createElement("div");
        postContainer.node.className = "post-detail-container";
        postContainer.node.innerHTML = `
            <h1 class="post-title">${post.title}</h1>
            <p class="post-content">${post.content}</p>
            <div class="button-container">
                <button id="delete-post" class="delete-button">게시글 삭제</button>
            </div>
            <h2 class="comments-title">댓글</h2>
            <div id="comments-list" class="comments-list">
                ${post.comments
                    .map(
                        (comment, index) => `
                    <div class="comment-item" data-index="${index}">
                        <span class="comment-author">${comment.author}:</span>
                        <span class="comment-content">${comment.text}</span>
                        <button id="delete-comment" class="delete-button">삭제</button>
                    </div>
                `
                    )
                    .join("")}
            </div>
            <div class="comment-form">
                <input id="comment-input" class="comment-input" type="text" placeholder="댓글 입력" />
                <button id="add-comment" class="filled-button">추가</button>
            </div>
        `;

        // 게시글 삭제 버튼 이벤트
        const deletePostButton =
            postContainer.node.querySelector("#delete-post");
        deletePostButton.addEventListener("click", () => {
            deletePost(this.postId);
            this.scene.start("BoardListScene");
        });

        // 댓글 삭제 버튼 이벤트
        const commentDeleteButtons =
            postContainer.node.querySelectorAll("#delete-comment");
        commentDeleteButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const commentIndex = parseInt(
                    button.closest(".comment-item").getAttribute("data-index"),
                    10
                );
                deleteComment(this.postId, commentIndex);
                this.scene.restart();
            });
        });

        // 댓글 추가 버튼 이벤트
        const addCommentButton =
            postContainer.node.querySelector("#add-comment");
        addCommentButton.addEventListener("click", () => {
            const commentInput =
                postContainer.node.querySelector("#comment-input");
            const commentText = commentInput.value.trim();
            const author = localStorage.getItem("user"); // 현재 로그인된 사용자
            if (commentText) {
                saveComment(this.postId, { text: commentText, author });
                this.scene.restart();
            }
        });
    }
}
