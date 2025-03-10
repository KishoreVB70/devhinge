import React from "react";
type MultiItemsViewProps = {
  type: "Skills" | "Hobbies";
  items: string[];
};
function MultiItemsView({ type, items }: MultiItemsViewProps) {
  return (
    <div className="flex mt-2 flex-col items-center space-y-2">
      <h1 className="font-bold">{type}</h1>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <div className="border-red-500 border p-1 text-center" key={item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultiItemsView;
