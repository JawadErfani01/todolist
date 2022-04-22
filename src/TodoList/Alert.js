import React, {useEffect } from "react";
function Alert({ type, msg, removeAlert }) {
  useEffect(() => {
    const Mytime = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => {
      clearTimeout(Mytime);
    };
  }, []);

  return (
    <div>
      <h3 className={`alert ${type}`}>{msg}</h3>
    </div>
  );
}

export default Alert;
