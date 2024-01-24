import { parseCommandList } from "../utils/parseCommandList.js";
import { resolve } from "path";

export class HashService {
  init(stateService) {
    this.stateService = stateService;
  }

  get cwd() {
    return this.stateService.get("cwd");
  }

  hash(args) {
    if (args.length !== 2) {
      console.error("Usage: hash <path_to_file>");
      return;
    }

    const [filePath] = parseCommandList(args);
    const fullPath = resolve(this.cwd, filePath);
    const hash = createHash("sha256");
    const stream = createReadStream(fullPath);

    stream.on("data", (data) => {
      hash.update(data);
    });

    stream.on("end", () => {
      const fileHash = hash.digest("hex");
      console.log(`Hash of file ${filePath}: ${fileHash}`);
    });

    stream.on("error", () => {
      console.error("Operation failed");
    });
  }
}
