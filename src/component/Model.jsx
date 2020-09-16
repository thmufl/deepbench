import React, { useState } from "react";
import Layers from "./Layers";
import * as tf from "@tensorflow/tfjs";
import PropTypes from "prop-types";
import { model } from "@tensorflow/tfjs";

const Model = (props) => {
  const [modelTopology, setModelTopology] = useState({
    class_name: "Sequential",
    config: {
      name: "my-model",
      layers: [],
    },
  });

  const [epochs, setEpochs] = useState(250);

  const trainData = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ];
  const trainLabels = [[0], [1], [1], [0]];

  const testData = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ];
  const testLabels = [[0], [1], [1], [0]];

  function getTrainData() {
    const xs = tf.tensor2d(trainData);
    const labels = tf.tensor2d(trainLabels);
    return { xs, labels };
  }

  function getTestData() {
    const xs = tf.tensor2d(testData);
    const labels = tf.tensor2d(testLabels);
    return { xs, labels };
  }

  function onEpochEnd(batch, logs) {
    if (batch % 50 === 0) console.log("onEpochEnd: ", batch, logs);
  }

  const handleOnChange = (name, value) => {
    setEpochs(value);
  };

  async function save() {
    const model = await tf.loadLayersModel(tf.io.fromMemory(modelTopology));
    const saveResults = await model.save("localstorage://my-model");
    console.log("saveResults", saveResults);
  }

  const handleAddLayer = (className, config) => {
    let t = { ...modelTopology };
    t.config.layers.push({
      class_name: className,
      config: config,
    });
    setModelTopology(t);
  };

  async function train() {
    const model = await tf.loadLayersModel(tf.io.fromMemory(modelTopology));
    console.log("train model", model);
    model.compile({
      optimizer: "sgd", // sgd, adam, adamax, adagrad, rmsprop
      loss: "meanSquaredError", // meanSquaredError, sigmoidCrossEntropy, categoricalCrossentropy
      metrics: "accuracy",
    });

    const trainData = getTrainData();
    const testData = getTestData();

    await model
      .fit(trainData.xs, trainData.labels, {
        epochs: epochs,
        batchSize: 1,
        shuffle: true,
        validationData: [testData.xs, testData.labels],
        callbacks: { onEpochEnd },
      })
      .then((info) => {
        console.log("Final accuracy: " + info.history.acc.slice(-1)[0]);
      });
  }

  return (
    <div className="container">
      <h1>Model</h1>
      <p>
        Class: {modelTopology.class_name}
        <br />
        Name: {modelTopology.config.name}
      </p>

      <Layers
        modelTopology={modelTopology}
        onAddLayer={handleAddLayer}
      ></Layers>
      <h3>Model Topology</h3>
      <p>
        ModelTopology: {modelTopology ? JSON.stringify(modelTopology) : "none"}
      </p>

      <form>
        <div className="form-group row">
          <label htmlFor="inputEpochs">Epocs</label>
          <input
            type="number"
            className="form-control"
            id="inputEpochs"
            value={epochs}
            onChange={(e) => handleOnChange("epochs", +e.currentTarget.value)}
            aria-describedby="epochsHelp"
          ></input>
          <small id="epochsHelp" className="form-text text-muted">
            The number of epochs to train.
          </small>
        </div>
      </form>

      <div className="btn-group" role="group" aria-label="Actions">
        <button className="btn btn-primary" onClick={save}>
          Save
        </button>
        <button
          className="btn btn-primary"
          onClick={train}
          disabled={modelTopology.config.layers.length < 1}
        >
          Train
        </button>
      </div>
    </div>
  );
};

Model.propTypes = {};

export default Model;
