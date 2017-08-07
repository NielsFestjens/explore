import * as Commands from "webworkers/tileworker/Commands";
import * as CommandHandlers from "webworkers/tileworker/CommandHandlers";
import { TileWorkerContext } from 'webworkers/tileworker/TileWorkerContext';
import { Random } from 'shared/Random';

export class TileWorker {
    
    private handlers: { [id: string] : any; } = {};
    private context: TileWorkerContext;
        
    constructor() {
        this.handlers[new Commands.Initialize().name] = CommandHandlers.Initialize;

        addEventListener('message', this.handleMessage);

        this.initializeContext();
    }

    private initializeContext() {
        var random = new Random(500);
        this.context = new TileWorkerContext(this, random);
    }

    private handleMessage = (message: MessageEvent) => {
        var handler = this.handlers[message.data.name];
        var handlerInstance = new handler();
        handlerInstance.handle(this.context, message.data);
    }

    public sendMessage(message: any) {
        postMessage(message, undefined);
    }
}

var worker = new TileWorker();