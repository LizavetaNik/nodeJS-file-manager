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
    return new Promise(async (res) => {
      try {
        const [filePath, pathToDest] = parseCommandList(args);
        const fullPath = resolve(this.cwd, filePath);
        const destinationFullPath = resolve(this.cwd, pathToDest);

        const readStream = createReadStream(fullPath);
        const writeStream = createWriteStream(destinationFullPath, {
          flags: "wx",
        });
        const compressStream = createBrotliCompress();

        compressStream.on("error", () => {
          console.error("Operation failed");
          res();
        });
        readStream.on("error", () => {
          console.error("Operation failed");
          res();
        });
        writeStream.on("error", () => {
          console.error("Operation failed");
          res();
        });

        readStream.pipe(compressStream).pipe(writeStream);

        writeStream.on("finish", () => {
          res();
        });
      } catch {
        console.error("Operation failed");
        res();
      }
    });
  }

  decompress(args) {
    return new Promise(async (res) => {
      try {
        const [filePath, pathToDest] = parseCommandList(args);
        const fullPath = resolve(this.cwd, filePath);
        const destinationFullPath = resolve(this.cwd, pathToDest);

        const readStream = createReadStream(fullPath);
        const writeStream = createWriteStream(destinationFullPath, {
          flags: "wx",
        });
        const compressStream = createBrotliDecompress();

        compressStream.on("error", () => {
          console.error("Operation failed");
          res();
        });
        readStream.on("error", () => {
          console.error("Operation failed");
          res();
        });
        writeStream.on("error", () => {
          console.error("Operation failed");
          res();
        });

        readStream.pipe(compressStream).pipe(writeStream);

        writeStream.on("finish", () => {
          res();
        });
      } catch {
        console.error("Operation failed");
        res();
      }
    });
  }
}
