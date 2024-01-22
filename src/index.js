import { AppController } from "./app/app.controller.js";
import { App } from "./app/app.module.js";

const app = new App(process, AppController, {});
