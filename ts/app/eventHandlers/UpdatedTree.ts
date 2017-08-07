import * as Events from 'webworkers/tileworker/Events';
import { WorkerChannelContext } from "app/WorkerChannelContext";
import { Tree } from "app/Tree";

export class UpdatedTree {
    handle(context: WorkerChannelContext, event: Events.UpdatedTree): void {
        var tile = context.tileSet.getTile(event.tileIndex);
        var tree = tile.content as Tree;
        tree.age = event.age;
    }
}