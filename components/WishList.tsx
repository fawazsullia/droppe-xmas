import React, { useEffect, useState } from "react";
import { ICart, IProduct, IWishListProps } from "../types";
import Loader from "./Loader";
import styles from "./styles/WishList.module.css";

const WishList = ({ cart, selectedKid, addApproved, approvedProds, addRejected, setcount}: IWishListProps) => {
  const [wishList, setwishList] = useState<IProduct[]>();
  const [fetching, setfetching] = useState<boolean>(true);
  const [marked, setmarked] = useState<{kidId : number, prodId : number}[]>([]);
  const [rejectMarked, setrejectMarked] = useState<{kidId : number, prodId : number}[]>([]);

  useEffect(() => {
    setfetching(true);
    const selected = cart.filter((item) => item.id === selectedKid?.id);
    let promises = selected[0]?.products.map(
      (sel: { productId: number; quantity: number }) => {
        return fetch(`https://fakestoreapi.com/products/${sel.productId}`);
      }
    );
    Promise.all(promises)
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((res) => {
        setwishList(res);
        setfetching(false);
      })
      .catch((e) => {
        setfetching(false);
        console.log(e);
      });
  }, [selectedKid]);

  useEffect(() => {
    setcount(marked.length + rejectMarked.length);
  
   
  });
  

  //handling approval of gifts when clicked on check mark
  const handleApprove = (e: any) => {
    const temp = wishList?.filter(
      (el) => el.id == e.target.parentElement.id
    )[0];
    if (temp !== undefined) {
      addApproved(temp, selectedKid);
      setmarked([...marked, {kidId : selectedKid.id, prodId : temp.id}]);
//remove from marked
let tempArr = []

for(let i: number =0; i< rejectMarked.length; i++){
  let cond1 = rejectMarked[i].kidId != selectedKid.id
        let cond2 = rejectMarked[i].prodId != e.target.parentElement.id
        let cond3 = rejectMarked[i].kidId == selectedKid.id
        let cond4 = rejectMarked[i].prodId == e.target.parentElement.id
  if((cond1 && cond2) || (cond3 && cond2) || (cond4 && cond1)){
    tempArr.push(rejectMarked[i])
  }
}
setrejectMarked(tempArr)
    }
  };

  //handling removal of gifts when clicked on x mark
  function handleReject(e : any){
    const temp = wishList?.filter(
      (el) => el.id == e.target.parentElement.id
    )[0];
    if (temp !== undefined) {
      addRejected(temp, selectedKid);
      setrejectMarked([...rejectMarked, {kidId : selectedKid.id, prodId : temp.id}]);
      //remove from marked
      let tempArr = []
      for(let i: number =0; i< marked.length; i++){

        let cond1 = marked[i].kidId != selectedKid.id
        let cond2 = marked[i].prodId != e.target.parentElement.id
        let cond3 = marked[i].kidId == selectedKid.id
        let cond4 = marked[i].prodId == e.target.parentElement.id
        
        if((cond1 && cond2) || (cond3 && cond2) || (cond4 && cond1)){
          tempArr.push(marked[i])
        }
      }
      setmarked(tempArr)
    }
  }





  //check if product is in marked
  function checkIfMarked(kidId : number, prodId : number){
   const temp = marked.filter((a)=> a.kidId == kidId && a.prodId == prodId)
   return temp.length > 0;
  }

  //check if marked as reject
  function checkIfMarkedReject(kidId : number, prodId : number){
    const temp = rejectMarked.filter((a)=> a.kidId == kidId && a.prodId == prodId)
    return temp.length > 0;
   }


  //check if the product count is more than 1
  function indicateDiscount(id: number){
    let requiredProd = approvedProds.filter((a)=> a.product.id === id && a.count > 0)
    return requiredProd[0]?.count + 1

  }

  // console.log({mar : marked})
  // console.log({rej : rejectMarked})


  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <p>{selectedKid.name}'s WishList</p>
      </div>
      {fetching ? (
        <Loader />
      ) : (
        <div className={styles.wishListDiv}>
          {wishList?.map((list) => {
            return (
              <div
                key={list.title}
                className={styles.wishListContainer}
                id={list.id.toString()}
              >
                { indicateDiscount(list.id) > 0 && !checkIfMarked(selectedKid.id, list.id) && <span className={styles.discount}>Add for {indicateDiscount(list.id) * 10}% Discount on this item</span>}
                <p className={styles.wishListCancel} 
                onClick={handleReject}
                style={{
                  pointerEvents: checkIfMarkedReject(selectedKid.id, list.id)
                    ? "none"
                    : "visible",
                    backgroundColor : checkIfMarkedReject(selectedKid.id, list.id)
                    ? "grey" : "indianred"
                }}
                >
                  ✖
                </p>
                <p className={styles.wishList}>{list.title}</p>
                <p
                  className={styles.wishListChoose}
                  onClick={handleApprove}
                  style={{
                    pointerEvents: checkIfMarked(selectedKid.id, list.id)
                      ? "none"
                      : "visible",
                      backgroundColor : checkIfMarked(selectedKid.id, list.id)
                      ? "grey" : "rgb(41, 170, 41)"
                  }}
                >
                  ✔
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default WishList;
