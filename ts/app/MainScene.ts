import { Engine, Scene, Color3, Vector3, Mesh, StandardMaterial, ArcRotateCamera, ShaderMaterial, FreeCamera, SceneLoader } from 'Babylonjs';

import { Random } from 'shared/Random';
import { GameState } from 'app/GameState';
import { Tree } from 'app/Tree';
import { Player } from 'app/Player';
import { Lighting } from 'app/Lighting';
import { TileSet } from 'app/TileSet';
import { Hud } from 'app/Hud';
import { Keys } from 'app/Keys';
import { Assets } from 'app/Assets';
import { WorkerChannel } from 'app/WorkerChannel';
import * as TileWorkerCommands from 'webworkers/tileworker/Commands';
import { WorkerChannelContext } from "app/WorkerChannelContext";

export class MainScene {

    public assets: Assets;
    public workerChannel: WorkerChannel;

    public hud: Hud;
    public gameState: GameState;
    public tileSet: TileSet;
    public lighting: Lighting;

    public player: Player;
    
    constructor(
        public random: Random,
        public scene: Scene
    ) { 
        this.assets = new Assets(this.scene);
    }

    initScene() {
        this.hud = new Hud();
        this.gameState = new GameState(this.hud);
        this.tileSet = new TileSet(100);
        this.lighting = new Lighting(this.scene);
        
        this.createSkybox();
        this.createGround();

        this.player = new Player(this.scene, this.gameState, this.lighting.shadowGenerator, this.assets);
        var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), this.scene);
        
        this.workerChannel = new WorkerChannel(this);
        this.workerChannel.send(new TileWorkerCommands.Initialize());
    };

    createSkybox() {
        var skybox = Mesh.CreateSphere("skyBox", 100, 1000, this.scene);

        Engine.ShadersRepository = "shaders/";

        var shader = new ShaderMaterial("gradient", this.scene, "gradient", {});
        shader.setFloat("offset", 10);
        shader.setColor3("topColor", Color3.FromInts(0, 119, 255));
        shader.setColor3("bottomColor", Color3.FromInts(240, 240, 255));
        shader.backFaceCulling = false;

        skybox.material = shader;
    };

    createGround() {
        var ground = Mesh.CreateGround("ground", 1000, 1000, 1, this.scene);
        const material = new StandardMaterial("ground", this.scene)
        material.diffuseColor = Color3.FromInts(193, 181, 151);
        material.specularColor = Color3.Black();
        ground.material = material;
        ground.checkCollisions = true;
        ground.receiveShadows = true;
    }

    update() {
        this.gameState.update();

        if (this.gameState.paused || !this.player.mesh)
            return;

        this.player.update();

        var playerTileIndex = this.tileSet.getTileIndex(this.player.mesh.position);
        this.hud.Position = `(${this.player.mesh.position.x.toFixed(2)},${this.player.mesh.position.z.toFixed(2)}) -> (${playerTileIndex.x},${playerTileIndex.y})`;
        var playerTile = this.tileSet.getTile(playerTileIndex);
        if (playerTile === undefined) {
            this.hud.Actions = "";
            this.hud.TileDescription = "";
        } else {
            var actionsString = "";
            for (var action in playerTile.actions) {
                if (actionsString === "")
                    actionsString += "[E] to ";

                actionsString += action;
            }
            this.hud.Actions = actionsString;
            this.hud.TileDescription = playerTile.content.description;

            if (this.gameState.keyReleased[Keys.e]) {
                for (var action in playerTile.actions) {
                    playerTile.actions[action].apply(playerTile.content);
                }
            }
        }
    }
}