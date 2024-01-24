import { AppController } from "./app/app.controller.js";
import { FilesService } from "./app/filesService/files.service.js";
import { HashService } from "./app/hashService/hash.service.js";
import { NavigationService } from "./app/navigationService/navigation.service.js";
import { OSService } from "./app/osService/os.service.js";
import { ReplService } from "./app/replService/repl.service.js";
import { StateService } from "./app/stateService/state.service.js";
import { ZipService } from "./app/zipService/zip.service.js";

import { App } from "./app/app.module.js";

const app = new App(process, AppController, {
  FilesService,
  HashService,
  NavigationService,
  OSService,
  ReplService,
  StateService,
  ZipService,
});
