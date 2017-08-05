import { Vector2 } from "../../../shared/Vector2";

import { IWorkerCommand, IWorkerCommandHandler } from '../../IWorkerCommand';
import * as Commands from '../Commands';
import { TileWorkerContext } from '../TileWorkerContext';

import { Tree } from '../Tree';
import { TileSet } from '../TileSet';
import { CreatedTree } from "../Events";

export class Initialize implements IWorkerCommandHandler<TileWorkerContext, Commands.Initialize> {

    handle(context: TileWorkerContext, command: Commands.Initialize): void {
        context.tileSet = new TileSet(10);
        this.createTrees(context);
    }

    createTrees(context: TileWorkerContext) {
        for (let x = -5; x <= 5; x++) {
            for (let z = -5; z <= 5; z++) {
                if (context.random.next() < 0.75) {
                    var tree = new Tree();
                    var seed = context.random.next();
                    var age = context.random.next();
                    tree.init(seed, age);
                    context.tileSet.setTile(x, z, tree);

                    var event = new CreatedTree();
                    event.tileIndex = new Vector2(x, z);
                    event.seed = seed;
                    event.age = age;
                    context.worker.sendMessage(event)
                }
            }
        }
    }

}