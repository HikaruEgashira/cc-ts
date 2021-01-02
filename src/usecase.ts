export abstract class UseCase<InputPort extends Object, OutputPort = void> {
  abstract handle(controller: InputPort): Promise<OutputPort>;
}

export default UseCase;
