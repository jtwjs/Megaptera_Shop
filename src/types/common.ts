export type ApiHandler<Q, S = void> = (req?: Q) => Promise<S>;
