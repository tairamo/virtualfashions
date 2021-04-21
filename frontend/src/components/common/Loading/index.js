import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function getColor(props) {
  const d = document.createElement("div");
  d.style.color = props.color;
  document.body.appendChild(d);
  const rgbcolor = window.getComputedStyle(d).color;
  const match = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[.d+]*)*\)/g.exec(
    rgbcolor
  );
  const color = `${match[1]}, ${match[2]}, ${match[3]}`;
  return color;
}

const RotateSpin = styled.div`
  animation: ${(props) => `spinner ${props.duration}s infinite linear`};
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  border: ${(props) => `0.4em solid rgba(${getColor(props)}, 0.2)`};
  border-left: ${(props) => `0.4em solid ${props.color}`};
  border-radius: 50%;
  font-size: ${(props) => `${props.size}px`};
  height: 3em;
  margin: 5px auto;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  width: 3em;

  &:after {
    border-radius: 50%;
    height: 0.5em;
    width: 0.5em;
  }
`;

const RotateSpinLoader = (props) => <RotateSpin {...props} />;

RotateSpinLoader.propTypes = {
  color: PropTypes.string,
  duration: PropTypes.number,
  size: PropTypes.number,
};

RotateSpinLoader.defaultProps = {
  color: "#000",
  duration: 1.1,
  size: 10,
};

export default RotateSpinLoader;
