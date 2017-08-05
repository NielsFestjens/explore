import { Scene, ShadowGenerator } from "Babylonjs";

import { WorkerChannel } from "./WorkerChannel";
import { Assets } from "./Assets";
import { TileSet } from "./TileSet";
import { MainScene } from "./MainScene";

export class WorkerChannelContext {
    public scene: Scene;
    public shadowGenerator: ShadowGenerator;
    public assets: Assets;
    public tileSet: TileSet;
    
    constructor(
        public worker: WorkerChannel,
        mainScene: MainScene
    ) {
        this.scene = mainScene.scene;
        this.shadowGenerator = mainScene.lighting.shadowGenerator;
        this.assets = mainScene.assets;
        this.tileSet = mainScene.tileSet
    }
}