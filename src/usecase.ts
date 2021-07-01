import { flow } from 'fp-ts/lib/function';
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

export const map: <Ports, A, B>(
  f: (a: A) => B
) => (fa: UseCase<Ports, A>) => UseCase<Ports, B> = f => fa =>
  flow(fa, T.map(f));

export declare const chain: <Ports, A, B>(
  f: (a: A) => UseCase<Ports, B>
) => (ma: UseCase<Ports, A>) => UseCase<Ports, B>;

export const usecaseInstance = {
  map,
  chain,
};
