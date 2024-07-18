import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getallorderapi } from "../../apis/Api";

const Cart = () => {
  const { id } = useParams();
  const [cart, setCart] = useState([]);  // Initialize cart as an empty array
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUserData);

    if (storedUserData && storedUserData._id) {
      getallorderapi(storedUserData._id)
        .then((res) => {
          console.log("Full API response:", res);  // Log the full API response
          if (res && res.data) {
            if (res.data.success === false) {
              toast.error(res.data.message);
            } else {
              setCart(res.data.order || []);  // Ensure cart is an array
            }
          } else {
            toast.error("Unexpected API response");
          }
        })
        .catch((err) => {
          toast.error("Server Error");
          console.log("API error:", err.message);
        });
    }
  }, [id]);

  // Add product to cart
  const addToCart = (product) => {
    const updatedCart = cart.map((item) =>
      item.productId._id === product.productId._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
  };

  // Remove product from cart
  const removeFromCart = (product) => {
    const updatedCart = cart.map((item) =>
      item.productId._id === product.productId._id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cart
      .reduce(
        (total, item) => total + item.productId.productPrice * item.quantity,
        0
      )
      .toFixed(2);
  };

  // Handle checkout
  const checkout = () => {
    alert("Checkout successful!");
    setCart([]);
  };

  // Cart item component
  const CartItem = ({ item, quantity, increase, decrease }) => {
    return (
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          margin: "10px",
          maxWidth: "600px",
          display: "flex",
          alignItems: "center"
        }}
      >
        <img
          src={item.productId.productImageUrl}
          alt={item.productId.productName}
          style={{ width: "50px", height: "50px", marginRight: "10px" }}
        />
        <div style={{ flex: 1 }}>
          <span>{item.productId.productName}</span>
          <div style={{ margin: "0 10px" }}>
            <span>Price: NPR {item.productId.productPrice}</span>
          </div>
          <div>
            <span style={{ marginRight: "10px" }}>Quantity: {quantity}</span>
            <button style={{ marginRight: "5px" }} onClick={() => increase(item)}>
              +
            </button>
            <button onClick={() => decrease(item)}>-</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="cart-container">
      <h1 className="cart-heading">My Cart</h1>
      {Array.isArray(cart) && cart.length === 0 ? (
        <div>No items in the cart.</div>
      ) : (
        cart.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            quantity={item.quantity}
            increase={addToCart}
            decrease={removeFromCart}
          />
        ))
      )}
      {Array.isArray(cart) && cart.length > 0 && (
        <div className="cart-summary">
          <h3>Total: NPR {getTotalPrice()}</h3>
          <button className="checkout-button" onClick={checkout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
