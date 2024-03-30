import "./Receipt.css";
import { v4 as uuidv4 } from "uuid";

// about time
import { useDate } from "../../utils/TimeNow";

// เดี๋ยวทำให้มันมีเวลาในใบเสร็จ
function Receipt(props) {
  const showlog = false;
  const { date, time } = useDate();
  if (showlog) console.log(date, time);
  let banks = props.banks;
  let outAmount = props.dispensMoneyAmount;
  if (showlog) console.log("banks ที่รับเข้ามาใน component", banks);
  if (showlog)
    console.log(
      "ลองเอาไป map เล่นๆ จะได้เเบบนี้",
      banks.map((i) => i.name + "=" + i.quantity)
    );

  let filteredBank = banks.filter((i) => i.quantity > 0);
  if (showlog) console.log(filteredBank);

  return (
    <>
      <div className="text-center mt-3">
        <div>
          <section className="receipt container-ticket">
            <div className="ticket">
              <div className="head-ticket">
                <p className="x-bold">
                  <br />
                  ถอนเงินสำเร็จ
                </p>
                <p className="bold">กรุณา crop หน้าจอเพื่อเป็นหลักฐาน</p>
                <p className="bold">Tel: +66 00 000 0000</p>
                <br />
                <p className="bold">Atm spa bank สาขา GDL Tech</p>
                <p>{date}{time}</p>
                <p>Receipt code :{uuidv4()}</p>
              </div>
              <div className="body-ticket">
                <div className="produits">
                  <div className="col2">
                    <p>Bank</p>
                    <p className="prix">จำนวน</p>
                  </div>
                  <div className="hr-sm"></div>

                  {filteredBank.map((bank) => (
                    <div className="col2" key={bank.name}>
                      <p>{bank.name}</p>
                      <p className="prix">{bank.quantity}</p>
                    </div>
                  ))}

                  <br />
                  <div className="col2">
                    <p>Payment Method</p>
                    <p className="prix">Cash</p>
                  </div>
                  <div className="col2">
                    <p>Amount recived</p>
                    <p className="prix">{outAmount}</p>
                  </div>
                  <div className="col2">
                    <p>Balance</p>
                    <p className="prix">ต้องรอ backend</p>
                  </div>
                </div>
                <div className="hr-lg"></div>
                <div className="carte">
                  <p className="title-carte">Customer: สิทธิพงศ์</p>
                  <br />
                  <p>power by (React + Vite + Swc)</p>
                </div>
                <div className="hr-lg"></div>
              </div>
              <div className="footer-ticket">
                <p className="title-footer">THANK YOU BRO</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export { Receipt };
