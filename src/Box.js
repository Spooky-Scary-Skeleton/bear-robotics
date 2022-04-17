import styled from "styled-components";
import constants from "./utils/constants";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: ${constants.BOX_BORDER_WIDTH}px solid black;
`;

function Box() {
  return (
    <StyledDiv>
      <div>Box</div>
    </StyledDiv>
  );
}

export default Box;
