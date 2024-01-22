import { createInterface } from "readline";

export class ReplService {
  #rl;

  init({ process, welcomeMessage, exitMessage, handleInput }) {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on("close", () => {
      console.log(exitMessage);
      process.exit();
    });

    rl.on("line", async (line) => {
      await handleInput(line);
      rl.prompt();
    });

    console.log(welcomeMessage);

    rl.prompt();

    this.#rl = rl;
  }

  close() {
    this.#rl.close();
  }
}
