import GObject from 'gi://GObject';
import Gio from 'gi://Gio';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as QuickSettings from 'resource:///org/gnome/shell/ui/quickSettings.js';

const WorkspaceDisplayToggle = GObject.registerClass(
    class WorkspaceDisplayToggle extends QuickSettings.QuickToggle {
        _init() {
            super._init({
                title: 'All Displays',
                subtitle: 'Workspaces',
                iconName: 'preferences-desktop-display-symbolic',
                toggleMode: true,
            });

            this._mutterSettings = new Gio.Settings({schema: 'org.gnome.mutter'});

            // checked = true  → workspaces on all displays   → workspaces-only-on-primary = false
            // checked = false → workspaces on primary only   → workspaces-only-on-primary = true
            this._sync();

            this._settingsChangedId = this._mutterSettings.connect(
                'changed::workspaces-only-on-primary',
                this._sync.bind(this)
            );

            this.connect('clicked', this._onClicked.bind(this));
        }

        _sync() {
            const primaryOnly = this._mutterSettings.get_boolean('workspaces-only-on-primary');
            // Prevent feedback loop: only update if the value actually changed
            const desired = !primaryOnly;
            this.title = primaryOnly ? 'Primary Only' : 'All Displays';
            if (this.checked !== desired)
                this.checked = desired;
        }

        _onClicked() {
            // this.checked already holds the new (post-click) state
            this._mutterSettings.set_boolean('workspaces-only-on-primary', !this.checked);
        }

        destroy() {
            if (this._settingsChangedId) {
                this._mutterSettings.disconnect(this._settingsChangedId);
                this._settingsChangedId = null;
            }
            super.destroy();
        }
    }
);

const WorkspaceDisplayIndicator = GObject.registerClass(
    class WorkspaceDisplayIndicator extends QuickSettings.SystemIndicator {
        _init() {
            super._init();
            this.quickSettingsItems.push(new WorkspaceDisplayToggle());
        }

        destroy() {
            this.quickSettingsItems.forEach(item => item.destroy());
            super.destroy();
        }
    }
);

export default class WorkspaceMultiMonitorExtension {
    enable() {
        this._indicator = new WorkspaceDisplayIndicator();
        Main.panel.statusArea.quickSettings.addExternalIndicator(this._indicator);
    }

    disable() {
        this._indicator?.destroy();
        this._indicator = null;
    }
}
