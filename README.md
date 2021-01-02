# cc-ts

implements Clean Architecture in TypeScript.

## usecase

```typescript
import { UseCase } from '@ehika/cc-ts';

// adapter
class Counter {
  count = 8;
  getValue() {
    return this.count;
  }
  setValue(value: number) {
    this.count = value;
  }
}

// usecase
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
```
