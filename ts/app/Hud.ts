export class Hud {
    private root: HTMLElement;
    private elements : { [id: string] : HTMLElement; } = {};

    constructor() {
        this.root = document.getElementById("renderCanvas").parentElement;
        this.createDiv("Position", 100, 100);
        this.createDiv("KeyInfo", 200, 100, "Key info");
        this.createDiv("PauseInfo", 300, 100);
        this.createDiv("Actions", 400, 100);
        this.createDiv("TileDescription", 500, 100);
        this.Paused = false;
    }

    set Position(value: string) { this.setText("Position", value); }
    set KeyInfo(value: string) { this.setText("KeyInfo", value); }
    set Paused(value: boolean) { this.setText("PauseInfo", value ? "Game paused. Press 'P' to continue" : "Press 'P' to pause"); }
    set Actions(value: string) { this.setText("Actions", value || "No actions available"); }
    set TileDescription(value: string) { this.setText("TileDescription", value || "empty"); }

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