import { ChakraProvider } from "@chakra-ui/react";
import CalendarView from "./components/CalendarView";

function App() {
  return (
    <div style={{ height: "95vh" }}>
      <ChakraProvider>
        <CalendarView />
      </ChakraProvider>
    </div>
  );
}

export default App;
