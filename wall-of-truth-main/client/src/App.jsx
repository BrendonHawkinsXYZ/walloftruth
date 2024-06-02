import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import io from "socket.io-client";
import Compose from "./components/Compose";
import API from "./api/api";

const socket = io.connect(
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000",
);

const App = () => {
  const [showModal, setShowModal] = useState(true);
  const [messages, setMessages] = useState([]);
  const [messageRec, setMessageRec] = useState(null);

  const getMessages = useCallback(async () => {
    const res = await API.getMessages();
    if (res?.status === 200) {
      setMessages(res?.data?.data);
    }
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data) {
        setMessageRec(data);
      }
    });
  }, [socket]);

  useEffect(() => {
    if (messageRec) {
      setMessages([messageRec, ...messages]);
    }
  }, [messageRec]);

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <div className="max-w-[1360px] h-screen w-full mx-auto p-6 max-md:px-4">
        <div className="border-b-[4px] border-[#F7FCFE] pb-5">
          <h2 className="text-4xl md:text-7xl font-semibold mb-4 text-center">
            WALL OF TRUTH
          </h2>
          <div className="flex items-center justify-center gap-10 font-medium">
            <p
              className="cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              Leave a Message
            </p>
            <a
              href={`${process.env.PUBLIC_URL}/privacy-policy.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="h-[calc(100%_-_104px)] md:h-[calc(100%_-_136px)] pt-4 overflow-y-scroll">
          <div className="w-full flex items-center justify-center flex-col gap-5">
            {messages?.map((itm, idx) => (
              <div
                key={idx}
                className="text-center"
              >
                <span className="font-semibold text-lg">
                  {moment(itm?.createdAt).format("YYYY-MM-DD hh:mm A")}
                </span>
                <p>{itm.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <Compose
          socket={socket}
          setMessages={setMessages}
          onHide={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default App;
