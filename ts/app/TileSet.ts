import { Vector3 } from "Babylonjs";
import { Vector2 } from "shared/Vector2";

export class Tile {
    public content: ITileContent;
    public actions: { [id: string] : () => void } = {};
}

export interface ITileContent {
    position: Vector3;
    description: string;
    setTile(tile: Tile): void;
}

export class TileSet {
    public tileSize: number = 10;
    public tiles: Tile[][];

    constructor(size: number) {
        this.tiles = [];
        for (let x = -size / 2; x <= size / 2; x++) {
            this.tiles[x] = [];
        }
    }

    setTile(index: Vector2, content: ITileContent) {
        var tile = this.tiles[index.x][index.y];
        if (!tile)
            tile = this.tiles[index.x][index.y] = new Tile();
            
        tile.content = content;
        content.position = new Vector3(index.x * this.tileSize, content.position.y, index.y * this.tileSize);
        content.setTile(tile);
    }

    getTileIndex(position: Vector3) {
        return new Vector2(Math.round(position.x / this.tileSize), Math.round(position.z / this.tileSize));
    }

    getTile(index: Vector2) {
        var row = this.tiles[index.x];
        return row ? row[index.y] : undefined;
    }
}