import { parseCommandList } from "../utils/parseCommandList.js";
import { resolve } from "path";
import { createHash } from "crypto";
import { createReadStream } from "fs";

export class HashService {
  init(stateService) {
    this.stateService = stateService;
  }

  get cwd() {
    return this.stateService.get("cwd");
  }

  hash(args) {
    return new Promise((res) => {
      const [filePath] = parseCommandList(args);
      const fullPath = resolve(this.cwd, filePath);
      const hash = createHash("sha256");
      const stream = createReadStream(fullPath);

      stream.on("data", (data) => {
        hash.update(data);
      });

      stream.on("end", () => {
        const fileHash = hash.digest("hex");
        console.log(`${fileHash}`);
        res();
      });

      stream.on("error", () => {
        console.error("Operation failed");
        res();
      });
    });
  }
}
