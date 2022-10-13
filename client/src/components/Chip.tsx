import React from "react";

interface ChipProps {
  color?: string;
  title: string;
}

const Chip: React.FC<ChipProps> = (props) => {
  return (
    <div
      className={`px-2 py-[0.5px] flex rounded-xl w-fit`}
      style={{ backgroundColor: `#${props.color}` }}
    >
      <p className="m-auto text-[10px] font-mono">{props.title}</p>
    </div>
  );
};

export default Chip;