import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Cart from "../components/Cart";
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const [personalName, setPersonalName] = useState("");
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  const handleChange = (event) => {
    console.log(event.target.value);
    setPersonalName(event.target.value);
  };

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: {
          ...currentProduct,
          purchaseQuantity: 1,
          personal: [{ data: personalName }],
        },
      });
      idbPromise("cart", "put", {
        ...currentProduct,
        purchaseQuantity: 1,
        personal: [
          {
            data: personalName,
          },
        ],
      });
    }
    console.log(cart);
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise("cart", "delete", { ...currentProduct });
  };

  return (
    <>
      {currentProduct && cart ? (
        <section className="detail-wrapper">
          <Link className="detail-nav" to="/">
            ← Back to Browsing
          </Link>
          <div className="detail-header">
            <h2 className="detail-name">{currentProduct.name}</h2>
          </div>
          <div className="detail-body">
            <div className="detail-image">
              <img
                src={`/images/${currentProduct.image}`}
                alt={currentProduct.name}
              />
            </div>
            <div className="detail-description">
              <p className="detail-price">${currentProduct.price}</p>
              <p>{currentProduct.description}</p>
              {currentProduct.personal?.length ? (
                <>
                  <form className="customizeName">
                    <label htmlFor={currentProduct.personal[0].name}>
                      Enter Name:
                    </label>

                    <input
                      placeholder="Enter name here"
                      name="personalName"
                      value={personalName}
                      id="personalName"
                      type="text"
                      onChange={handleChange}
                    />
                  </form>
                </>
              ) : null}
              <p className="cart-btns">
                <button className="addCart" onClick={addToCart}>
                  + Add to Cart
                </button>
                <button
                  className="removeCart"
                  disabled={!cart.find((p) => p._id === currentProduct._id)}
                  onClick={removeFromCart}
                >
                  - Remove from Cart
                </button>
              </p>
            </div>
          </div>
        </section>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
