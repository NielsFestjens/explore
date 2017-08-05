import * as Events from '../../webworkers/tileworker/Events';
import { WorkerChannelContext } from "../WorkerChannelContext";
import { Tree } from "../Tree";

export class CreatedTree {
    handle(context: WorkerChannelContext, event: Events.CreatedTree): void {
        console.log(event.seed);
        var tree = new Tree(context.scene, context.shadowGenerator, context.assets);
        tree.init(event.seed, event.age);
        context.tileSet.setTile(event.tileIndex, tree);
    }
}