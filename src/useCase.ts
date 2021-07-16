import { flow, pipe } from 'fp-ts/function';
import { task } from 'fp-ts';

/**
 * @description portsを引数に取り非同期関数を返す
 * @example
 * const getCountUsecase: UseCase<Ports, number> = ({ db }) => async () => {
 *  return db.counter.get();
 * };
 * const count = await getCountUsecase(ports)();
 */
export interface UseCase<Ports, A> {
  (ports: Ports): task.Task<A>;
}

/**
 * Functor for UseCase
 */
export const map: <Ports, A, B>(
  f: (a: A) => B
) => (fa: UseCase<Ports, A>) => UseCase<Ports, B> = f => fa =>
  flow(fa, task.map(f));

/**
 * Monad for UseCase
 */
export const chain = <Ports, A, B>(f: (a: A) => UseCase<Ports, B>) => (
  ma: UseCase<Ports, A>
): UseCase<Ports, B> => (ports: Ports): task.Task<B> =>
  pipe(
    ma(ports),
    task.chain((a: A): task.Task<B> => f(a)(ports))
  );
