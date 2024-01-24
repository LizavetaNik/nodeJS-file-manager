export class CommandService {
  #exit = null;

  init(exit) {
    this.#exit = exit;
  }

  handle(input) {
    if (!input) {
      return;
    }
    const [command, ...args] = input.split(" ");
    const handler = this.#commands.get(command);
    if (handler) {
      handler(...args);
    } else {
      throw new Error("Invalid input");
    }
  }

  #commands = new Map([
    ["echo", (...args) => console.log(args.join(" "))],
    [".exit", () => this.#exit()],
  ]);
}
