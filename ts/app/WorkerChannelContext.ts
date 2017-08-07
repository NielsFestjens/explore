import { Scene, ShadowGenerator } from "Babylonjs";

import { WorkerChannel } from "app/WorkerChannel";
import { Assets } from "app/Assets";
import { TileSet } from "app/TileSet";
import { MainScene } from "app/MainScene";

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