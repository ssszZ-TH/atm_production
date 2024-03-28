import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import { MainLayout } from "./components/MainLayout.jsx";

function App() {
  return (
    <>
      <ThemeContextProvider>
        <p>this is main </p>
        <MainLayout />
      </ThemeContextProvider>
    </>
  );
}

export default App;
