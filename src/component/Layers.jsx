import React from "react";
import LayerForm from "./LayerForm";
import PropTypes from "prop-types";

const Layers = (props) => {
  let { layers } = props.modelTopology.config;

  const addLayer = (className, config) => {
    props.onAddLayer(className, config);
  };

  return (
    <div>
      <h3>Layers</h3>
      <button
        className="btn btn-primary btn-sm"
        onClick={() =>
          addLayer("Dense", {
            name: "Dense_" + layers.length,
            units: 3,
            activation: "tanh",
            batch_input_shape: [null, 2],
          })
        }
      >
        Add Layer
      </button>
      <ul className="list-group">
        {layers.map((layer, index) => (
          <li className="list-group-item" key={layer.name || `layer-${index}`}>
            <LayerForm
              className={layer.class_name}
              config={layer.config}
            ></LayerForm>
          </li>
        ))}
      </ul>
    </div>
  );
};

Layers.propTypes = {};

export default Layers;
