import { Random } from 'shared/Random';
import { TileSet } from 'webworkers/tileworker/TileSet';
import { TileWorker } from 'webworkers/tileworker/TileWorker';

export class TileWorkerContext {
    public tileSet: TileSet;

    constructor(
        public worker: TileWorker,
        public random: Random
    ) {
    }
}