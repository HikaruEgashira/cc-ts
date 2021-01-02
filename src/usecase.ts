export abstract class UseCase<InputPort = {}, OutputPort = void> {
  abstract handle(controller: InputPort): Promise<OutputPort>;
}

export default UseCase;
