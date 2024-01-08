import ReactDom from "react-dom";
import { useRef, useEffect } from "react";

export const PopUpDom = ({ children }) => {
  const el = document.getElementById("popupDom");
  return ReactDom.createPortal(children, el);
};

// export const PopupDom = ({ children }) => {
//   const el = useRef(null);

//   useEffect(() => {
//     if (el.current) {
//       ReactDom.createPortal(children, el.current);
//     }
//   }, [children]);

//   return <div id="popupDom" ref={el} />;
// };
