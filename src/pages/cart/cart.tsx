import React, { useContext, useEffect, useState } from "react";
import "./cart.scss";
import { EventContext } from "../../context/event-context";
import { useNavigate } from "react-router-dom";
import { CartItem } from "./cart-item";
import { Events } from "../../types";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export const Cart = () => {
  const [totalAmount, setTotalAmount] = useState(0);

  interface CartContextType {
    events: Events[];
    cartItems: Record<number, number>;
  }

  const { events, cartItems } = useContext(EventContext) as CartContextType;

  useEffect(() => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = events.find((event) => event.id === Number(item));
        itemInfo && (total += cartItems[item] * itemInfo.price);
      }
    }
    setTotalAmount(total);
  }, [events, cartItems]);

  const navigate = useNavigate();

  return (
    <>
      {1 < 0 ? (
        <h1>your cart is empty</h1>
      ) : (
        <>
          <div className="pme-cart">
            <div>
              <h2 className="pme-cart__title">Cart Items</h2>
            </div>
            <div className="pme-cart__items">
              <Container>
                <Row>
                  {events.map((event) => {
                    if (cartItems[event.id] !== 0) {
                      return <CartItem data={event} key={event.id} />;
                    }
                  })}
                </Row>
              </Container>
            </div>
          </div>

          <div className="pme-cart__checkout">
            <span className="pme-cart__subtotal">
              Subtotal: <span>{totalAmount} Kč</span>
            </span>
            <button
              className="pme-cart__continue"
              onClick={() => navigate("/")}
            >
              Continue Browsing
            </button>
            <button className="pme-cart__checkout-btn">Checkout</button>
          </div>
        </>
      )}
    </>
  );
};
