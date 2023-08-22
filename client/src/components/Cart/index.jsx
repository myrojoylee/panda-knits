import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState.jsx";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
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

  function submitCheckout() {
    getCheckout({
      variables: {
        products: [...state.cart],
      },
    });
  }

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
      <div className="cart-open">
        <span role="img" aria-label="cart-is-open">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="shopping-cart-open"
          />
        </span>
      </div>
      <div className="close" onClick={toggleCart}>
        <FontAwesomeIcon icon={faCircleXmark} className="exit-before" />
      </div>
      <div className="shopping-cart-wrapper">
        <div className="shopping-cart-header">
          <h2>Shopping Cart</h2>
          <h3>({state.cart.length} items)</h3>
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
                <button onClick={submitCheckout}>Checkout</button>
              ) : (
                <Link to="/login" className="checkout-login-text">
                  log in to check out
                </Link>
              )}
            </div>
          </div>
        ) : (
          <h3 className="cart-empty">Your cart is empty.</h3>
        )}
      </div>
    </div>
  );
};

export default Cart;
