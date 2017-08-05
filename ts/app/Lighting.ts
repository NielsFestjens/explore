import { HemisphericLight, DirectionalLight, ShadowGenerator, Scene, Vector3 } from 'Babylonjs';

export class Lighting {
    public ambientLight: HemisphericLight;
    public sun: DirectionalLight;
    public shadowGenerator: ShadowGenerator;

    constructor(scene: Scene) {
        this.ambientLight = new HemisphericLight("hemi", new Vector3(0, 1, -1), scene);

        this.sun = new DirectionalLight("dir", new Vector3(1, -1, -2), scene);
        this.sun.position = new Vector3(-300, 300, 600);
        this.shadowGenerator = new ShadowGenerator(2048, this.sun);
    }
}