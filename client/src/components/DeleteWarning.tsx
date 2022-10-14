import React from "react";

interface DeleteWarningProps {
  open: boolean;
  handleChange: (val: string) => void;
  event_id: string;
}

const DeleteWarning: React.FC<DeleteWarningProps> = (props) => {
  const handleClick = (e: React.MouseEvent) => {
    props.handleChange(e.currentTarget.innerHTML);
  };

  return (
    <div
      className={`flex items-center justify-center fixed bg-black w-full h-full top-0 left-0 bg-opacity-20 duration-150 ${
        props.open ? "block" : "hidden"
      } z-10`}
    >
      <div className="w-[40vw] h-[20vh] bg-[#181828] rounded-xl animate-popup border-[1px] p-5">
        <div>
          <p className="text-white text-2xl text-center">
            Are you sure to delete this event ?
          </p>
        </div>
        <div className="flex justify-center items-center gap-10 mt-5">
          <div>
            <button
              className="text-red-600 px-5 py-2 hover:bg-red-500 hover:text-white  duration-100 ease-in rounded-sm border-red-500 border-[1px]"
              onClick={handleClick}
            >
              Yes
            </button>
          </div>
          <div>
            <button
              className="text-white px-5 py-2 hover:bg-white hover:text-black duration-100 ease-in rounded-sm border-white border-[1px]"
              onClick={handleClick}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteWarning;
