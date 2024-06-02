import React, { useState } from "react";
import CustomModal from "./Modal";
import API from "../api/api";

const Compose = ({ socket, setMessages, onHide }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await API.submitMessage({ message });
      if (res?.status === 201) {
        setMessages((prev) => [{ message, createdAt: new Date() }, ...prev]);
        socket.emit("send_message", {
          message,
        });
        setMessage("");
        onHide();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomModal onHide={onHide}>
      <p className="text-center text-2xl">
        Tell your story - Share your truth!
      </p>
      <a
        className="hover:underline block mx-auto w-fit mt-1"
        href={`${process.env.PUBLIC_URL}/privacy-policy.pdf`}
        rel="noopener noreferrer"
        target="_blank"
      >
        Privacy Policy
      </a>

      <form onSubmit={handleSubmit}>
        <div className="relative my-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-[#F7FCFE] resize-none outline-none border-0 pb-2 text-black min-h-[230px] max-h-[350px] w-full p-3"
            placeholder="Type here..."
            maxLength={500}
            required
          ></textarea>
          <span className="absolute text-sm right-1 bottom-2 text-black">
            {message?.length || 0}/500
          </span>
        </div>
        <button
          className="uppercase block w-fit mx-auto bg-[#F7FCFE] text-black px-3 py-1"
          disabled={isLoading}
          type="submit"
        >
          {!isLoading ? "Submit" : "Loading..."}
        </button>
      </form>
    </CustomModal>
  );
};

export default Compose;
