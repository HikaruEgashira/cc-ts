# cc-ts

implements Clean Architecture in TypeScript.

## usecase

```typescript
import { UseCase } from '../src';

// make input controller
const counterGateway = {
  value: 8,
};
type CounterGateway = typeof counterGateway;

// make usecase
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
    // call usecase
    const res = await new addCount().handle({ counterGateway });
    expect(res).toBe(9);
  });
});
```
