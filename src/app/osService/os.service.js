import { EOL, arch, cpus, homedir, userInfo } from "os";
import { parseArgs } from "../utils/parseArgs.js";

export class OSService {
  commands = new Map([
    ["--EOL", () => this.eol()],
    ["--cpus", () => this.cpus()],
    ["--homedir", () => this.homedir()],
    ["--username", () => this.username()],
    ["--architecture", () => this.architecture()],
  ]);

  os(args) {
    parseArgs(args).forEach((arg) => {
      const typeArg = this.commands.get(arg);
      if (typeArg) {
        typeArg();
      }
    });
  }

  eol() {
    console.log(`Default system EOL: ${JSON.stringify(EOL)}`);
  }

  cpus() {
    const cpuInfo = cpus();
    const table = cpuInfo.map((cpu, index) => ({
      CPU: `CPU ${index + 1}`,
      Model: cpu.model,
      Speed: `${cpu.speed / 1000} GHz`,
    }));

    console.table(table);
  }

  homedir() {
    console.log(`Home directory: ${homedir()}`);
  }

  username() {
    console.log(`System user name: ${userInfo().username}`);
  }

  architecture() {
    console.log(`CPU architecture: ${arch()}`);
  }
}
