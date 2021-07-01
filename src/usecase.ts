import { flow } from 'fp-ts/function';
import * as T from 'fp-ts/Task';

/**
 * @description portsを引数に取り非同期関数を返す
 * @example
 * const getCountUsecase: UseCase<Ports, number> = ({ db }) => async () => {
 *  return db.counter.get();
 * };
 * const count = await getCountUsecase(ports)();
 */
export interface UseCase<Ports, A> {
  (ports: Ports): T.Task<A>;
}

const map: <Ports, A, B>(
  f: (a: A) => B
) => (fa: UseCase<Ports, A>) => UseCase<Ports, B> = f => fa =>
  flow(fa, T.map(f));

declare const chain: <Ports, A, B>(
  f: (a: A) => UseCase<Ports, B>
) => (ma: UseCase<Ports, A>) => UseCase<Ports, B>;

export const UseCase = {
  map,
  // chain,
};
