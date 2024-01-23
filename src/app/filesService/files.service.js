import { parseCommandList } from "../utils/parseCommandList.js";
import {
  promises as fsPromises,
  createReadStream,
  createWriteStream,
} from "fs";
import { rm } from "fs/promises";
import { resolve, basename, join } from "path";

export class FilesService {
  init(stateService) {
    this.stateService = stateService;
  }

  get cwd() {
    return this.stateService.get("cwd");
  }

  async concatenate(args) {
    try {
      const [filePath] = parseCommandList(args);
      const fullPath = resolve(this.cwd, filePath);

      const fileContent = await fsPromises.readFile(fullPath, "utf8");
      console.log(fileContent);
    } catch {
      throw new Error(`Operation failed`);
    }
  }

  async addFile(args) {
    try {
      const [newFileName] = parseCommandList(args);
      const filePath = join(this.cwd, newFileName);

      await fsPromises.writeFile(filePath, "");
    } catch {
      throw new Error(`Operation failed`);
    }
  }

  async renameFile(args) {
    try {
      const [currentFilePath, newFileName] = parseCommandList(args);
      const currentFullPath = resolve(this.cwd, currentFilePath);
      const newFullPath = resolve(this.cwd, newFileName);

      await fsPromises.rename(currentFullPath, newFullPath);
    } catch (error) {
      throw new Error(`Operation failed`);
    }
  }

  async copyFile(args) {
    try {
      const [sourceFilePath, targetDirectoryPath] = parseCommandList(args);
      const sourceFullPath = resolve(this.cwd, sourceFilePath);
      const targetFullPath = resolve(
        this.cwd,
        targetDirectoryPath,
        basename(sourceFilePath)
      );

      await new Promise((resolve, reject) => {
        const readStream = createReadStream(sourceFullPath);
        const writeStream = createWriteStream(targetFullPath);

        readStream.on("error", (error) => reject(error));
        writeStream.on("error", (error) => reject(error));
        writeStream.on("close", () => resolve());

        readStream.pipe(writeStream);
      });
    } catch {
      throw new Error("Operation failed");
    }
  }

  async moveFile(args) {
    try {
      await this.copyFile(args);
      await this.removeFile(args);
    } catch {
      throw new Error("Operation failed");
    }
  }

  async removeFile(args) {
    const [filePath] = parseCommandList(args);
    const fullPath = resolve(this.cwd, filePath);

    try {
      return rm(fullPath);
    } catch {
      throw new Error("Operation failed");
    }
  }
}
