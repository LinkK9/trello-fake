import styled from "styled-components";

type AddNewButtonProps = {
  dark?: boolean;
};

interface DragPreviewProps {
  opacity?: number;
}

export const DragPreviewContainer = styled.div<DragPreviewProps>`
  opacity: ${(props) => props.opacity};
`;

export const AppContainer = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: #3179ba;
  height: 100vh;
  width: 100%;
  padding: 20px;
  overflow-x: auto;
`;
export const ColumnContainer = styled(DragPreviewContainer)`
  background-color: #ebecf0;
  width: 300px;
  min-height: 40px;
  margin-right: 20px;
  border-radius: 3px;
  padding: 8px 8px;
  flex-shrink: 0;
`;

export const EditButton = styled.button`
  width: 20px;
  height: 20px;
  opacity: 0;
  border: none;
  background-color: inherit;
  text-align: center;
  font-weight: bold;
  &:hover {
    background-color: #f1f1f1;
  }
`;
export const ColumnTitle = styled.div`
  padding: 6px 0 12px 16px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  ${EditButton} {
    opacity: 1;
  }
`;

export const CardContainer = styled(DragPreviewContainer)`
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  max-width: 300px;
  border-radius: 3px;
  box-shadow: #091e4240 0px 1px 0px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: #f8f8f8;
  }
  &:hover ${EditButton} {
    opacity: 1;
  }
`;

export const AddItemButton = styled.button<AddNewButtonProps>`
  max-width: 300px;
  padding: 10px 12px;
  text-align: left;
  border-radius: 3px;
  border: none;
  background-color: #ffffff3d;
  cursor: pointer;
  color: ${(props) => (props.dark ? "#000" : "#fff")};
  transition: background 85ms ease-in;
  width: 100%;
  flex-shrink: 0;
  & :hover {
    background-color: #ffffff52;
  }
`;

export const NewItemFormContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  flex-shrink: 0;
`;
export const NewItemButton = styled.button`
  background-color: #5aac44;
  border-radius: 3px;
  border: none;
  color: #fff;
  text-align: center;
  padding: 6px 12px;
`;

export const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: #091e4240 0px 1px 0px 0px;
  margin-bottom: 0.5rem;
  width: 100%;
  height: 2rem;
`;
