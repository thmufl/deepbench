import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

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
    modelTopology.config.layers.splice(layerIndex, 1);
    const model = await tf.loadLayersModel(tf.io.fromMemory(modelTopology));
    const result = await model.save("localstorage://my-model");
    console.log("deleted:", result.modelArtifactsInfo);
    props.history.replace("/model");
  }

  function handleCancel() {
    props.history.replace("/model");
  }

  const handleOnChange = (name, value) => {
    console.log("handleOnChange", name, value);
    const l = { ...layer };
    l.config[name] = value;
    setLayer(l);
  };

  return (
    <div className="container">
      <h1>Layer: {layerIndex}</h1>
      <Form>
        <Form.Group controlId="formLayerClassName">
          <Form.Label>Class Name</Form.Label>
          <Form.Control
            disabled
            type="text"
            value={layer.class_name}
            placeholder="Class name"
          />
          <Form.Text>Class name of the layer</Form.Text>
        </Form.Group>

        <Form.Group controlId="formLayerName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={layer.config.name}
            onChange={(e) => handleOnChange("name", e.currentTarget.value)}
            placeholder="Enter a layer name"
          />
        </Form.Group>

        <Form.Group controlId="formLayerUnits">
          <Form.Label>Units</Form.Label>
          <Form.Control
            type="number"
            value={layer.config.units}
            onChange={(e) => handleOnChange("units", +e.currentTarget.value)}
          />
          <Form.Text>The number of nodes (neurons) in the layer.</Form.Text>
        </Form.Group>

        <Form.Group controlId="formLayerActivation">
          <Form.Label>Activation</Form.Label>
          <Form.Control
            as="select"
            value={layer.config.activation}
            onChange={(e) =>
              handleOnChange("activation", e.currentTarget.value)
            }
          >
            <option>sigmoid</option>
            <option>relu</option>
            <option>tanh</option>
          </Form.Control>
          <Form.Text>
            The activation of the nodes (e.g. tanh, relu, sigmoid).
          </Form.Text>
        </Form.Group>
      </Form>
      <Button variant="primary" onClick={handleSave}>
        Save
      </Button>
      &nbsp;
      <Button variant="primary" onClick={handleDelete}>
        Delete
      </Button>
      &nbsp;
      <Button variant="primary" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default LayerForm;
