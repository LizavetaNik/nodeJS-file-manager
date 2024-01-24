export class StateService {
  static #instance;
  #state = new Map();

  constructor() {
    if (!StateService.#instance) {
      StateService.#instance = this;
    }
    return StateService.#instance;
  }

  get(key) {
    return this.#state.get(key);
  }

  set(key, value) {
    return this.#state.set(key, value);
  }

  show() {
    console.log(this.#state);
  }
}
