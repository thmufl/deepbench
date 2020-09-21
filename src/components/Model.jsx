import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
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

  const [info, setInfo] = useState({});

  const [epochs, setEpochs] = useState(250);

  useEffect(() => {
    const path = "tensorflowjs_models/my-model/";

    if (localStorage.getItem(path + "model_topology")) {
      setInfo(JSON.parse(localStorage.getItem(path + "info")));
      setModelTopology(
        JSON.parse(localStorage.getItem(path + "model_topology"))
      );
    }
  }, []);

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

  async function handleSave() {
    const model = await tf.loadLayersModel(tf.io.fromMemory(modelTopology));
    const result = await model.save("localstorage://my-model");
    console.log("saved:", result.modelArtifactsInfo);
    setInfo(result.modelArtifactsInfo);
  }

  async function handleRemove() {
    const result = tf.io.removeModel("localstorage://my-model");
    console.log("removed:", result.modelArtifactsInfo);
    setInfo(result.modelArtifactsInfo);
  }

  const handleAddLayer = (className, config) => {
    let t = { ...modelTopology };
    t.config.layers.push({
      class_name: className,
      config: config,
    });
    setModelTopology(t);
  };

  async function handleTrain() {
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
        <br />
        Saved: {info && info.dateSaved ? info.dateSaved.toString() : ""}
      </p>
      <h2>Layers</h2>
      <Layers modelTopology={modelTopology} />
      <Button
        className="btn btn-primary btn-sm"
        onClick={() =>
          handleAddLayer("Dense", {
            name: "Dense_" + modelTopology.config.layers.length,
            activation: "tanh",
            batch_input_shape:
              modelTopology.config.layers.length === 0 ? [null, 2] : null,
          })
        }
      >
        Add Layer
      </Button>

      <h2>Model Topology</h2>
      <p>
        ModelTopology: {modelTopology ? JSON.stringify(modelTopology) : "none"}
      </p>

      <Form>
        <Form.Group controlId="formModel">
          <Form.Label>Epocs</Form.Label>
          <Form.Control
            placeholder="Number of epocs to train"
            type="number"
            value={epochs}
            onChange={(e) => handleOnChange("epochs", +e.currentTarget.value)}
          ></Form.Control>
        </Form.Group>
      </Form>

      <ButtonGroup aria-label="Model actions">
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button
          variant="primary"
          onClick={handleTrain}
          disabled={modelTopology.config.layers.length < 1}
        >
          Train
        </Button>
        <Button variant="primary" onClick={handleRemove}>
          Remove
        </Button>
      </ButtonGroup>
    </div>
  );
};

Model.propTypes = {};

export default Model;
