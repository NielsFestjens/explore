import * as Events from 'webworkers/tileworker/Events';
import { WorkerChannelContext } from "app/WorkerChannelContext";
import { Tree } from "app/Tree";

export class CreatedTree {
    handle(context: WorkerChannelContext, event: Events.CreatedTree): void {
        var tree = new Tree(context.scene, context.shadowGenerator, context.assets);
        tree.init(event.seed, event.age);
        context.tileSet.setTile(event.tileIndex, tree);
    }
}