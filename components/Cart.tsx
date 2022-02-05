import React from "react";
import { ICartProps } from "../types";
import styles from "./styles/Cart.module.css";
import calculateDiscount from "../helpers/calculateDiscount";
import calculateTotalCost from "../helpers/calculateTotal";

const Cart = ({
  approvedProds,
  setviewPopup,
  settotal,
  cart,
  count,
}: ICartProps): JSX.Element => {
  //handle when > button is pressed. shows the confirmation popup
  function handleConfirm() {
    settotal({
      cost: calculateTotalCost(approvedProds),
      discount: calculateDiscount(approvedProds),
    });

    let cartCount = 0;

    cart.forEach((c) => {
      cartCount = cartCount + c.products.length;
    });
    if (cartCount === count) {
      setviewPopup(true);
    } else {
      alert("There are items to be approved or rejected");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>You Approved: </div>
      <div className={styles.prodContainer}>
        {approvedProds.map((prod) => {
          return (
            <div key={prod.product.title} className={styles.product}>
              <p className={styles.productTitle}>{prod.product.title} </p>
              <p className={styles.productCount}>{prod.count}</p>
            </div>
          );
        })}
      </div>
      <div className={styles.priceContainer}>
        <div className={styles.priceContainerPrice}>
          <p>Total : ${calculateTotalCost(approvedProds)}</p>
          <p>Discount Applied : ${calculateDiscount(approvedProds)} </p>
        </div>
        <button type="button" onClick={handleConfirm}>
          {"➤"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
