import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import PropTypes from "prop-types";

const Layers = (props) => {
  let { layers } = props.modelTopology.config;

  return (
    <ListGroup>
      {layers.map((layer, index) => (
        <LinkContainer
          key={index}
          to={{
            pathname: `/models/${props.modelTopology.config.name}/layers/${index}`,
            state: { modelTopology: props.modelTopology },
          }}
        >
          <ListGroup.Item>
            {`${layer.config.name} (${layer.config.units} units, ${layer.config.activation})`}
          </ListGroup.Item>
        </LinkContainer>
      ))}
    </ListGroup>
  );
};

Layers.propTypes = {};

export default Layers;
