import React, { useState } from "react";

import * as tf from "@tensorflow/tfjs";

const LayerForm = (props) => {
  const modelTopology = props.location.state.modelTopology;
  const layerIndex = props.match.params.index;

  const [layer, setLayer] = useState(modelTopology.config.layers[layerIndex]);

  async function handleSave() {
    modelTopology.config.layers[layerIndex] = layer;
    const model = await tf.loadLayersModel(tf.io.fromMemory(modelTopology));
    const result = await model.save("localstorage://my-model");
    console.log("saved:", result.modelArtifactsInfo);
    props.history.replace("/model");
  }

  async function handleDelete() {
    delete modelTopology.config.layers[layerIndex];
    const model = await tf.loadLayersModel(tf.io.fromMemory(modelTopology));
    const result = await model.save("localstorage://my-model");
    console.log("deleted:", result.modelArtifactsInfo);
    props.history.replace("/model");
  }

  const handleOnChange = (name, value) => {
    const l = { ...layer };
    l.config[name] = value;
    setLayer(l);
  };

  return (
    <div className="container">
      <h1>Layer: {layerIndex}</h1>
      <form>
        <div className="form-group row">
          <label htmlFor="inputClassName">Class Name</label>
          <input
            disabled
            type="text"
            className="form-control"
            id="inputClassName"
            value={layer.class_name}
            aria-describedby="classNameHelp"
          ></input>
          <small id="classNameHelp" className="form-text text-muted">
            The class of the layer.
          </small>
        </div>

        <div className="form-group row">
          <label htmlFor="inputName">Name</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            value={layer.config.name}
            onChange={(e) => handleOnChange("name", e.currentTarget.value)}
            aria-describedby="nameHelp"
          ></input>
          <small id="nameHelp" className="form-text text-muted">
            The name of the layer.
          </small>
        </div>

        {/*
      <div className="form-group row">
        <label htmlFor="inputBatchInputShape">Batch Input Shape</label>
        <input
          type="text"
          className="form-control"
          id="inputBatchInputShape"
          value={config.batch_input_shape}
          onChange={(e) =>
            handleOnChange("batch_input_shape", e.currentTarget.value)
          }
          aria-describedby="batchInputShapeHelp"
        ></input>
        <small id="batchInputShapeHelp" className="form-text text-muted">
          The input shape of the layer.
        </small>
      </div>
        */}

        <div className="form-group row">
          <label htmlFor="inputUnits">Units</label>
          <input
            type="number"
            className="form-control"
            id="inputUnits"
            value={layer.config.units}
            onChange={(e) => handleOnChange("units", +e.currentTarget.value)}
            aria-describedby="unitsHelp"
          ></input>
          <small id="unitsHelp" className="form-text text-muted">
            The number of nodes (neurons) in the layer.
          </small>
        </div>

        <div className="form-group row">
          <label htmlFor="InputActivation">Activation</label>
          <input
            type="text"
            className="form-control"
            id="inputActivation"
            value={layer.config.activation}
            onChange={(e) =>
              handleOnChange("activation", e.currentTarget.value)
            }
            aria-describedby="activationHelp"
          ></input>
          <small id="activationHelp" className="form-text text-muted">
            The activation function (tanh, sigmoid, relu etc.) of the nodes.
          </small>
        </div>
      </form>
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
      &nbsp;
      <button className="btn btn-primary" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default LayerForm;
