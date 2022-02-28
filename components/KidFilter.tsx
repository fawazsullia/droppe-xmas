//just takes the list of kids, function to manipulate parent state and sets the current selected kid

import React from "react";
import { IKidFilterProps } from "../types";
import styles from "./styles/KidFilter.module.css";



const KidFilter = ({ kids, selectKid, selectedKid }: IKidFilterProps): JSX.Element => {

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {kids.map((kid) => {
          return (
            <p
              style={{
                backgroundColor: selectedKid.id === kid.id ? "blue" : "inherit",
                color: selectedKid.id === kid.id ? "white" : "inherit",
              }}
              key={kid.id}
              className={styles.listItem}
              onClick={()=>selectKid(kid)}
            >
              {kid.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default KidFilter;
