import React from "react";
import styled from "styled-components";
const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.small ? 5 : undefined,
}))`
  height: 30px;
  width: max-content;
  border: none;
  padding: 0 10px 0 6px;
  background-color: transparent;
  box-shadow: none;
`;

const FilterComponent = ({ filterText, onFilter, onClear, PlaceHolder }) => (
  <>
    <Input
      id="search"
      type="text"
      placeholder={PlaceHolder}
      value={filterText}
      onChange={onFilter}
    />
  </>
);

export default FilterComponent;
