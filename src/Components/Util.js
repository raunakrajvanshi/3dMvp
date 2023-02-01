import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { REVISION } from "three";
import { WebGLRenderer } from "three";

let gltfLoader;

if (typeof window !== "undefined") {
  const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`;
  const dracoloader = new DRACOLoader().setDecoderPath(
    `${THREE_PATH}/examples/js/libs/draco/gltf/`
  );
  const ktx2Loader = new KTX2Loader().setTranscoderPath(
    `${THREE_PATH}/examples/js/libs/basis/`
  );

  gltfLoader = new GLTFLoader()
    .setCrossOrigin("anonymous")
    .setDRACOLoader(dracoloader)
    .setKTX2Loader(ktx2Loader.detectSupport(new WebGLRenderer()))
    .setMeshoptDecoder(MeshoptDecoder);
}

export const generateScene = async (buffer) => {
  const result = await new Promise((resolve, reject) =>
    gltfLoader.parse(buffer, "", resolve, reject)
  );

  return result.scene;
};
