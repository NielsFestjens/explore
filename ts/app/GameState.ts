import { Tools } from 'Babylonjs';

import { Keys } from 'app/Keys';
import { Hud } from 'app/Hud';

export class GameState {
    public paused: boolean = false;
    public keyPressed: any = {};
    
    private newKeyReleased: any = {};
    public keyReleased: any = {};

    constructor(
        private hud: Hud
    ) {
        Tools.RegisterTopRootEvents([
            { name: "keydown", handler: (e: any) => this.handleKeyDown(e) },
            { name: "keyup", handler: (e: any) => this.handleKeyUp(e) }
        ]);
    }

    update() {
        this.keyReleased = this.newKeyReleased;
        this.newKeyReleased = {};

        if (this.keyReleased[Keys.p]){
            this.paused = !this.paused;
            this.hud.Paused = this.paused;
        }   
    }
    
    handleKeyDown(e: KeyboardEvent) {
        this.keyPressed[e.keyCode] = true;
        this.hud.KeyInfo = `pressed ${Keys[e.keyCode] || "[unknown]"} (${e.keyCode})`;
    }

    handleKeyUp(e: KeyboardEvent) {
        this.keyPressed[e.keyCode] = false;
        this.newKeyReleased[e.keyCode] = true;
        this.hud.KeyInfo = `released ${Keys[e.keyCode] || "[unknown]"} (${e.keyCode})`;
    }
}