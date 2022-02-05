import React, { useState, useEffect } from "react";
import styles from "./styles/Confirm.module.css";
import { IApprovedProd, IConfirmProps } from "../types";
import userRouter, { useRouter } from "next/router";

function Confirm({
  approvedProds,
  setviewPopup,
  cart,
  rejectedProds,
}: IConfirmProps) {
  
  const [finalCarts, setfinalCarts] = useState<
    {
      kidName: string;
      id: number;
      approvedProducts: IApprovedProd[];
      rejectedProducts: IApprovedProd[];
    }[]
  >([]);

  useEffect(() => {
    setfinalCarts(returnDetails());
  }, []);

  const router = useRouter();

  //close popup
  function handleClosePopup() {
    setviewPopup(false);
  }

  //get approved products
  function getAppProds(kidId: number) {
    let app1: IApprovedProd[] = approvedProds.filter((p) =>
      p.kids.includes(kidId)
    );

    return app1;
  }

  //get rejected products
  function getRejectedProds(kidId: number) {
    let rej: IApprovedProd[] = rejectedProds.filter((p) =>
      p.kids.includes(kidId)
    );
    return rej;
  }

  //set up data to be displayed and sent to api
  function returnDetails() {
    let reqArr = [];

    for (let i: number = 0; i < cart.length; i++) {
      let prod = {
        kidName: cart[i].kidName,
        id: cart[i].id,
        approvedProducts: getAppProds(cart[i].id),
        rejectedProducts: getRejectedProds(cart[i].id),
      };

      reqArr.push(prod);
    }
    return reqArr;
  }

  function handleSubmit() {
    const promises = finalCarts.map((cart) => {
      return fetch(`https://fakestoreapi.com/carts/${cart.id}`, {
        method: "PUT",
        body: JSON.stringify(cart),
      });
    });

    Promise.all(promises)
      .then((responses) => {
        router.push("/confirmation");
      })
      .catch((e) => {
        alert("Oops, something went wrong");
      });
  }

  //   console.log(finalCarts);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p onClick={handleClosePopup} className={styles.clsBtn}>
          ✖
        </p>

        <p className={styles.heading}>Confirm your choices</p>
      </div>
      <div className={styles.main}>
        <div className={styles.details}>
          {finalCarts.map((item) => {
            return (
              <div key={item.id} className={styles.card}>
                <p className={styles.kidName}>{item.kidName}</p>
                <div className={styles.cardHeading}>
                  <p>Approved</p>
                  <p>Rejected</p>
                </div>
                <div className={styles.dataDiv}>
                  <ul className={styles.approvedDiv}>
                    {item.approvedProducts.map((p) => (
                      <li key={`${p.product.id}+${p.kids[0]}`}>
                        {p.product.title}
                      </li>
                    ))}
                  </ul>
                  <br />
                  <ul className={styles.disapprovedDiv}>
                    {item.rejectedProducts.map((p) => (
                      <li key={`${p.product.id}+${p.kids[0]}`}>
                        {p.product.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button className={styles.btn} onClick={handleSubmit}>
        Confirm
      </button>
    </div>
  );
}

export default Confirm;
