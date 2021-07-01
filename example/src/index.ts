import { UseCase } from '@hikae/cc-ts';
import { pipe } from 'fp-ts/lib/function';
import { ports, Ports } from './ports';

const getCountUsecase: UseCase<Ports, number> = ({ db }) => async () => {
  return db.counter.get();
};

const incrementCountUsecase: UseCase<Ports, number> = pipe(
  getCountUsecase,
  UseCase.map(v => v + 1)
);

async function main() {
  const count = await incrementCountUsecase(ports)();
  console.log(count); // 9
}

main();
