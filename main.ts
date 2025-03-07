import { App, Plugin, PluginSettingTab } from "obsidian";
import { shakeScreen } from "./src/screen-shaker";
import { defaultSetting } from "src/setting";
import { combo } from "src/combo";
import { explosion } from "src/explosion";
import list from "src/presets/explosion";
import renderSetting from "src/components/setting";

defaultSetting.explosion = { ...defaultSetting.explosion, ...list[0].config };
defaultSetting.explosionPreset = 0;

export default class PowerModePlugin extends Plugin {
  settings: ISetting;
  async onload() {
    await this.loadSettings();
    this.registerEvent(
      this.app.workspace.on("editor-change", (editor) => {
        // @ts-ignore
        const el: HTMLElement = editor.containerEl;
        shakeScreen(el, this.settings);
        combo(el, this.settings);
        explosion(editor, this.settings);
      })
    );

    this.addSettingTab(new PowerModeSetting(this.app, this));
  }

  onunload() {}

  async loadSettings() {
    this.settings = { ...defaultSetting, ...(await this.loadData()) };
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class PowerModeSetting extends PluginSettingTab {
  plugin: PowerModePlugin;
  render: (settings: ISetting) => void;

  constructor(app: App, plugin: PowerModePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  update(data: ISetting) {
    this.plugin.settings = data;
    this.plugin.saveSettings();
  }
  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    renderSetting(
      containerEl,
      this.plugin.settings,
      this.app,
      this.update.bind(this)
    );
  }
}
