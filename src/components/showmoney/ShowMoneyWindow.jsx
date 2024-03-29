import { MoneyAtmContext } from "../../context/MoneyAtmContext";
import { useContext } from "react";
import { Table } from "reactstrap";

import { HiBanknotes } from "react-icons/hi2";
import { GiBallPyramid } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";

function ShowMoneyWindow(params) {
  const { moneyAtm, moneyAtmTotal } = useContext(MoneyAtmContext);
  let filteredMoney = moneyAtm.filter((O) => O.quantity > 0);
  //console.log(filteredMoney);
  return (
    <>
      <br />
      <Table>
        <thead>
          <tr>
            <th><HiBanknotes/> Bank note type</th>
            <th><GiBallPyramid/> Quantity</th>
          </tr>
        </thead>
        <tbody>
          {filteredMoney.map((item) => (
            <tr key={item.name}>
              <td >{item.name}</td>
              <td >{item.quantity}</td>
            </tr>
          ))}
          <tr >
              <td >Total</td>
              <td >{moneyAtmTotal}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
export { ShowMoneyWindow };
