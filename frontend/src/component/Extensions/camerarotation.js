/* eslint-disable no-undef */
export default class TurnTableExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
        this._group = null;
        this._button = null;
    }

    load() {
        console.log('CameraRotation has been loaded');
        return true;
    }

    unload() {
        // Clean our UI elements if we added any
        if (this._group) {
            this._group.removeControl(this._button);
            if (this._group.getNumberOfControls() === 0) {
                this.viewer.toolbar.removeControl(this._group);
            }
        }
        console.log('CameraRotation has been unloaded');
        return true;
    }

    onToolbarCreated() {
        // Create a new toolbar group if it doesn't exist
        this._group = this.viewer.toolbar.getControl('allCameraRotationToolbar');
        if (!this._group) {
            this._group = new Autodesk.Viewing.UI.ControlGroup('allCameraRotationToolbar');
            this.viewer.toolbar.addControl(this._group);
        }

        // Add a new button to the toolbar group
        this._button = new Autodesk.Viewing.UI.Button('CameraRotationButton');
        this._button.onClick = (ev) => {
            // Execute an action here
        };
        this._button.setToolTip('CameraRotationExtension');
        this._button.addClass('CameraRotationIcon');
        this._group.addControl(this._button);
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension('CameraRotation', TurnTableExtension);

