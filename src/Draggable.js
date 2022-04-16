import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import throttle from "./utils/throttle";

const ContainerDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid black;
`;

const WrapperDiv = styled.div`
  position: absolute;
  width: 10%;
  height: 10%;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  cursor: move;
`;

function Draggable({ children }) {
  const [isDragging, setIsDragging] = useState(false);
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef();
  const containerXY = useRef({ x: 0, y: 0 });
  const XYDelta = useRef({ x: 0, y: 0 });
  const memoizedHandleDragging = useCallback(handleDragging, [isDragging]);
  const throttledDraggingHandler = useMemo(
    () => throttle(memoizedHandleDragging, 20),
    [memoizedHandleDragging]
  );

  useEffect(() => {
    containerXY.current.x = containerRef.current.getBoundingClientRect().left;
    containerXY.current.y = containerRef.current.getBoundingClientRect().top;
  }, []);

  function handleDraggingStart(event) {
    setIsDragging(true);
    XYDelta.current.x =
      event.screenX -
      event.currentTarget.getBoundingClientRect().left +
      containerXY.current.x;
    XYDelta.current.y =
      event.screenY -
      event.currentTarget.getBoundingClientRect().top +
      containerXY.current.y;
  }

  function handleDraggingEnd() {
    setIsDragging(false);
  }

  function handleDragging(event) {
    if (isDragging) {
      setBoxPosition({
        x: event.screenX - XYDelta.current.x,
        y: event.screenY - XYDelta.current.y,
      });
    }
  }

  return (
    <>
      Draggable Area
      <ContainerDiv ref={containerRef}>
        <WrapperDiv
          x={boxPosition.x}
          y={boxPosition.y}
          onMouseDown={handleDraggingStart}
          onMouseMove={throttledDraggingHandler}
          onMouseUp={handleDraggingEnd}
          onMouseLeave={handleDraggingEnd}
        >
          {children}
        </WrapperDiv>
      </ContainerDiv>
    </>
  );
}

export default Draggable;
