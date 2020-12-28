import { UseCase } from '../src';

// mock
const counterGateway = {
  value: 8,
};
type CounterGateway = typeof counterGateway;

// mock usecase
type I = { counterGateway: CounterGateway };
type O = number;
class addCount implements UseCase<I, O> {
  async handle({ counterGateway }: I) {
    const currentNumber = counterGateway.value;
    return currentNumber + 1;
  }
}

describe(UseCase.name, () => {
  it('should return 9, when called addCount', async () => {
    const res = await new addCount().handle({ counterGateway });
    expect(res).toBe(9);
  });
});
