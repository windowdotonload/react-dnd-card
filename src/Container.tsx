import React, { useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import styles from "./index.module.css";
import { useDrag, useDrop } from "react-dnd";

const Card = ({ text }) => {
  return (
    <div className={styles.card}>
      <p>{text}</p>
    </div>
  );
};

export const Container = (props) => {
  const [state, setState] = useState([
    { id: "card1", text: "CARD-ONE" },
    { id: "card2", text: "CARD-SEC" },
    { id: "card3", text: "CARD-THR" },
  ]);
  return (
    <DndProvider backend={HTML5Backend}>
      {state.map((item) => (
        <Card key={item.id} text={item.text} />
      ))}
    </DndProvider>
  );
};

export default Container;
