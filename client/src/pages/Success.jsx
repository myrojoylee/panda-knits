// import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import Jumbotron from "../components/Jumbotron";
// // import { ADD_ORDER } from "../utils/mutations";
// import { idbPromise } from "../utils/helpers";
import { QUERY_SINGLE_ORDER } from "../utils/queries";
import { useSearchParams } from "react-router-dom";

function Success() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderNumber = searchParams.get("orderNumber");
  const { loading, data } = useQuery(QUERY_SINGLE_ORDER, {
    variables: { id: orderNumber },
  });
  console.log(data);

  return (
    <>
      {loading ? (
        <>
          <h2>An error has occurred.</h2>
          <h3>Please navigate back to the homepage</h3>
        </>
      ) : (
        <div>
          <Jumbotron>
            <h1>Success! {data.order._id}</h1>
            <h2>Thank you for your purchase!</h2>
            <h2>You will now be redirected to the home page</h2>
          </Jumbotron>
        </div>
      )}
    </>
  );
}

export default Success;
