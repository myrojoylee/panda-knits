import { useStoreContext } from "../../utils/GlobalState.jsx";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {
  const [data, dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <>
      <div className="item-image">
        <img src={`/images/${item.image}`} alt="" />
      </div>
      <div>
        <div className="name-price">
          <p className="item-name">{item.name}</p>
          <p className="item-price">${item.price}</p>
          {item.personal[0]?.data ? (
            <>
              <p>Custom name: </p>
              <p>{item.personal[0].data}</p>
            </>
          ) : null}
        </div>
        <div className="item-detail">
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            className="remove-item"
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            remove
          </span>
        </div>
      </div>
    </>
  );
};

export default CartItem;
