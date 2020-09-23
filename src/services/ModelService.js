import * as tf from "@tensorflow/tfjs";

class ModelService {
  getModelArtifact = (url) => {
    const u = new URL(url);
    switch (u.protocol) {
      case "localstorage:": {
        const modelArtifact = localStorage.getItem(
          `tensorflowjs_models/${u.hostname}${u.pathname}`
        );
        return JSON.parse(modelArtifact);
      }
      default:
        return new Error(`${u.protocol} not yet implemented`);
    }
  };

  setModelArtifact = (url, modelArtifact) => {
    const u = new URL(url);
    switch (u.protocol) {
      case "localstorage:": {
        const result = localStorage.setItem(
          `tensorflowjs_models/${u.hostname}${u.pathname}`,
          JSON.stringify(modelArtifact)
        );
        return result;
      }
      default:
        return new Error(`${u.protocol} not yet implemented`);
    }
  };

  getModelArtifactInfos = (url) => {
    const u = new URL(url);
    switch (u.protocol) {
      case "localstorage:": {
        let infos = localStorage.keys().map((key) => {
          return key.startsWith("tensorflowjs_models/") && key.endsWith("/info")
            ? {
                key: key,
                value: JSON.parse(localStorage.getItem(key)),
              }
            : null;
        });
        return infos;
      }
      default:
        return new Error(`${u.protocol} not yet implemented`);
    }
  };

  list = async () => {
    //tf.io.removeModel("localstorage://tensorflowjs_models/new-model");
    let result = await tf.io.listModels();
    let infos = [];
    for (let key in result) {
      infos.push({
        name: new URL(key).hostname,
        value: JSON.parse(JSON.stringify(result[key])),
      });
    }
    console.log("list", infos);
    return infos;
  };

  save = async (modelTopology, url) => {
    const u = new URL(url);
    if (u.protocol === "localstorage:") {
      const model = await tf.loadLayersModel(tf.io.fromMemory(modelTopology));
      const result = model.save(url);
      return result;
    }
    return null;
  };

  remove = async (url) => {
    const result = tf.io.removeModel(url);
    return result;
  };
}

export default new ModelService();
