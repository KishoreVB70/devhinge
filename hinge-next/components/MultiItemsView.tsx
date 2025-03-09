import React from "react";
type MultiItemsViewProps = {
  type: "Skills" | "Hobbies";
  items: string[];
};
function MultiItemsView({ type, items }: MultiItemsViewProps) {
  return (
    <>
      <h1>{type}</h1>
      {items.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </>
  );
}

export default MultiItemsView;
