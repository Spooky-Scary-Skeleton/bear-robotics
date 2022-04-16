import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid black;
`;

function Box() {
  return (
    <StyledDiv>
      <div>Box</div>
    </StyledDiv>
  );
}

export default Box;
