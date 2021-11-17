import React from "react";
import { ColumnContainer, ColumnTitle } from "../../styles";
import AddNewItem from "../add-item/AddNewItem";

export type ColumnProps = {
  text: string;
};

const Column: React.FC<ColumnProps> = ({ text, children }) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
      <AddNewItem toggleButtonText="+ Add new task" onAdd={console.log} dark />
    </ColumnContainer>
  );
};

export default Column;