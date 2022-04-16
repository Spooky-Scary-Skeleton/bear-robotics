import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 10%;
  border: 1px solid black;
`;

function Box() {
  return (
    <StyledDiv>
      <div>box</div>
    </StyledDiv>
  );
}

export default Box;
