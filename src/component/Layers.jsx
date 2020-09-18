import React from "react";
import { Link } from "react-router-dom";
import LayerForm from "./LayerForm";
import PropTypes from "prop-types";

const Layers = (props) => {
  let { layers } = props.modelTopology.config;

  return (
    <div>
      <ul className="list-group">
        {layers.map((layer, index) => (
          <li className="list-group-item" key={index}>
            <Link
              to={{
                pathname: `/layers/${index}`,
                state: { modelTopology: props.modelTopology },
              }}
            >
              {`${layer.config.name} (${layer.config.units} unit(s))`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

Layers.propTypes = {};

export default Layers;
