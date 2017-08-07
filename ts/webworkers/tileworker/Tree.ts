import { ITileContent, Tile } from "webworkers/tileworker/TileSet";
import { Random } from "shared/Random";
import { TileWorkerContext } from 'webworkers/tileworker/TileWorkerContext';

export class Tree implements ITileContent {
    public description: string;
    private tile: Tile;
    
    private seed: number;
    private age: number;
    private random: Random;

    constructor(
        private context: TileWorkerContext
    ) {

    }

    init(seed: number, age: number) {
        this.seed = seed;
        this.age = age;
    }

    public setTile(tile: Tile) {
        this.tile = tile;
    }

    public runTick(tickNr: number) {
        var random = new Random(this.seed + tickNr);
        if (this.age < 1) {
            if (random.next() < 0.1) {
                this.age += .01;
                if (this.age > 1)
                    this.age = 1;
            }
        }
    }
}