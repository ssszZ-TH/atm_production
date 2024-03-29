import { createContext, useEffect, useState } from "react";

// เอาไว้ให้ child component เรียกใช้
const MoneyAtmContext = createContext(null);

// เอาไว้ครอบตัวที่จะเรียกใช้ได้
function MoneyAtmContextProvider({ children }) {
  const [moneyAtmTotal, setMoneyAtmTotal] = useState(0);
  const [moneyAtm, setMoneyAtm] = useState([
    {name:"bank1000",quantity:1},
    {name:"bank500" ,quantity:1},
    {name:"bank100" ,quantity:1},
    {name:"bank50"  ,quantity:1},
    {name:"bank20"  ,quantity:1},
    {name:"bank10"  ,quantity:1},
    {name:"bank5"   ,quantity:1},
    {name:"bank2"   ,quantity:1},
    {name:"bank1"   ,quantity:1},
  ]);

  function moneyAtmChanged() {
    let temp_moneyObj = structuredClone(moneyAtm);
    let banks = temp_moneyObj.map((o) => o.quantity);
    const bankType = [1000, 500, 100, 50, 20, 10, 5, 2, 1];
    let totalQuantity = 0;
    for (let index = 0; index < bankType.length; index++) {
      totalQuantity += banks[index] * bankType[index];
    }
    setMoneyAtmTotal(totalQuantity);
  }
  
  // update total money 
  useEffect(moneyAtmChanged,[moneyAtm])
  //ทุกครั้งที่ทำให้ money เปลี่ยน ต้อง update total money

  return (
    <MoneyAtmContext.Provider value={{ moneyAtm, setMoneyAtm, moneyAtmTotal,moneyAtmChanged }}>
      {children}
    </MoneyAtmContext.Provider>
  );
}

export { MoneyAtmContext, MoneyAtmContextProvider };
