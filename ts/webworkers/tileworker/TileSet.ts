import { Vector2 } from "../../shared/Vector2";
import { CreatedTree } from "./Events";

import { TileWorkerContext } from "./TileWorkerContext";

export class Tile {
    public content: ITileContent;
    public actions: string[];
}

export interface ITileContent {
    description: string;
    setTile(tile: Tile): void;
}

export class TileSet {
    public tileSize: number = 10;
    public tiles: Tile[][];

    constructor(
        size: number
    ) {
        this.tiles = [];
        for (let x = -size / 2; x <= size / 2; x++) {
            this.tiles[x] = [];
        }
    }

    setTile(x: number, z: number, content: ITileContent) {
        var tile = this.tiles[x][z];
        if (!tile)
            tile = this.tiles[x][z] = new Tile();
            
        tile.content = content;
        content.setTile(tile);
    }

    getTile(index: Vector2) {
        var row = this.tiles[index.x];
        return row ? row[index.y] : undefined;
    }
}