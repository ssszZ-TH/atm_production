import { createContext, useState } from "react";

// เอาไว้ให้ child component เรียกใช้
const MoneyAtmContext = createContext(null);

// เอาไว้ครอบตัวที่จะเรียกใช้ได้
function MoneyAtmContextProvider({ children }) {
  const [moneyAtm, setMoneyAtm] = useState([
    {name:"bank1000",quantity:10},
    {name:"bank500" ,quantity:10},
    {name:"bank100" ,quantity:10},
    {name:"bank50"  ,quantity:10},
    {name:"bank20"  ,quantity:10},
    {name:"bank10"  ,quantity:10},
    {name:"bank5"   ,quantity:10},
    {name:"bank2"   ,quantity:10},
    {name:"bank1"   ,quantity:10},
  ]);

  return (
    <MoneyAtmContext.Provider value={{ moneyAtm, setMoneyAtm }}>
      {children}
    </MoneyAtmContext.Provider>
  );
}

export { MoneyAtmContext, MoneyAtmContextProvider };
