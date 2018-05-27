import { SceneLoader, Mesh, Scene, Vector3 } from "babylonjs";

export class Assets {
    constructor(
        private scene: Scene
    ) {
        SceneLoader.ImportMesh("Person", "models/", "person2.babylon", this.scene, () => {
        });
        SceneLoader.ImportMesh("Tree", "models/", "tree.babylon", this.scene, (meshes:Mesh[]) => {
            var mesh = meshes[0];
            mesh.isVisible = false;
            mesh.convertToFlatShadedMesh();
        });
    }

    public get personMesh() { return this.scene.getMeshByName("Person") as Mesh; }
    public get treeMesh() { return this.scene.getMeshByName("Tree") as Mesh; }
}