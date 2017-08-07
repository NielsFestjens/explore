import * as MyWorker from "worker-loader?name=js/tileworker.js!../webworkers/tileworker/TileWorker";
import { IWorkerCommand } from 'webworkers/IWorkerCommand';
import * as Events from "webworkers/tileworker/Events";
import * as EventHandlers from "app/EventHandlers";
import { WorkerChannelContext } from "app/WorkerChannelContext";
import { MainScene } from "app/MainScene";

export class WorkerChannel {

    private context: WorkerChannelContext;
    private handlers: { [id: string] : any; } = {};
    private worker: any;

    public constructor(
        mainScene: MainScene
    ) {
        this.context = new WorkerChannelContext(this, mainScene);

        this.handlers[new Events.CreatedTree().name] = EventHandlers.CreatedTree;

        this.worker = new MyWorker();
        this.worker.addEventListener('message', this.handleMessage);
    }

    private handleMessage = (message: MessageEvent) => {
        var handler = this.handlers[message.data.name];
        var handlerInstance = new handler();
        handlerInstance.handle(this.context, message.data);
    }

    public send(message: IWorkerCommand) {
        this.worker.postMessage(message);
    }
}