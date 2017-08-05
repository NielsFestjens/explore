export interface IWorkerCommand {
    name: string;
}

export interface IWorkerCommandHandler<TContext, TCommand extends IWorkerCommand> {
    handle(context: TContext, command: TCommand): void;
}