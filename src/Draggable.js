import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import constants from "./utils/constants";
import throttle from "./utils/throttle";

const BoundaryDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: ${constants.BOUNDARY_BORDER_WIDTH}px solid black;
`;

const WrapperDiv = styled.div.attrs((props) => ({
  style: {
    top: props.top + "px",
    left: props.left + "px",
  },
}))`
  position: absolute;
  width: 20%;
  height: 20%;
  cursor: move;
`;

function Draggable({ children }) {
  const [boxPosition, setBoxPosition] = useState({ top: 0, left: 0 });
  const isDragging = useRef(false);
  const containerRef = useRef();
  const dragBoundary = useRef({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });
  const delta = useRef({ left: 0, right: 0, top: 0, bottom: 0 });
  const memoizedHandleDragging = useCallback(handleDragging, []);
  const throttledHandleDragging = useMemo(
    () => throttle(memoizedHandleDragging, constants.THROTTLE_THRESHOLD),
    [memoizedHandleDragging]
  );

  useEffect(() => {
    const positionReference = containerRef.current.getBoundingClientRect();

    dragBoundary.current.left = positionReference.left;
    dragBoundary.current.right = positionReference.right;
    dragBoundary.current.top = positionReference.top;
    dragBoundary.current.bottom = positionReference.bottom;
  }, []);

  function handleDraggingStart(event) {
    const positionReference = event.currentTarget.getBoundingClientRect();

    isDragging.current = true;

    delta.current.left = event.clientX - positionReference.left;
    delta.current.right = positionReference.right - event.clientX;
    delta.current.top = event.clientY - positionReference.top;
    delta.current.bottom = positionReference.bottom - event.clientY;
  }

  function handleDraggingEnd() {
    isDragging.current = false;
  }

  function handleDragging(event) {
    if (isDragging.current) {
      const boxWidth =
        delta.current.right +
        delta.current.left +
        constants.BOX_BORDER_WIDTH * 2;
      const boxHeight =
        delta.current.top +
        delta.current.bottom +
        constants.BOX_BORDER_WIDTH * 2;
      const maxRight =
        dragBoundary.current.right -
        dragBoundary.current.left -
        constants.BOUNDARY_BORDER_WIDTH * 2 -
        boxWidth;
      const maxBottom =
        dragBoundary.current.bottom -
        dragBoundary.current.top -
        constants.BOUNDARY_BORDER_WIDTH * 2 -
        boxHeight;
      let calculatedX =
        event.clientX - delta.current.left - dragBoundary.current.left;
      let calculatedY =
        event.clientY - delta.current.top - dragBoundary.current.top;

      if (calculatedX < 0) {
        calculatedX = 0;
      }

      if (calculatedX > maxRight) {
        calculatedX = maxRight;
      }

      if (calculatedY < 0) {
        calculatedY = 0;
      }

      if (calculatedY > maxBottom) {
        calculatedY = maxBottom;
      }

      setBoxPosition({
        top: calculatedX,
        left: calculatedY,
      });
    }
  }

  return (
    <>
      Draggable Area
      <BoundaryDiv ref={containerRef}>
        <WrapperDiv
          left={boxPosition.top}
          top={boxPosition.left}
          onMouseDown={handleDraggingStart}
          onMouseMove={throttledHandleDragging}
          onMouseUp={handleDraggingEnd}
          onMouseLeave={handleDraggingEnd}
        >
          {children}
        </WrapperDiv>
      </BoundaryDiv>
    </>
  );
}

export default Draggable;
