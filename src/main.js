import LoginScene from "./scenes/LoginScene";
import BoardListScene from "./scenes/BoardListScene";
import BoardDetailScene from "./scenes/BoardDetailScene";
import CreateBoardScene from "./scenes/CreateBoardScene";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    backgroundColor: "#1d1d1d",
    dom: {
        createContainer: true, // DOM 요소 활성화
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [LoginScene, BoardListScene, BoardDetailScene, CreateBoardScene],
};

export default new Phaser.Game(config);
