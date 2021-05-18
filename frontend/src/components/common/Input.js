import React, { useRef, useCallback } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const InputForm = styled.input`
  height: calc(1.5em + 1em + 6px);
  padding: 0.5em 1em;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 0.4em;
  display: block;
  width: 100%;
  color: #000;
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  overflow: hidden;
  border: none;

  ${(props) =>
    props.rounded &&
    css`
      border-radius: 40px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    `}
`;

const InputContainer = styled.div`
  border-radius: 0.4em;
  flex: 1;
  border: 1px solid #000;
  background: #fff;

  ${(props) =>
    props.rounded &&
    css`
      border-radius: 40px;
    `}

  .input-group {
    position: relative;
    display: flex;
    align-items: stretch;
    width: 100%;
  }
`;

const GroupPrepend = styled.div`
  display: flex;
  margin-right: -1px;

  button {
    border: none;
    padding: 0.5em 1em;
    line-height: 1.5;
    font-size: 0.875em;
    border-radius: 40px;
    position: relative;
    z-index: 2;
    color: #9aa1b9;
    padding-right: 0.25em;
    font-weight: 400;

    display: inline-block;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    :not(:disabled) {
      cursor: pointer;
    }

    svg {
      vertical-align: middle;
    }
  }
`;

const Input = (props) => {
  const ref = useRef();

  const handleBtnClick = useCallback(() => {
    ref.current.focus();
  }, [ref]);

  return (
    <InputContainer
      rounded={props.rounded}
      style={props.style}
    >
      {props.icon ? (
        <GroupPrepend>
          {/* TODO: CHECK IF IS A VALID DOM ELEMENT */}
          <button type="button" onClick={handleBtnClick}>
            {props.icon}
          </button>
          <InputForm
            ref={ref}
            placeholder={props.placeholder}
            type={props.type}
            onChange={props.onChange}
            onClick={props.onClick}
            onKeyPress={props.onKeyPress}
            required={props.required}
            name={props.name}
            value={props.value}
            rounded={props.rounded}
          />
        </GroupPrepend>
      ) : (
        <InputForm
          ref={ref}
          placeholder={props.placeholder}
          type={props.type}
          onChange={props.onChange}
          onClick={props.onClick}
          onKeyPress={props.onKeyPress}
          required={props.required}
          name={props.name}
          green={props.green}
          value={props.value}
          rounded={props.rounded}
        />
      )}
    </InputContainer>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  required: PropTypes.bool,
};

export default Input;
