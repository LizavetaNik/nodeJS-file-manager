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
    console.log(`Default system End-Of-Line: ${JSON.stringify(EOL)}`);
  }

  cpus() {
    const cpuInfo = cpus();
    cpuInfo.forEach((cpu, index) => {
      console.log(`CPU ${index + 1}:`);
      console.log(`  Model: ${cpu.model}`);
      console.log(`  Speed: ${cpu.speed / 1000}`);
    });
  }

  homedir() {
    console.log(`Home directory: ${homedir()}`);
  }

  username() {
    console.log(`Current system user name: ${userInfo().username}`);
  }

  architecture() {
    console.log(
      `CPU architecture for which Node.js binary has compiled: ${arch()}`
    );
  }
}
