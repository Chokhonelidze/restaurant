import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Button } from "reactstrap";
import { userContext } from "./context";

export default function Popup(props) {

  const [payments, setPayment] = React.useState("");
  const [user, setUser] = React.useContext(userContext);
  const [status, setStatus] = React.useState("");

  return (
    <div className="popup">
      <div className="popup_open">
        <button onClick={props.close} className="x_button">
          X
        </button>
        <div className="total">
          <h2>Total : {props.total}$</h2>
        </div>
        <div className="paymentBody">
          {payments == ''?
          <>
          {user?<><Button color="primary" onClick={()=>{setPayment('local')}}>Pay From BadBank</Button><br></br></>:''}
          <Button color="primary" onClick={()=>{setPayment('stripe')}}>Card Payment</Button>
          </>:""
          }
          {payments && payments === "local" ? (
            <LocalPayments
              user={user.user}
              total={props.total}
              reset={props.reset}
              setStatus={setStatus}
            />
          ) : (
            ""
          )}
          {payments && payments === 'stripe'?<h1>stripe</h1>:''}
        </div>
        <div className="users"></div>
        <div className="statusMessage text-success">{status ? <h4>{status}</h4> : ""}</div>
      </div>
    </div>
  );
}

function LocalPayments(props) {
  const GET_ACCOUNT = gql`
    query GetAccount($input: accountInput) {
      getAccount(input: $input) {
        id
        name
        email
        password
        deposit
      }
    }
  `;
  const PAY_QUERY = gql`
    mutation Pay($input: payment) {
      pay(input: $input) {
        id
        name
        email
        password
        deposit
        role
      }
    }
  `;

  let { loading, error, data } = useQuery(GET_ACCOUNT, {
    variables: { input: { user: props.user } },
  });
  const [pay] = useMutation(PAY_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  const payHandler = async () => {
    const result = await pay({
      variables: {
        input: {
          id: data.getAccount.id,
          value: props.total,
        },
      },
    });
    if (result) {
      props.setStatus(`successs! ${props.total}$ has been paied`);
      props.reset();

      console.log(result);
    }
  };
  if (Number(props.total) > Number(data.getAccount.deposit)) {
    return (
      <h5 className="text-warning">
        Your Balance is: {data.getAccount.deposit}$ you can not pay
      </h5>
    );
  } else {
    return (
      <>
        <h5 className="text-success">Balance:{data.getAccount.deposit} </h5>
        <Button onClick={payHandler}> PAY </Button>
      </>
    );
  }
}
