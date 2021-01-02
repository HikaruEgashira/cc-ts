import { UseCase } from '../src';

// mock
class Counter {
  count = 8;
  getValue() {
    return this.count;
  }
  setValue(value: number) {
    this.count = value;
  }
}

// mock usecase
type I = { counter: Counter };
class AddCount implements UseCase<I> {
  async handle({ counter }: I) {
    const currentNumber = counter.getValue();
    counter.setValue(currentNumber + 1);
  }
}

let counter!: Counter;

describe(UseCase.name, () => {
  beforeEach(() => {
    counter = new Counter();
  });

  it('should return 9, when called addCount', async () => {
    const addCountUsecase = new AddCount();
    await addCountUsecase.handle({ counter });
    expect(counter.getValue()).toBe(9);
  });
});
