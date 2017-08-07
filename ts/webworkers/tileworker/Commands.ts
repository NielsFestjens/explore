import { IWorkerCommand } from 'webworkers/IWorkerCommand';

export class Initialize implements IWorkerCommand {
    public name = "Initialize";
}