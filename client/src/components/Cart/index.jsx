import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@apollo/client";
// import { useLazyQuery } from "@apollo/client";
// import { QUERY_CHECKOUT } from "../../utils/queries";
import { CHECKOUT } from "../../utils/mutations";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignUpForm";
import { useStoreContext } from "../../utils/GlobalState.jsx";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";

import { Nav, Modal, Tab } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const stripePromise = loadStripe(
  "pk_test_51NimT1ADpz9jWnXhWtoF3if89KLMIkzm7JXohIVggIUZ1886REoryULRW5M2AuaVB55NQRF10cIgfbLoOzlTm9S300yRXOdrOA"
);

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  // const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const [showModal, setShowModal] = useState(false);
  const [checkout, { error, data }] = useMutation(CHECKOUT);

  useEffect(() => {
    if (data) {
      // the following is a link to the sample
      // checkout page since we are not set up
      // for production and payments are off
      window.location = `https://panda-knits-847b929e7885.herokuapp.com/sampleCheckout`;

      // uncomment below when ready for payments to be activated
      // window.location = data.checkout.sessionurl;
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    console.log(state.cart);
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  // note that this function will be used when stripe is in production mode
  // and payment functionality is active.
  // for now, the checkout page leads to a "sample checkout"
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await checkout({
        variables: {
          products: [
            ...state.cart.map((product) => {
              delete product.__typename;
              delete product.category.__typename;
              delete product.personal[0].__typename;
              return product;
            }),
          ],
        },
      });

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!state.cartOpen) {
    return (
      <>
        <div className="cart-closed" onClick={toggleCart}>
          <span role="img" aria-label="trash">
            <FontAwesomeIcon icon={faCartShopping} className="shopping-cart" />
          </span>
          {state.cart.length ? (
            <span className="cart-length">{state.cart.length}</span>
          ) : null}
        </div>
      </>
    );
  }

  return (
    <div className="cart">
      <div className="cart-closed">
        <span role="img" aria-label="cart-is-open">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="shopping-cart-open"
          />
        </span>
      </div>
      {/* <div className="close" onClick={toggleCart}>
        <FontAwesomeIcon icon={faCircleXmark} className="exit-before" />
      </div> */}
      <div className="shopping-cart-wrapper">
        <div className="shopping-cart-header">
          <div>
            <h2>Shopping Cart</h2>
            <h3>({state.cart.length} items)</h3>
          </div>
          <div className="close" onClick={toggleCart}>
            <FontAwesomeIcon icon={faCircleXmark} className="exit-before" />
          </div>
        </div>

        {state.cart.length ? (
          <div className="shopping-cart-detail">
            <span className="cart-length">{state.cart.length}</span>
            {state.cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}

            <div className="checkout-line">
              <p className="checkout-total">Subtotal: ${calculateTotal()}</p>

              {Auth.loggedIn() ? (
                <>
                  {/* goes to sample checkout page as we are not in production */}
                  <Link to="/sampleCheckout" className="checkout-login-text">
                    Checkout
                  </Link>
                  {/* <button onClick={handleSubmit}>Checkout</button> */}
                </>
              ) : (
                <Link
                  onClick={() => setShowModal(true)}
                  className="checkout-login-text"
                >
                  log in to check out
                </Link>
              )}
            </div>
          </div>
        ) : (
          <h3 className="cart-empty">Your cart is empty.</h3>
        )}
      </div>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
                <Nav.Item></Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </div>
  );
};

export default Cart;
