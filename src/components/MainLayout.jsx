import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { TestButton } from "./TestButton";

import { DepositeWindow } from "./deposite/DepositeWindow";
import { HistoryWindow } from "./history/HistoryWindow";
import { PreferenceWindow } from "./preference/PreferenceWindow";
import { ShowMoneyWindow } from "./showmoney/ShowMoneyWindow";
import { WithdrawWindow } from "./withdraw/WithdrawWindow";


import { Nav, NavItem, NavLink } from "reactstrap";

function MainLayout(params) {
  const { theme, setTheme } = useContext(ThemeContext);
  const [tab, setTab] = useState(0);

  function tab1click() {
    //show money
    setTab(0);
  }
  function tab2click() {
    //deposit
    setTab(1);
  }
  function tab3click() {
    //withdraw
    setTab(2);
  }
  function tab4click() {
    //history
    setTab(3);
  }

  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink className={tab==0?"active":""} onClick={tab1click}>
            Showmoney
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={tab==1?"active":""} onClick={tab2click}>
            Deposite
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={tab==2?"active":""} onClick={tab3click}>
            Withdraw
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={tab==3?"active":""} onClick={tab4click}>
            History
          </NavLink>
        </NavItem>
      </Nav>
      
      {tab==0?<ShowMoneyWindow/>:<></>}
      {tab==1?<DepositeWindow/>:<></>}
      {tab==2?<WithdrawWindow/>:<></>}
      {tab==3?<HistoryWindow/>:<></>}
    </>
  );
}
export { MainLayout };
