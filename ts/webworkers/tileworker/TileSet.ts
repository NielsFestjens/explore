import { Vector2 } from "shared/Vector2";
import { CreatedTree } from "webworkers/tileworker/Events";
import { TileWorkerContext } from "webworkers/tileworker/TileWorkerContext";

export class Tile {
    public content: ITileContent;
    public actions: string[];

    constructor(
        public index: Vector2
    ) {
    }

    runTick(tickNr: number) {
        if (this.content)
            this.content.runTick(tickNr);        
    }
}

export interface ITileContent {
    description: string;
    setTile(tile: Tile): void;
    runTick(tickNr: number): void;
}

export class TileSet {
    public tileSize: number = 10;
    public tiles: Tile[][];
    private tickNr = 0;

    constructor(
        size: number
    ) {
        this.tiles = [];
        for (let x = -size / 2; x <= size / 2; x++) {
            this.tiles[x] = [];
        }
    }

    setTile(index: Vector2, content: ITileContent) {
        var tile = this.tiles[index.x][index.y];
        if (!tile)
            tile = this.tiles[index.x][index.y] = new Tile(index);
            
        tile.content = content;
        content.setTile(tile);
    }

    getTile(index: Vector2) {
        var row = this.tiles[index.x];
        return row ? row[index.y] : undefined;
    }

    initialize() {
        setInterval(() => this.runTick(), 1000);
    }

    runTick() {
        this.tickNr++;
        for (var tileRow of this.tiles) {
            for (var tile of tileRow) {
                if (tile)
                    tile.runTick(this.tickNr);
            }
        }
    }
}