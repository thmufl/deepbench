import React, { useState, useEffect, Fragment } from "react";
import { LinkContainer } from "react-router-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import ModelService from "../services/ModelService";
import PropTypes from "prop-types";

const Models = (props) => {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    const list = async () => {
      let result = await ModelService.list("localstorage:");
      console.log("result", result, Array.isArray(result));
      setInfos(result);
    };
    list();
  }, [setInfos]);

  const handleAdd = () => {
    let modelTopology = {
      class_name: "Sequential",
      config: {
        name: "new-model",
        layers: [],
      },
    };

    const result = ModelService.save(modelTopology, "localstorage://new-model");
    props.history.replace(`/models/${modelTopology.config.name}`);
  };

  return (
    <Fragment>
      <ListGroup>
        {infos.map((info) => (
          <LinkContainer key={info.name} to={`/models/${info.name}`}>
            <ListGroup.Item>
              <span className="mr-4">{info.name}</span>
              <span className="mr-4">{info.value.dateSaved}</span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </ListGroup>

      <Button onClick={handleAdd}>Add</Button>
    </Fragment>
  );
};

Models.propTypes = {};

export default Models;
