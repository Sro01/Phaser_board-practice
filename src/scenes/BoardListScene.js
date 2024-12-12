import Phaser from "phaser";
import { getPosts } from "./utils/localStorageUtils";

export default class BoardListScene extends Phaser.Scene {
    constructor() {
        super("BoardListScene");
    }

    create() {
        const title = this.add.dom(350, 20).createElement("div");
        title.node.innerHTML = `<h1>게시판</h1>`;

        const posts = getPosts();

        const postsContainer = this.add.dom(130, 100).createElement("div");
        postsContainer.node.className = "posts-container";

        // 게시글 목록 HTML 생성
        postsContainer.node.innerHTML = `
            <div class="post-list">
                ${posts
                    .map(
                        (post) => `
                    <div class="list-item" data-id="${post.id}">
                    <div class="list-title">${post.title}</div>
                    
                    </div>
                `
                    )
                    .join("")}
            </div>
            `;

        // // 게시글 제목 표시
        // posts.forEach((post, index) => {
        //     this.add
        //         .text(100, 100 + index * 40, post.title, {
        //             fontSize: "24px",
        //             color: "#ffffff",
        //         })
        //         .setInteractive()
        //         .on("pointerdown", () => {
        //             this.scene.start("BoardDetailScene", { postId: post.id });
        //         });
        // });

        // 게시글 클릭 이벤트
        const postItems = postsContainer.node.querySelectorAll(".list-item");
        postItems.forEach((postItem) => {
            postItem.addEventListener("click", () => {
                const postId = postItem.getAttribute("data-id");
                this.scene.start("BoardDetailScene", {
                    postId: parseInt(postId, 10),
                });
            });
        });

        const buttons = this.add.dom(300, 500).createElement("div");

        buttons.node.innerHTML = `
        <button id="home-button" class="outline-button">메인으로</button>
        <button id="newPost-button" class="filled-button">새 게시물 작성</button>
      `;
        // 로그아웃 버튼 이벤트
        const homeButton = buttons.node.querySelector("#home-button");
        homeButton.addEventListener("click", () => {
            this.scene.start("LoginScene");
        });

        const newPostButton = buttons.node.querySelector("#newPost-button");
        newPostButton.addEventListener("click", () => {
            this.scene.start("CreateBoardScene");
        });
    }
}
