/* eslint-disable no-undef */
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { getForgeToken } from "untils/request";
import { urnSelector } from "redux/UrnLink/urnSelcetor";
import { bootScreenSelector } from "redux/Refresh/refreshSelector";
import HandleSelectionExtension from "../../Extensions/myawesomeextension";
import TurnTableExtension from "../../Extensions/camerarotation";

let viewer;

const extensions = ["HandleSelectionExtension", "CameraRotation"];

//load file len viewer
function onDocumentLoadSuccess(doc) {
  let viewables = doc.getRoot().getDefaultGeometry();

  viewer.loadDocumentNode(doc, viewables).then((i) => {
    // document loaded, them action ?
  });
}

function onDocumentLoadFailure(viewerErrorCode, viewerErrorMsg) {
  console.error(
    "onDocumentLoadFailure() - errorCode:" +
      viewerErrorCode +
      "\n- errorMessage:" +
      viewerErrorMsg
  );
}

export function launchViewer(urn) {
  if (urn !== null) {
    const options = {
      env: "AutodeskProduction",
      getAccessToken: getForgeToken,
    };
    // co the them moi cac extension vao day
    Autodesk.Viewing.Initializer(options, () => {
      Autodesk.Viewing.theExtensionManager.registerExtension(
        "HandleSelectionExtension",
        HandleSelectionExtension
      );
      Autodesk.Viewing.theExtensionManager.registerExtension('CameraRotation', TurnTableExtension);
      viewer = new Autodesk.Viewing.GuiViewer3D(
        document.getElementById("forgeViewer"),
        {
          //
          extensions: extensions,
        }
      );

      viewer.start();
      let documentId = "urn:" + urn;
      Autodesk.Viewing.Document.load(
        documentId,
        onDocumentLoadSuccess,
        onDocumentLoadFailure
      );
    });
  }
}

function ViewContainer() {
  const bootScreen = useSelector(bootScreenSelector);

  const urn = useSelector(urnSelector);

  useEffect(() => {
    launchViewer(urn);
  }, [urn]);

  return (
    <>
      {bootScreen ? (
        <img
          src="https://aecom.solutions/wp-content/uploads/2020/12/blo.jpg"
          alt="Boot Screen to change the world!"
          style={{ width: "100%", height: "100%", opacity: "0.85" }}
        />
      ) : (
        <div id="forgeViewer"></div>
      )}
    </>
  );
}

export default ViewContainer;
