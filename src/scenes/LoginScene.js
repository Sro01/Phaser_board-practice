import Phaser from "phaser";
import { getUser, saveUser, removeUser } from "./utils/localStorageUtils";

export default class LoginScene extends Phaser.Scene {
    constructor() {
        super("LoginScene");
    }

    create() {
        const container = this.add.dom(250, 200).createElement("div");
        container.node.className = "login-container"; // CSS 클래스 이름 설정

        // 로그인 상태 확인
        const currentUser = getUser();

        if (currentUser) {
            // 이미 로그인된 상태
            container.node.innerHTML = `
        <h2>환영합니다, ${currentUser}!</h2>
        <div class="buttons-container">
            <button id="logout-button" class="outline-button">로그아웃</button>
            <button id="board-button" class="filled-button">게시판으로 이동</button>
        </div>
      `;

            // 로그아웃 버튼 이벤트
            const logoutButton = container.node.querySelector("#logout-button");
            logoutButton.addEventListener("click", () => {
                removeUser();
                this.scene.restart(); // 로그아웃 후 씬 재시작
            });

            // 게시판 이동 버튼 이벤트
            const boardButton = container.node.querySelector("#board-button");
            boardButton.addEventListener("click", () => {
                this.scene.start("BoardListScene");
            });
        } else {
            // 로그인 상태가 아닌 경우
            container.node.innerHTML = `
  <h2>로그인 / 회원가입</h2>
  <input id="username-input" class="react-input" type="text" placeholder="아이디 입력" />
  <div class="button-container">
    <button id="login-button" class="filled-button">로그인</button>
  </div>
`;

            // 로그인 버튼 이벤트
            const loginButton = container.node.querySelector("#login-button");
            loginButton.addEventListener("click", () => {
                const usernameInput =
                    container.node.querySelector("#username-input");
                const username = usernameInput.value.trim();
                if (username) {
                    saveUser(username);
                    this.scene.start("BoardListScene"); // 로그인 성공 후 씬 전환
                }
            });
        }
    }
}
