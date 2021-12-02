import React, { useState } from "react";
import {
  NewItemButton,
  NewItemFormContainer,
  NewItemInput,
} from "../../styles";
import { useFocus } from "../../utils/useFocus";

type NewItemFormProps = {
  onAdd(text: string): void;
};
const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState("");
  const inputRef = useFocus();

  const handleAddtext = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onAdd(text);
    }
  };

  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleAddtext}
      />
      <NewItemButton onClick={() => onAdd(text)}>Thêm</NewItemButton>
    </NewItemFormContainer>
  );
};

export default NewItemForm;
