import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid black;
`;

function Draggable({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}

export default Draggable;
