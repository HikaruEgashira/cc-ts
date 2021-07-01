import { UseCase } from '../src';
import { pipe } from 'fp-ts/function';

// mock
const db = {
  counter: {
    get: () => 8,
  },
};
const ports = {
  db,
};
type Ports = typeof ports;

// usecase
const getCountUsecase: UseCase<Ports, number> = ({ db }) => async () => {
  return db.counter.get();
};

describe('UseCase', () => {
  it('should return 8, when called getCountUsecase', async () => {
    const count = await getCountUsecase(ports)();
    expect(count).toBe(8);
  });

  it('map', async () => {
    const incrementCountUsecase = pipe(
      getCountUsecase,
      UseCase.map(v => v + 1)
    );

    const count = await incrementCountUsecase(ports)();
    expect(count).toBe(9);
  });
});
