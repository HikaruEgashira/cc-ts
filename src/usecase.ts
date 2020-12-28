export abstract class UseCase<InputPort extends Object, OutputPort> {
  abstract handle(controller: InputPort): Promise<OutputPort>;
}

export default UseCase;
