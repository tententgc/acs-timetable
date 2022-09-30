import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  return (
    <div className="absolute text-[8px] text-red-500">{props.message}</div>
  );
};

export default ErrorMessage;
