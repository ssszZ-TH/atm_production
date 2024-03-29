import { MoneyAtmContext } from "../../context/MoneyAtmContext";
import { useContext } from "react";
import { Card,CardHeader,ListGroup,ListGroupItem } from "reactstrap";

// ใส่ key กัน waring เฉยๆ 
import { v4 as uuidv4 } from 'uuid';


function ShowMoneyWindow(params) {
    const {moneyAtm, SetMoneyAtm} = useContext(MoneyAtmContext)
    let filteredMoney = moneyAtm.filter(O => O.quantity>0)
    //console.log(filteredMoney);
  return (
    <>
      <Card
        style={{
          width: "18rem",
        }}
      >
        <CardHeader>All money in atm</CardHeader>
        <ListGroup flush>
          {filteredMoney.map((item)=>(
            <ListGroupItem key={uuidv4()}>{item.name} X {item.quantity}</ListGroupItem>
          ))}
        </ListGroup>
      </Card>
    </>
  );
}
export { ShowMoneyWindow };
