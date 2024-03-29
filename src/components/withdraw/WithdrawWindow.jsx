import { useContext, useState } from "react";
import { Input, Label, Button, Alert } from "reactstrap";
import { MoneyAtmContext } from "../../context/MoneyAtmContext";
import { FaCheck } from "react-icons/fa";

function WithdrawWindow() {
  const showlog = false;
  const [info, setInfo] = useState("");
  const [infoColor, setInfoColor] = useState("primary");
  const [outAmount, setOutAmount] = useState(0);
  function outAmountChange(e) {
    if (e.target.value < 0) {
      e.target.value = Math.abs(e.target.value);
    }
    setOutAmount(e.target.value);
  }

  const { moneyAtm, setMoneyAtm, moneyAtmTotal, moneyAtmChanged } =
    useContext(MoneyAtmContext);
  // console.log("money atm",moneyAtm);
  // console.log("set money atm",setMoneyAtm);
  // console.log("money atm total",moneyAtmTotal);

  const [dispensMoneyObj, setDispensMoneyObj] = useState([]);

  ////// start withdraw process ///////////////////////////////////

  const withdrawBtnClick = () => {
    setInfo("");
    //clone ค่ามาจาก react state
    let saved_moneyObj = structuredClone(moneyAtm);
    let temp_moneyObj = structuredClone(moneyAtm);
    let temp_outAmount = outAmount;

    if (temp_outAmount == 0) {
      setInfo("ถอนเงิน 0 บาท ไม่ได้");
      return;
    }

    //กรณีถอนเงินมากกว่าที่ตู้ มี
    if (temp_outAmount > moneyAtmTotal) {
      setInfo("เงินในตู้ไม่พอสำหรับการถอน");
      return;
    }

    // เเตกเงินไว้ใน array ตามเเบบฉบับ alien
    let atmMoneyArr = temp_moneyObj.map((o) => o.quantity);
    const bankTypeArr = [1000, 500, 100, 50, 20, 10, 5, 2, 1];
    let outBankArr = [];
    //ลดรูปการคำนวนในเเต่ละ bank
    for (let i = 0; i < bankTypeArr.length; i++) {
      let wantThatbank = Math.floor(temp_outAmount / bankTypeArr[i]);
      if (wantThatbank > atmMoneyArr[i]) {
        //กรณีที่ bank ดังกล่าว ไม่พอ
        outBankArr[i] = atmMoneyArr[i]; // bank นั้นๆ ออกเท่าที่มี // update out
        temp_outAmount -= atmMoneyArr[i] * bankTypeArr[i]; // หักเงินออกจาก temp เท่าที่ bank นั้นๆ มี // update temp
        atmMoneyArr[i] = 0; //bank นั้นๆ จ่ายออกไปหมด bank นั้นๆ ก็ต้องเหลือ 0 // update atm
      } else {
        //กรณีที่ bank ดังกล่าวพอ
        outBankArr[i] = wantThatbank; //เอา bank นั้นๆ ออกเท่าที่ต้องการ //update out
        temp_outAmount -= wantThatbank * bankTypeArr[i]; // update temp
        atmMoneyArr[i] -= wantThatbank; //update atm bank
      }
      // ต้องมีอะไรอีก เเต่ยังคิดไม่ออก
    }
    if (temp_outAmount > 0) {
      if (showlog)
        console.log("bank ย่อยของ atm เรา ขาดไปอีก" + String(temp_outAmount));
      setInfo(
        "bank ย่อยของ atm เรา ขาดไปอีก" +
          String(temp_outAmount) +
          "บาท กรุณาถอนเป็นจำนวนเงินถ้วนๆ"
      );
      // !! ยกเลิกการถอนเงินที่ทำมาทั้งหมด
      return;
    }
    setInfo("ถอนเงินสำเร็จ");
    if (showlog) console.log("เงินที่ออกเเบบ array", outBankArr);
    if (showlog) console.log("เงินที่เหลือเเบบ array", atmMoneyArr);
    // ต้องเอาค่าไป set ลง react state อีก
    let newAtmBankState = [];
    for (let i = 0; i < bankTypeArr.length; i++) {
      newAtmBankState[i] = {
        name: "bank" + String(bankTypeArr[i]),
        quantity: atmMoneyArr[i],
      };
    }

    let outBankObj = [];
    for (let i = 0; i < outBankArr.length; i++) {
      outBankObj[i] = {
        name: "bank" + String(bankTypeArr[i]),
        quantity: outBankArr[i],
      };
    }

    if (showlog) console.log("state ใหม่ ที่รอ update", newAtmBankState);
    setMoneyAtm(newAtmBankState);
    if (showlog) console.log("เงินที่ออกมาในรูปเเบบ object", outBankObj);
    setDispensMoneyObj(outBankObj);
    moneyAtmChanged();
    setOutAmount(0);
  };

  // end of withdraw process ///////////////////////////////////////////////////////

  return (
    <>
      <br />
      <Label for="withdraw">Amount</Label>
      <Input
        id="exampleNumber"
        name="number"
        placeholder="number placeholder"
        type="number"
        value={outAmount}
        onChange={outAmountChange}
      />{" "}
      <br />{" "}
      <Button color="primary" outline>
        cancle
      </Button>{" "}
      <Button color="primary" onClick={withdrawBtnClick}>
      <FaCheck/> withdraw
      </Button>
      <br />
      {info ? <Alert color={infoColor}>{info}</Alert> : null}
    </>
  );
}

export { WithdrawWindow };
