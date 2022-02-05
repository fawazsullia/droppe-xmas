import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import ChildFilter from "../components/KidFilter";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import { IApprovedProd, ICart, IKid, IProduct } from "../types";
import WishList from "../components/WishList";
import Cart from "../components/Cart";
import Confirm from "../components/Confirm";
import Loader from "../components/Loader";

const Home: NextPage = () => {
  const names: string[] = ["James", "Jill", "Mark", "Anne", "Heather"];

  const [cart, setcart] = useState<ICart[]>([]);
  const [kidslist, setkidslist] = useState<IKid[]>([]);
  const [selectedKid, setselectedKid] = useState<IKid>({
    id: 1,
    name: names[0],
  });
  const [loading, setloading] = useState<boolean>(true);
  const [approvedProds, setapprovedProds] = useState<IApprovedProd[]>([]);
  const [rejectedProds, setrejectedProds] = useState<IApprovedProd[]>([]);

  const [viewPopup, setviewPopup] = useState<boolean>(false);
  const [total, settotal] = useState<{ cost: number, discount: number }>({
    cost: 0,
    discount: 0,
  });
  const [count, setcount] = useState<number>(0);

  useEffect(() => {
    setloading(true);
    fetch("https://fakestoreapi.com/carts?limit=5")
      .then((res) => res.json())
      .then((response) => {
        let toBeCart = [];
        let toBeKids = [];
        for (let i: number = 0; i < response.length; i++) {
          toBeCart.push({ kidName: names[i], ...response[i] });
          toBeKids.push({ id: response[i].id, name: names[i] });
        }
        setcart(toBeCart);
        setkidslist(toBeKids);
        setloading(false);
      })
      .catch((e) => {
        console.log(e);
        setloading(false);
      });

    return () => {
      setcart([]);
      setkidslist([]);
    };
  }, []);

  //function to filter the kid list
  const selectKid = (arg: IKid) => {
    setselectedKid(arg);
  };

  //add to approved products
  const addApproved = (product: IProduct, selectedKid: IKid) => {
    let appProd = approvedProds.filter((prod) => prod.product.id == product.id);
    let excludeProd = approvedProds.filter(
      (prod) => prod.product.id != product.id
    );
    let inRejected = rejectedProds.filter(
      (prod) => prod.product.id == product.id
    );

    //change here to cover edge cases
    if (inRejected.length > 0) {
      if (inRejected[0].count == 1) {
        if (inRejected[0].kids[0] === selectedKid.id) {
          setrejectedProds(
            rejectedProds.filter((p) => p.product.id != product.id)
          );
        }
      } else {
        if (inRejected[0].kids[0] === selectedKid.id) {
          let index = inRejected[0].kids.indexOf(selectedKid.id);
          inRejected[0].kids.splice(index, 1);
          inRejected[0].count = inRejected[0].count - 1;
          setrejectedProds([...rejectedProds, inRejected[0]]);
        }

       
      }
    }

    if (appProd.length > 0) {
      let count = appProd[0].count + 1;

      setapprovedProds([
        { product, count, kids: [...appProd[0].kids, selectedKid.id] },
        ...excludeProd,
      ]);
    } else {
      setapprovedProds([
        { product, count: 1, kids: [selectedKid.id] },
        ...approvedProds,
      ]);
    }
  };

  //add to rejected
  function addRejected(product: IProduct, selectedKid: IKid) {
    let rejProd = rejectedProds.filter((prod) => prod.product.id == product.id);
    let excludeProd = rejectedProds.filter(
      (prod) => prod.product.id != product.id
    );
    let inApproved = approvedProds.filter(
      (prod) => prod.product.id == product.id
    );

    //removing from the approved product if count =1 and count-- if count>1
    if (inApproved.length > 0) {
      if (inApproved[0].count == 1) {
        if (inApproved[0].kids.includes(selectedKid.id)) {
          setapprovedProds(
            approvedProds.filter((p) => p.product.id != product.id)
          );
        }
      } else {
        if (inApproved[0].kids.includes(selectedKid.id)){
          let index = inApproved[0].kids.indexOf(selectedKid.id);
          inApproved[0].kids.splice(index, 1);
          inApproved[0].count = inApproved[0].count - 1;
          setrejectedProds([...rejectedProds, inApproved[0]]);
        }
        
      }
    }

    //adding the rejected project
    if (rejProd.length > 0) {
      let count = rejProd[0].count - 1;
      setrejectedProds([
        { product, count, kids: [...rejProd[0].kids, selectedKid.id] },
        ...excludeProd,
      ]);
    } else {
      setrejectedProds([
        { product, count: 1, kids: [selectedKid.id] },
        ...rejectedProds,
      ]);
    }
  }


  // console.log({ rej: rejectedProds });
  // console.log({ app: approvedProds });

  return loading ? (
    <Loader />
  ) : (
    <div className={styles.container}>
      <Head>
        <title>App | Droppe-Xmas</title>
        <meta
          name="description"
          content="Get your kids the gifts they want for christmas"
        />
      </Head>
      <Header />

      <main className={styles.main}>
        <ChildFilter
          kids={kidslist}
          selectKid={selectKid}
          selectedKid={selectedKid}
        />
        <WishList
          cart={cart}
          selectedKid={selectedKid}
          addApproved={addApproved}
          approvedProds={approvedProds}
          addRejected={addRejected}
          setcount={setcount}
        />
        {approvedProds.length > 0 && (
          <Cart
            approvedProds={approvedProds}
            setviewPopup={setviewPopup}
            settotal={settotal}
            rejectedProds={rejectedProds}
            cart={cart}
            count={count}
          />
        )}
        {viewPopup && (
          <Confirm
            approvedProds={approvedProds}
            setviewPopup={setviewPopup}
            total={total}
            cart={cart}
            rejectedProds={rejectedProds}
          />
        )}
      </main>
    </div>
  );
};

export default Home;
