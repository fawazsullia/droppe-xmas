import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Header from "../components/Header";
import Loader from "../components/Loader";

function Confirmation() {
  const router = useRouter();

  return (
    <div>
      <Header />
      <div style={{ paddingTop: "100px" }}>
        <p
          style={{
            textAlign: "center",
            fontSize: "1.8rem",
            fontWeight: "600",
            color: "indianred",
          }}
        >
          You have successfully saved your choices. Thank You for using
          Droppe-Xmas
        </p>
        <button
          onClick={() => {
            router.push("/");
          }}
          style={{
            display: "block",
            margin: "50px auto auto auto",
            backgroundColor: "green",
            color: "white",
            border: "none",
            padding: "10px 30px",
            outline: "none",
          }}
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
}

export default Confirmation;
