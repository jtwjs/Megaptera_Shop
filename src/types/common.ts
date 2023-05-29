export type ApiHandler<Q, S = void> = (req?: Q) => Promise<S>;

export type WithId<T> = { id: string } & T;
