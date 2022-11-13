import React from "react";

interface TabModalProps {
  items: Array<string>;
  getTabItem: () => string;
  setTab: (item: string) => void;
}

const TabModal: React.FC<TabModalProps> = (props) => {
  return (
    <div className="flex gap-5 border-b-[1px] dark:border-black ">
      {props.items.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => props.setTab(item)}
            className={`${
              item === props.getTabItem()
                ? "font-black border-b-white border-b-[1px] dark:border-black "
                : ""
            } cursor-pointer`}
          >
            <p className="py-2 dark:text-black">{item}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TabModal;
