import Phaser from "phaser";
import { savePost } from "./utils/localStorageUtils";

export default class CreateBoardScene extends Phaser.Scene {
    constructor() {
        super("CreateBoardScene");
    }

    create() {
        // 컨테이너 div 생성
        const container = this.add.dom(200, 100).createElement("div");

        // HTML 구조를 innerHTML로 작성
        container.node.innerHTML = `
      <div class="post-container">
        <!-- 제목 -->
        <h1 class="title">새 게시물 작성</h1>

        <!-- 제목 입력 필드 -->
        <input 
          type="text" 
          placeholder="제목 입력" 
          class="text-input"
          id="title-input"
        />

        <!-- 내용 입력 필드 -->
        <textarea 
          placeholder="내용 입력" 
          class="textarea-input"
          id="content-input"
        ></textarea>

        <!-- 버튼 컨테이너 -->
        <div class="button-container">
          <!-- 목록으로 버튼 -->
          <button id="home-button" class="outline-button">목록으로</button>

          <!-- 저장하기 버튼 -->
          <button id="newPost-button" class="filled-button">저장하기</button>
        </div>
      </div>
    `;

        // 버튼 이벤트 연결
        const homeButton = container.node.querySelector("#home-button");
        homeButton.addEventListener("click", () => {
            this.scene.start("BoardListScene");
        });

        const newPostButton = container.node.querySelector("#newPost-button");
        newPostButton.addEventListener("click", () => {
            const titleInput = container.node.querySelector("#title-input");
            const contentInput = container.node.querySelector("#content-input");
            const title = titleInput.value.trim();
            const content = contentInput.value.trim();

            if (title && content) {
                console.log("저장된 데이터:", { title, content });
                savePost({ title, content }); // savePost 호출 (주석 처리)
                this.scene.start("BoardListScene");
            } else {
                alert("제목과 내용을 모두 입력해주세요.");
            }
        });
    }
}
