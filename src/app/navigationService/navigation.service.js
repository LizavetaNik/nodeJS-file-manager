import { stat, readdir } from "fs/promises";
import { isAbsolute, resolve } from "path";
import { parseCommandList } from "../utils/parseCommandList.js";

export class NavigationService {
  init(stateService) {
    this.stateService = stateService;
  }

  set cwd(path) {
    this.stateService.set("cwd", path);
  }

  get cwd() {
    return this.stateService.get("cwd");
  }

  upDirectory() {
    return this.changeDirectory("..");
  }

  async changeDirectory(args) {
    const [directoryPath] = parseCommandList(args);
    const isWindows = this.stateService.get("platform") === "win32";
    const isWindowsRootPath =
      directoryPath.includes(":") && !isAbsolute(directoryPath);

    const targetDirectory = resolve(
      isWindows && isWindowsRootPath ? "/" : this.cwd,
      directoryPath
    );

    try {
      const directoryStats = await stat(targetDirectory);

      if (directoryStats.isDirectory()) {
        this.cwd = targetDirectory;
      } else {
        throw new Error("Operation failed");
      }
    } catch (error) {
      throw new Error("Operation failed");
    }
  }

  async list() {
    const dirents = await readdir(this.cwd, { withFileTypes: true });

    const list = dirents
      .map((dirent) => ({
        Name: dirent.name,
        Type: dirent.isFile()
          ? "file"
          : dirent.isDirectory()
          ? "directory"
          : dirent.isSymbolicLink()
          ? "symbolic-link"
          : "unknown",
      }))
      .sort(
        (a, b) => a.Type.localeCompare(b.Type) || a.Name.localeCompare(b.Name)
      );

    console.table(list);
  }
}
