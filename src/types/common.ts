export type ApiHandler<Q, S = void> = (req?: Q) => Promise<S>;

export type WithId<T> = { id: string } & T;

export interface TriggerArgs {
  isOpen: boolean;
  handleToggle: (event: React.MouseEvent) => void;
}

export type Trigger = (args: TriggerArgs) => React.ReactElement;
