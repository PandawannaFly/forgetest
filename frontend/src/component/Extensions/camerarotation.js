/* eslint-disable no-undef */
export default class TurnTableExtension extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
      super(viewer, options);
      this.viewer = viewer;
      this._group = null;
      this._button = null;
      this.onToolbarCreated = this.onToolbarCreated.bind(this);
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
      let viewer = this.viewer;
      // Add a new button to the toolbar group
      //
      this._button = new Autodesk.Viewing.UI.Button('CameraRotationButton');
      this._button.addClass('CameraRotationIcon');
      this._button.setToolTip('CameraRotationExtension');


      // Create a new toolbar group if it doesn't exist
    //   this._group = this.viewer.toolbar.getControl('allCameraRotationToolbar');
      this._group = new Autodesk.Viewing.UI.ControlGroup('allCameraRotationToolbar');
      this._group.addControl(this._button);
      this.viewer.toolbar.addControl(this._group);
      
      
      


      // 
      let started = false;
      let rotateCamera  = ()=>{
        if(started){
            requestAnimationFrame(rotateCamera);
        }
        const nav = viewer.navigation;
        const up = nav.getCameraUpVector();
        const axis = new THREE.Vector3(0,0,1);
        const speed = 10.0 * Math.PI/180;
        const matrix = new THREE.Matrix4().makeRotationAxis(axis, speed*0.1);

        let pos = nav.getPosition();
        pos.applyMatrix4(matrix);
        up.applyMatrix4(matrix);
        nav.setView(pos, new THREE.Vector3(0,0,0));
        nav.setCameraUpVector(up);
        // var viewState = viewer.getState();
        // viewer.restoreState(viewState);
      }


      this._button.onClick = (ev) => {
          // Execute an action here
            started = !started;
            if (started) rotateCamera()
      };
  }
}




  