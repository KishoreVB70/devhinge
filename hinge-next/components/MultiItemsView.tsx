import React from "react";
type MultiItemsViewProps = {
  type: "Skills" | "Hobbies";
  items: string[];
};
function MultiItemsView({ type, items }: MultiItemsViewProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full p-5 mt-4 flex flex-col items-center space-y-4 border border-gray-200">
      {/* Section Title */}
      <h1 className="text-lg font-semibold text-gray-700 tracking-wide">
        {type}
      </h1>

      {/* Grid Container */}
      <div className="grid grid-cols-3 gap-3 w-full">
        {items.map((item) => (
          <div
            className="border border-gray-400 text-gray-700 bg-gray-100 text-sm font-medium px-3 py-2 rounded-md text-center shadow-sm transition-transform transform hover:scale-105 hover:bg-gray-200"
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultiItemsView;
