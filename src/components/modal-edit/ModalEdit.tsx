import React, { useRef, useState } from "react";
import { EditButton, NewItemInput } from "../../styles";
import Modal from "react-modal";

type ModalEditProps = {
  textVal: string;
  buttonVal: string;
  typeItem: string;
  onEdit: (text: string) => void;
  onDelete: () => void;
};

const customStyles = {
  content: {
    top: "15%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#ebecf0",
  },
};

const deleteButtonStyle: React.CSSProperties = {
  color: "#ffffff",
  backgroundColor: "#ed4250",
  padding: "10px 20px",
  textAlign: "center",
  minWidth: 150,
  fontWeight: "bold",
  border: "none",
};

const headStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 10,
};

Modal.setAppElement('#root');
const ModalEdit = ({
  typeItem,
  textVal,
  buttonVal,
  onEdit,
  onDelete,
}: ModalEditProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [text, setText] = useState(textVal);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeText = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onEdit(text);
      setIsOpen(false);
    }
  };

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
		setTimeout(() => {
    inputRef.current?.focus();
		}, 10);
  };
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <EditButton onClick={openModal}>{buttonVal}</EditButton>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div style={headStyle}>
          <strong> Chỉnh Sửa </strong>
          <button onClick={closeModal}>x</button>
        </div>
        <NewItemInput
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleChangeText}
        />
        <button type="button" onClick={handleDelete} style={deleteButtonStyle}>
          Xóa {typeItem}
        </button>
      </Modal>
    </div>
  );
};

export default ModalEdit;
