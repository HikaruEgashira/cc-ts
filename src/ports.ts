import { either } from 'fp-ts';
import { UseCase } from '.';

let p = {};

export class Ports<A> {
  ports: A;
  constructor(ports: A) {
    this.ports = ports;
    p = ports;
  }

  getPorts() {
    return this.ports === {}
      ? p === {}
        ? either.left('NOT REGISTERED')
        : either.right(p)
      : either.right(this.ports);
  }

  async run<A>(u: UseCase<unknown, A>): Promise<A> {
    const ports = this.getPorts();
    return await u(ports)();
  }
}
