import { Link } from "react-router-dom";
import { pluralize, idbPromise } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price, quantity } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });

      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="product-card">
      <div className="product-card-image">
        <img alt={name} src={`/images/${image}`} />
      </div>

      <div className="product-card-detail">
        <Link to={`/products/${_id}`}>
          <h4 className="product-card-heading">{name}</h4>
        </Link>
        <div className="product-card-stats">
          {quantity} {pluralize("item", quantity)} in stock
          <p>${price}</p>
        </div>
        <button className="addCartBtn" onClick={addToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
