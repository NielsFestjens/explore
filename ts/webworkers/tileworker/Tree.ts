import { ITileContent, Tile } from "./TileSet";

export class Tree implements ITileContent {
    public description: string;
    private tile: Tile;
    
    private seed: number;
    private age: number;

    init(seed: number, age: number) {
        this.seed = seed;
        this.age = age;
    }

    public setTile(tile: Tile) {
        this.tile = tile;
    }
}