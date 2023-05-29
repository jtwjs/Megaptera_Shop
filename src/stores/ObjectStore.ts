type Listener = () => void;

export default abstract class ObjectStore {
  private listeners = new Set<Listener>();

  protected publish() {
    this.listeners.forEach((listener) => listener());
  }

  addListener(listener: Listener) {
    this.listeners.add(listener);
  }

  removeListener(listener: Listener) {
    this.listeners.delete(listener);
  }
}
