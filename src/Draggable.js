import styled from "styled-components";

const StyledDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid black;

  .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10%;
    height: 10%;
    transform: translate(-50%, -50%);
  }
`;

function Draggable({ children }) {
  return (
    <>
      Draggable Area
      <StyledDiv>
        <div className="wrapper">{children}</div>
      </StyledDiv>
    </>
  );
}

export default Draggable;
