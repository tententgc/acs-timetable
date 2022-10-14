import React from "react";

interface TabModalProps {
  items: Array<string>;
  getTabItem: () => string;
  setTab: (item: string) => void;
}

const TabModal: React.FC<TabModalProps> = (props) => {
  return (
    <div className="flex gap-5 border-b-[1px]">
      {props.items.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => props.setTab(item)}
            className={`${
              item === props.getTabItem()
                ? "font-black border-b-black border-b-[1px]"
                : ""
            } cursor-pointer`}
          >
            <p className="py-2">{item}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TabModal;
