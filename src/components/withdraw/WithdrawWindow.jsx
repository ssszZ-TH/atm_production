import { useContext, useState } from "react";
import { Input, Label, Button, Alert } from "reactstrap";
import { MoneyAtmContext } from "../../context/MoneyAtmContext";
import { FaCheck } from "react-icons/fa";
import { Receipt } from "./Reciept";

function WithdrawWindow() {
  const showlog = false;
  const [info, setInfo] = useState("");
  const [infoColor, setInfoColor] = useState("");
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
  const [dispensMoneyAmount, setDispensMoneyAmount] = useState(0);

  const [showReciept, setShowReciept] = useState(false);

  const [visibleInfo, setVisibleInfo] = useState(true);

  const onDismiss = () => setVisibleInfo(false);

  ////// start withdraw process ///////////////////////////////////

  const withdrawBtnClick = () => {
    setInfo("");
    setVisibleInfo(false);
    //clone ค่ามาจาก react state
    let temp_moneyObj = structuredClone(moneyAtm);
    let temp_outAmount = outAmount;

    if (temp_outAmount == 0) {
      setInfo("ถอนเงิน 0 บาท ไม่ได้");
      setInfoColor("danger");
      setVisibleInfo(true);
      return;
    }

    //กรณีถอนเงินมากกว่าที่ตู้ มี
    if (temp_outAmount > moneyAtmTotal) {
      setInfo("เงินในตู้ไม่พอสำหรับการถอน");
      setInfoColor("danger");
      setVisibleInfo(true);
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
      setInfoColor("danger");
      setVisibleInfo(true);
      // !! ยกเลิกการถอนเงินที่ทำมาทั้งหมด
      return;
    }
    setInfo("ถอนเงินสำเร็จ");
    setInfoColor("success");
    setVisibleInfo(true);
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
    setDispensMoneyAmount(outAmount); // เงินที่จะป้อนให้ใบเสร็จ
    setOutAmount(0);
    setShowReciept(true);
  };

  // end of withdraw process ///////////////////////////////////////////////////////

  return (
    <>
      <br />
      <Label>Amount</Label>
      <Input
        id="exampleNumber"
        name="number"
        placeholder="number placeholder"
        type="number"
        value={outAmount}
        onChange={outAmountChange}
      />{" "}
      <br />{" "}
      <Button
        color="primary"
        outline
        onClick={() => {
          setOutAmount(0);
        }}
      >
        cancle
      </Button>{" "}
      <Button color="primary" onClick={withdrawBtnClick}>
        <FaCheck /> withdraw
      </Button>
      <br />
      {info ? (
        <Alert color={infoColor} isOpen={visibleInfo} toggle={onDismiss}>
          {info}
        </Alert>
      ) : null}
      {showReciept ? (
        <Receipt
          banks={dispensMoneyObj}
          dispensMoneyAmount={dispensMoneyAmount}
        />
      ) : null}
    </>
  );
}

export { WithdrawWindow };
