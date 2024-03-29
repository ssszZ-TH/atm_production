import { MoneyAtmContext } from "../../context/MoneyAtmContext";
import { useContext } from "react";
import { Table } from "reactstrap";

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
            <th>Bank note type</th>
            <th>Quantity</th>
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
