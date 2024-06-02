import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

const CustomModal = ({ children, onHide }) => {
  const modalRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!modalRef.current.contains(e.target)) {
        onHide();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onHide]);

  return createPortal(
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 z-[900] bg-[#0000004D]"
        style={{ backdropFilter: "blur(4px)" }}
      ></div>
      <div
        ref={modalRef}
        className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[1000] max-sm:max-w-[90vw] w-full max-w-[700px] h-auto p-4 bg-[#7f7f80]"
      >
        <div className="flex items-center justify-end font-[500]">
          <IoMdClose
            size={22}
            onClick={onHide}
            className="cursor-pointer"
          />
        </div>
        <div>{children}</div>
      </div>
    </>,
    document.getElementById("portal"),
  );
};

export default CustomModal;
