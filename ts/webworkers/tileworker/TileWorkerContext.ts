import { Random } from '../../shared/Random';
import { TileSet } from './TileSet';
import { TileWorker } from './TileWorker';

export class TileWorkerContext {
    public tileSet: TileSet;

    constructor(
        public worker: TileWorker,
        public random: Random
    ) {
    }
}