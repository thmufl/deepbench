import React, { useState } from "react";

/*
class: {layer.class_name} name: {layer.config.name || "none"} units:
{layer.config.units || 3} activation:{" "}
{layer.config.activation || "tanh"}
*/

const LayerForm = (props) => {
  const [config, setConfig] = useState(props.config);

  const handleOnChange = (name, value) => {
    const c = { ...config };
    c[name] = value;
    setConfig(c);
    props.config[name] = value;
  };
  return (
    <form>
      <div className="form-group row">
        <label htmlFor="inputClassName">Class Name</label>
        <input
          disabled
          type="text"
          className="form-control"
          id="inputClassName"
          value={props.className}
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
          value={config.name}
          onChange={(e) => handleOnChange("name", e.currentTarget.value)}
          aria-describedby="nameHelp"
        ></input>
        <small id="nameHelp" className="form-text text-muted">
          The name of the layer.
        </small>
      </div>

      <div className="form-group row">
        <label htmlFor="inputInputShape">Input Shape</label>
        <input
          type="number"
          className="form-control"
          id="inputInputShape"
          value={config.inputShape}
          onChange={(e) => handleOnChange("inputShape", +e.currentTarget.value)}
          aria-describedby="inputShapeHelp"
        ></input>
        <small id="inputShapeHelp" className="form-text text-muted">
          The input shape of the layer.
        </small>
      </div>

      <div className="form-group row">
        <label htmlFor="inputUnits">Units</label>
        <input
          type="number"
          className="form-control"
          id="inputUnits"
          value={config.units}
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
          value={config.activation}
          onChange={(e) => handleOnChange("activation", e.currentTarget.value)}
          aria-describedby="activationHelp"
        ></input>
        <small id="activationHelp" className="form-text text-muted">
          The activation function (tanh, sigmoid, relu etc.) of the nodes.
        </small>
      </div>
    </form>
  );
};

export default LayerForm;
