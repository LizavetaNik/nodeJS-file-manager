import { EOL } from "os";

export class AppController {
  constructor(process, stateService, services) {
    const {
      replService,
      filesService,
      hashService,
      navigationService,
      osService,
      zipService,
    } = services;

    [navigationService, filesService, hashService, zipService].forEach(
      (service) => service.init(stateService)
    );

    const echo = (args) => console.log(args);

    const commands = new Map([
      [".exit", () => replService.close()],
      ["echo", echo],
      ["cwd", () => echo(navigationService.сwd)],
    ]);

    const username = stateService.get("username");

    const getCurrentCwd = () =>
      this.createMessage(`${EOL}You are currently in ${navigationService.сwd}`);

    const handleInput = (input) => {
      const trimmedInput = input.trim();
      if (!trimmedInput) {
        return;
      }
      const [command, ...args] = trimmedInput.split(" ");
      const handler = commands.get(command);
      try {
        if (handler) {
          handler(args.join(" ").trim());
        } else {
          throw new Error("Invalid input");
        }
      } catch (error) {
        console.error(error.message);
      }
      console.log(getCurrentCwd());
    };

    let welcomeMessage = this.createMessage(
      `Welcome to the File Manager, ${username}!`,
      username
    );
    welcomeMessage += `${EOL}${getCurrentCwd()}`;

    const exitMessage = this.createMessage(
      `${EOL}Thank you for using File Manager, ${username}, goodbye!`,
      username
    );

    replService.init({ process, handleInput, welcomeMessage, exitMessage });
  }

  createMessage(message, username) {
    return message.split(username).join(username);
  }
}
