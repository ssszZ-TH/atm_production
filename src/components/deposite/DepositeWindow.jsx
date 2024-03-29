import { useState } from "react";
import { Table } from "reactstrap";

function DepositeWindow() {
  const [Inbank1000, setInBank1000] = useState(0);
  const handleInBank1000Change = (e) => {
    setInBank1000(e.target.value);
  };
  const [Inbank500, setInBank500] = useState(0);
  const handleInBank500Change = (e) => {
    setInBank500(e.target.value);
  };
  const [Inbank100, setInBank100] = useState(0);
  const handleInBank100Change = (e) => {
    setInBank100(e.target.value);
  };
  const [Inbank50, setInBank50] = useState(0);
  const handleInBank50Change = (e) => {
    setInBank50(e.target.value);
  };
  const [Inbank20, setInBank20] = useState(0);
  const handleInBank20Change = (e) => {
    setInBank20(e.target.value);
  };
  const [Inbank10, setInBank10] = useState(0);
  const handleInBank10Change = (e) => {
    setInBank10(e.target.value);
  };
  const [Inbank5, setInBank5] = useState(0);
  const handleInBank5Change = (e) => {
    setInBank5(e.target.value);
  };
  const [Inbank2, setInBank2] = useState(0);
  const handleInBank2Change = (e) => {
    setInBank2(e.target.value);
  };
  const [Inbank1, setInBank1] = useState(0);
  const handleInBank1Change = (e) => {
    setInBank1(e.target.value);
  };

  const showlog = false;

  const depositeBtnClick = () => {
    //ยังไม่เส็ด !!
    let temp_moneyObj = structuredClone(money_obj);
    let temp_moneyArr = temp_moneyObj.map((i) => i.quantity);
    temp_moneyArr[0] += Number(Inbank1000);
    temp_moneyArr[1] += Number(Inbank500);
    temp_moneyArr[2] += Number(Inbank100);
    temp_moneyArr[3] += Number(Inbank50);
    temp_moneyArr[4] += Number(Inbank20);
    temp_moneyArr[5] += Number(Inbank10);
    temp_moneyArr[6] += Number(Inbank5);
    temp_moneyArr[7] += Number(Inbank2);
    temp_moneyArr[8] += Number(Inbank1);
    const bankTypeArr = [1000, 500, 100, 50, 20, 10, 5, 2, 1];
    if (showlog)
      console.log("เงินในตู้หลังจากฝาก เเสดงเเบบ array", temp_moneyArr);
    let newAtmBankState = [];
    for (let i = 0; i < bankTypeArr.length; i++) {
      newAtmBankState[i] = {
        name: "bank" + String(bankTypeArr[i]),
        quantity: temp_moneyArr[i],
      };
    }
    console.log("state เงินใหม่หลังจาก update เส็ดเเล้ว", newAtmBankState);
    set_money_obj(newAtmBankState);
    setShowReceipt(false);
  };

  return (
    <>
      <br />
      <Table>
        <thead>
          <tr>
            <th>Class</th>
            <th>Heading</th>
            <th>Heading</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-primary">
            <td>primary</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr className="table-secondary">
            <td>secondary</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr className="table-success">
            <td>success</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr className="table-danger">
            <td>danger</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr className="table-warning">
            <td>warning</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr className="table-info">
            <td>info</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr className="table-light">
            <td>light</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr className="table-dark">
            <td>dark</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export { DepositeWindow };
