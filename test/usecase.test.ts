import { useCase } from '../src';
import { pipe } from 'fp-ts/function';

// mock
const db = {
  counter: {
    get: () => 8,
  },
};
const date = {
  now: {
    get: () => new Date('2021/02/02'),
  },
};
const ports = {
  db,
  date,
};
type Ports = typeof ports;

// usecase
const getCountUsecase: useCase.UseCase<Ports, number> = ({
  db,
}) => async () => {
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
      useCase.map(v => v + 1)
    );

    const count = await incrementCountUsecase(ports)();
    expect(count).toBe(9);
  });

  it('chain', async () => {
    const displayUseCase = pipe(
      getCountUsecase,
      useCase.chain((count: number) => ({ date }: Ports) => async () => {
        const now = date.now.get().toISOString();
        return `Today is ${count}: ${now}`;
      })
    );
    const res = await displayUseCase(ports)();

    expect(res).toBe('Today is 8: 2021-02-01T15:00:00.000Z');
  });
});
