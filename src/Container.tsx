import React, { useState, useRef } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import styles from "./index.module.css";

const ITEMTYPES = {
  CARD: "card",
};

const Card = ({ text, id, index, moveCard }) => {
  console.log("this si text an index", text, index);

  const ref = useRef(null);
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: ITEMTYPES.CARD,
    item: () => ({
      id,
      index,
      text,
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
      //   console.log("ite", item);

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex == hoverIndex) return;
      const { top, bottom } = ref.current.getBoundingClientRect();
      const { x, y } = monitor.getClientOffset();
      if (
        (hoverIndex < dragIndex && y > top + 10) ||
        (hoverIndex > dragIndex && y < bottom - 10)
      ) {
        moveCard(dragIndex, hoverIndex, item);
        item.index = hoverIndex;
      }
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
  const moveCard = (dragIndex, hoverIndex, item) => {
    console.log("this is item =====>", dragIndex, hoverIndex);
    const tmpObj = state[dragIndex];
    const tmpArr = state.slice();
    tmpArr.splice(dragIndex, 1);
    tmpArr.splice(hoverIndex, 0, tmpObj);

    setState(tmpArr);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      {state.map((item, index) => (
        <Card
          key={item.id + index}
          text={item.text}
          id={item.id}
          index={index}
          moveCard={moveCard}
        />
      ))}
    </DndProvider>
  );
};

export default Container;
