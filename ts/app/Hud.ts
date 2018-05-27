export class Hud {
    private root: HTMLElement;
    private elements : { [id: string] : HTMLElement; } = {};

    constructor() {
        this.root = document.getElementById("renderCanvas").parentElement;
        var i = 1;
        this.createDiv("Position", i++ * 100, 100);
        this.createDiv("KeyInfo", i++ * 100, 100, "Key info");
        this.createDiv("PauseInfo", i++ * 100, 100);
        this.createDiv("Actions", i++ * 100, 100);
        this.createDiv("TileDescription", i++ * 100, 100);
        this.createDiv("FPS", i++ * 100, 100);
        this.Paused = false;
    }

    set Position(value: string) { this.setText("Position", value); }
    set KeyInfo(value: string) { this.setText("KeyInfo", value); }
    set Paused(value: boolean) { this.setText("PauseInfo", value ? "Game paused. Press 'P' to continue" : "Press 'P' to pause"); }
    set Actions(value: string) { this.setText("Actions", value || "No actions available"); }
    set TileDescription(value: string) { this.setText("TileDescription", value || "empty"); }
    set FPS(value: number) { this.setText("FPS", Math.round(value) + " FPS"); }

    private createDiv(id: string, top: number, left: number, value?: string) {
        var div = document.createElement("div");
        div.classList.add("displayLabel");
        div.style.top = top + "px";
        div.style.left = left + "px";
        div.innerHTML = value || "&nbsp;"
        this.root.appendChild(div);
        this.elements[id] = div;
    }

    private setText(id: string, value: string) {
        this.elements[id].innerHTML = value || "&nbsp;";
    }
}