import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import { MainLayout } from "./components/MainLayout.jsx";
import { MoneyAtmContextProvider } from "./context/MoneyAtmContext.jsx";

function App() {
  return (
    <>
      <MoneyAtmContextProvider>
        <ThemeContextProvider>
          <MainLayout />
        </ThemeContextProvider>
      </MoneyAtmContextProvider>
    </>
  );
}

export default App;
