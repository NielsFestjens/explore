import { Engine, Scene, Color3 } from 'babylonjs';

import { Random } from 'shared/Random';
import { MainScene } from 'app/MainScene';

let initialized = false;

const handleOnload = function () {
    if (initialized)
        return;
        
    initialized = true;
    
    var canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
	var engine = new Engine(canvas, true);
    engine.enableOfflineSupport = undefined;
    
    window.addEventListener("resize", function () { engine.resize(); }, false);

    var scene = createScene(engine);
    var random = new Random(500);
    var mainScene = new MainScene(random, scene);

    scene.executeWhenReady(() => {
        mainScene.initScene();
        scene.registerBeforeRender(() => { mainScene.update(); });
        engine.runRenderLoop(function () { scene.render(); });
    });

    window.addEventListener('blur',function(){
        engine.stopRenderLoop();
    });
    window.addEventListener('focus',function(){
        engine.runRenderLoop(function(){ scene.render(); });
    });
};

function createScene(engine: Engine): Scene {
    var scene = new Scene(engine);
    scene.clearColor = new Color3(0.8, 0.8, 0.8) as any;
    scene.fogMode = Scene.FOGMODE_EXP2;
    scene.fogDensity = 0.003;
    scene.fogColor = new Color3(0.8, 0.83, 0.8);
    scene.collisionsEnabled = true;
    return scene;
}

document.addEventListener("DOMContentLoaded", handleOnload, false);