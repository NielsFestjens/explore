import { AbstractMesh, Scene, ShadowGenerator, Vector3, Color3, StandardMaterial, VertexData, VertexBuffer } from 'Babylonjs';

import { Random } from 'shared/Random';
import { Util } from 'app/Util';
import { Assets } from 'app/Assets';
import { Tile, ITileContent } from 'app/TileSet'

export class Tree implements ITileContent {

    private mesh: AbstractMesh;
    
    get position(): Vector3 { return this.mesh.position; }
    set position(value: Vector3) { this.mesh.position = value; }

    private seed: number;
    private age: number;
    private random: Random;
    private tile: Tile;
    
    public description: string;

    constructor(
        private scene: Scene, 
        private shadowGenerator: ShadowGenerator,
        private assets: Assets
    ) {
    }

    init(seed: number, age: number) {
        this.seed = seed;
        this.age = age;
        
        this.mesh = this.assets.treeMesh.createInstance("");
        this.mesh.checkCollisions = true;
        this.recalculateMesh();

        this.shadowGenerator.getShadowMap().renderList.push(this.mesh);
    }

    setTile(tile: Tile) {
        this.tile = tile;
        this.recalculate();
    }

    setAge(age: number) {
        this.age = age;
        this.recalculate();
    }

    chop() {
        this.age = 0;
        this.recalculate();
    }

    recalculate() {
        this.loadActionsToTile();
        this.recalculateMesh();
        this.description = `A tree with an age of ${this.age.toFixed(2)}, it is ${this.age > 0.5 ? '' : 'not'} ready to be chopped.`;
    }

    loadActionsToTile() {
        this.tile.actions = {};
        if (this.age > 0.5)
            this.tile.actions["Chop"] = this.chop;
    }

    recalculateMesh() {
        this.random = new Random(this.seed);
        var size = this.random.nextBetween(0.75, 1.25);
        var factor = this.age * size + 0.1;

        this.mesh.ellipsoid = new Vector3(5.0, 5.0, 5.0);
        this.mesh.rotation = new Vector3(0, this.random.next() * Math.PI * 2, 0);
        this.mesh.scaling = new Vector3(factor, factor, factor);
    }
}