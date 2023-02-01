import React, { useEffect, useState } from "react";
import Viewer from "./Components/Viewer";
import { generateScene } from "./Components/Util";
import "./styles.css";
var filePath = "/mobileCompressed.glb";


const preview = {
  autoRotate: true,
  contactShadow: true,
  intensity: { value: 1, min: 0, max: 2, step: 0.1, label: "light intensity" },
  preset: {
    value: "rembrandt",
    options: ["rembrandt", "portrait", "upfront", "soft"],
  },
  environment: {
    value: "city",
    options: [
      "",
      "sunset",
      "dawn",
      "night",
      "warehouse",
      "forest",
      "apartment",
      "studio",
      "city",
      "park",
      "lobby",
    ],
  },
};

const config = {
  types: { value: false, hint: "Add Typescript definitions" },
  shadows: { value: true, hint: "Let meshes cast and receive shadows" },
  instanceall: {
    label: "instance all",
    value: false,
    hint: "Instance every geometry (for cheaper re-use)",
  },
  instance: { value: false, hint: " Instance re-occuring geometry" },
  verbose: { value: false, hint: "Verbose output w/ names and empty groups" },
  keepnames: { value: false, label: "keep names", hint: "Keep original names" },
  keepgroups: {
    value: false,
    label: "keep groups",
    hint: "Keep (empty) groups",
  },
  aggressive: {
    value: false,
    hint: "Aggressively prune the graph (empty groups, transform overlap)",
  },
  meta: { value: false, hint: "Include metadata (as userData)" },
  precision: {
    value: 2,
    min: 1,
    max: 8,
    step: 1,
    hint: "Number of fractional digits (default: 2)",
  },
};

export default function App() {
  const [scene, setScene] = useState(null);
  const [buffer, setBuffer] = useState(null);

  useEffect(() => {
    async function initialize() {
      let result = await generateScene(buffer);
      setScene(result);
    }
    initialize();
  }, [buffer]);

  useEffect(() => {
    async function initialize() {
     await fetch(filePath)
        .then((response) => {
          return response.blob();
        })
        .then((myBlob) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            setBuffer(reader.result);
          };
          reader.readAsArrayBuffer(myBlob);
        });
    }
    initialize();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {scene ? <Viewer scene={scene} {...preview} {...config}></Viewer> : ""}
    </div>
  );
}
