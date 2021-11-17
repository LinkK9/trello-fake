import styled from "styled-components";

type AddNewButtonProps = {
  dark?: boolean;
};

export const AppContainer = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: #3179ba;
  height: 100vh;
  width: 100%;
  padding: 20px;
`;
export const ColumnContainer = styled.div`
  background-color: #ebecf0;
  width: 300px;
  min-height: 40px;
  margin-right: 20px;
  border-radius: 3px;
  padding: 8px 8px;
  flex-grow: 0;
`;

export const ColumnTitle = styled.div`
  padding: 6px 16px 12px;
  font-weight: bold;
`;

export const CardContainer = styled.div`
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  max-width: 300px;
  border-radius: 3px;
  box-shadow: #091e4240 0px 1px 0px 0px;
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
`
export const NewItemButton = styled.button`
background-color: #5aac44;
border-radius: 3px;
border: none;
color: #fff;
text-align: center;
padding: 6px 12px;
`

export const NewItemInput = styled.input`
border-radius: 3px;
border: none;
box-shadow: #091e4240 0px 1px 0px 0px;
margin-bottom: 0.5rem;
width: 100%;
`