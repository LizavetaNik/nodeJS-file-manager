export class NavigationService {
  init(stateService) {
    this.stateService = stateService;
  }

  set сwd(path) {
    this.stateService.set("cwd", path);
  }

  get сwd() {
    return this.stateService.get("cwd");
  }
}
