import { Scene, AbstractMesh, Mesh, Vector3, FollowCamera, ShadowGenerator } from 'babylonjs';

import { GameState } from 'app/GameState';
import { Keys } from 'app/Keys';
import { Assets } from 'app/Assets';

export class Player {

    public mesh: AbstractMesh;
    private isMoving: boolean = false;
    private camera: FollowCamera;

    constructor(
        private scene: Scene,
        private gameState: GameState, 
        private shadowGenerator: ShadowGenerator,
        assets: Assets
    ) {
        this.mesh = assets.personMesh;
        this.mesh.scaling = new Vector3(0.5, 0.5, 0.5);
        this.mesh.position.y = 0;
        this.mesh.position.x = -5;
        this.mesh.receiveShadows = true;
        this.mesh.checkCollisions = true;
        this.mesh.ellipsoid = new Vector3(5.0, 5.0, 5.0);
        // this.shadowGenerator.getShadowMap().renderList.push(this.mesh);

        this.camera = new FollowCamera("FollowCamera", new Vector3(0, 0, 0), scene);
        this.camera.radius = 20;
        this.camera.lockedTarget = this.mesh;
        this.camera.speed *= 2;
        scene.activeCamera = this.camera;
    }

    update() {
        var isMoving = false;
        if (this.gameState.keyPressed[Keys.arrowUp] || this.gameState.keyPressed[Keys.z]) {
            this.mesh.position.x -= Math.sin(this.mesh.rotation.y) * 0.3;
            this.mesh.position.z -= Math.cos(this.mesh.rotation.y) * 0.3;
            // this.mesh.moveWithCollisions(new Vector3(-Math.sin(this.mesh.rotation.y) * 0.5, 0, -Math.cos(this.mesh.rotation.y) * 0.5))
            isMoving = true;
        }

        if (this.gameState.keyPressed[Keys.arrowDown] || this.gameState.keyPressed[Keys.s]) {
            this.mesh.position.x += Math.sin(this.mesh.rotation.y);
            this.mesh.position.z += Math.cos(this.mesh.rotation.y);
            isMoving = true;
        }

        if (this.gameState.keyPressed[Keys.arrowLeft] || this.gameState.keyPressed[Keys.q]) {
            this.mesh.rotation.y -= 0.03;
        }

        if (this.gameState.keyPressed[Keys.arrowRight] || this.gameState.keyPressed[Keys.d]) {
            this.mesh.rotation.y += 0.03;
        }

        if (isMoving !== this.isMoving) {
            this.isMoving = isMoving;
            if (isMoving)
                this.scene.beginAnimation(this.mesh.skeleton, 30, 50, true, 1.0);
            else
                this.scene.beginAnimation(this.mesh.skeleton, 0, 20, true, 0.2);
        }

        if (this.gameState.keyReleased[Keys.r]) {
            this.mesh.position.x = -5;
            this.mesh.position.z= 0;
            this.mesh.rotation.y = 0;
        }
    }
}