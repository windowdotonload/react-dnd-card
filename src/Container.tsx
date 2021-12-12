import React, { useState, useRef } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import styles from "./index.module.css";

const ITEMTYPES = {
  CARD: "card",
};

const Card = ({ text, id, index }) => {
  const ref = useRef(null);
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: ITEMTYPES.CARD,
    item: () => ({
      id,
      index,
    }),
    collect: (monitor, props) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  }));
  const [collectedProps, drop] = useDrop(() => ({
    accept: ITEMTYPES.CARD,
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      console.log("thsi si monitor ", monitor);

      if (dragIndex == hoverIndex) return;
      console.log(dragIndex, hoverIndex);
    },
  }));
  drag(ref);
  drop(ref);
  const opacity = isDragging ? 0.1 : 1;
  return (
    <div ref={ref} className={styles.card} style={{ opacity }}>
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
      {state.map((item, index) => (
        <Card key={item.id} text={item.text} id={item.id} index={index} />
      ))}
    </DndProvider>
  );
};

export default Container;
