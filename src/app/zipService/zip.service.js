import { parseCommandList } from "../utils/parseCommandList.js";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { resolve } from "path";

export class ZipService {
  init(stateService) {
    this.stateService = stateService;
  }

  get cwd() {
    return this.stateService.get("cwd");
  }

  compress(args) {
    try {
      const [filePath, pathToDest] = parseCommandList(args);
      const fullPath = resolve(this.cwd, filePath);
      const destinationFullPath = resolve(this.cwd, pathToDest);

      const readStream = createReadStream(fullPath);
      const writeStream = createWriteStream(destinationFullPath, {
        flags: "wx",
      });
      const compressStream = createBrotliCompress();

      compressStream.on("error", () => console.error("Operation failed"));
      readStream.on("error", () => console.error("Operation failed"));
      writeStream.on("error", () => console.error("Operation failed"));

      readStream.pipe(compressStream).pipe(writeStream);

      writeStream.on("finish", () => {
        console.log(`File compressed successfully to: ${destinationFullPath}`);
      });
    } catch {
      console.error("Operation failed");
    }
  }

  decompress(args) {
    try {
      const [filePath, pathToDest] = parseCommandList(args);
      const fullPath = resolve(this.cwd, filePath);
      const destinationFullPath = resolve(this.cwd, pathToDest);

      const readStream = createReadStream(fullPath);
      const writeStream = createWriteStream(destinationFullPath, {
        flags: "wx",
      });
      const compressStream = createBrotliDecompress();

      compressStream.on("error", () => console.error("Operation failed"));
      readStream.on("error", () => console.error("Operation failed"));
      writeStream.on("error", () => console.error("Operation failed"));

      readStream.pipe(compressStream).pipe(writeStream);

      writeStream.on("finish", () => {
        console.log(
          `File decompressed successfully to: ${destinationFullPath}`
        );
      });
    } catch {
      console.error("Operation failed");
    }
  }
}
