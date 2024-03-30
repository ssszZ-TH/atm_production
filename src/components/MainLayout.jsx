import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

import { DepositeWindow } from "./deposite/DepositeWindow";
import { HistoryWindow } from "./history/HistoryWindow";
import { PreferenceWindow } from "./preference/PreferenceWindow";
import { ShowMoneyWindow } from "./showmoney/ShowMoneyWindow";
import { WithdrawWindow } from "./withdraw/WithdrawWindow";

import { Nav, NavItem, NavLink } from "reactstrap";
import { FaEye, FaBitcoin, FaHistory } from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";

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
      <Nav tabs pills fill>
        <NavItem>
          <NavLink className={tab == 0 ? "active" : ""} onClick={tab1click}>
            <FaEye /> Showmoney
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={tab == 1 ? "active" : ""} onClick={tab2click}>
            <FaBitcoin /> Deposite
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={tab == 2 ? "active" : ""} onClick={tab3click}>
            <BiMoneyWithdraw /> Withdraw
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={tab == 3 ? "active" : ""} onClick={tab4click}>
            <FaHistory /> History
          </NavLink>
        </NavItem>
      </Nav>
      <div className="row">
        <div className="col-lg-3 col-centered">
          {tab == 0 ? <ShowMoneyWindow /> : <></>}
          {tab == 1 ? <DepositeWindow /> : <></>}
          {tab == 2 ? <WithdrawWindow /> : <></>}
          {tab == 3 ? <HistoryWindow /> : <></>}
        </div>
      </div>
    </>
  );
}
export { MainLayout };
