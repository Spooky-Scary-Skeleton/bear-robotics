import Box from "./Box";
import Draggable from "./Draggable";
import GlobalStyle from "./GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Draggable>
        <Box />
      </Draggable>
    </>
  );
}

export default App;
