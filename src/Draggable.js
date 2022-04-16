import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import throttle from "./utils/throttle";

const ContainerDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid black;
`;

const WrapperDiv = styled.div.attrs((props) => ({
  style: {
    top: props.y + "px",
    left: props.x + "px",
  },
}))`
  position: absolute;
  width: 20%;
  height: 20%;
  cursor: move;
`;

function Draggable({ children }) {
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const containerRef = useRef();
  const containerXY = useRef({ x: 0, y: 0 });
  const deltaXY = useRef({ x: 0, y: 0 });
  const memoizedHandleDragging = useCallback(handleDragging, []);
  const throttledDraggingHandler = useMemo(
    () => throttle(memoizedHandleDragging, 11),
    [memoizedHandleDragging]
  );

  useEffect(() => {
    containerXY.current.x = containerRef.current.getBoundingClientRect().left;
    containerXY.current.y = containerRef.current.getBoundingClientRect().top;
  }, []);

  function handleDraggingStart(event) {
    isDragging.current = true;
    deltaXY.current.x =
      event.screenX -
      event.currentTarget.getBoundingClientRect().left +
      containerXY.current.x;
    deltaXY.current.y =
      event.screenY -
      event.currentTarget.getBoundingClientRect().top +
      containerXY.current.y;
  }

  function handleDraggingEnd() {
    isDragging.current = false;
  }

  function handleDragging(event) {
    if (isDragging.current) {
      setBoxPosition({
        x: event.screenX - deltaXY.current.x,
        y: event.screenY - deltaXY.current.y,
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
