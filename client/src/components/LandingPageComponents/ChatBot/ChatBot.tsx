import React, { useState } from "react";
import "./ChatBotStyles.scss";

const ChatBot = () => {
  const [chatBotOpened, setChatBotOpened] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    "Hello!",
    "How can I assist you?",
    "Let me know if you have any further questions",
  ]);

  function handleChatButtonClick() {
    setIsOpen(true);
  }

  function handleMinimizeButtonClick() {
    setIsOpen(false);
  }

  function createMessage(message: string, isUser = true) {
    return <div className={isUser ? "sentText" : "botText"}>{message}</div>;
  }

  function chatbotResponse() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    const message = messages[randomIndex];
    return createMessage(message, false);
  }

  function handleInputChange(event: any) {
    const value = event.target.value;
    setInputValue(value);
  }

  //   function handleInputKeyPress(event) {
  //     if (event.key === "Enter" && inputValue) {
  //       const message = inputValue;
  //       setInputValue("");
  //       const userMessage = createMessage(message);
  //       setTimeout(() => {
  //         const botMessage = chatbotResponse();
  //         setMessages((prevMessages) => [
  //           ...prevMessages,
  //           userMessage,
  //           botMessage,
  //         ]);
  //       }, 1000);
  //     }
  //   }

  //   function handleSendButtonClick() {
  //     if (inputValue) {
  //       const message = inputValue;
  //       setInputValue("");
  //       const userMessage = createMessage(message);
  //       const botMessage = chatbotResponse();
  //       setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
  //     }
  //   }

  //  const chatButton = document.getElementById("chat-button");
  //  const chatContainer = document.getElementById("chatContainer");
  //  const minimizeButton = document.getElementById("minimize-button");
  //  const chatInput = document.getElementById("chat-input");
  //  const chatMessages = document.getElementById("conversation-group");
  //  const sendButton = document.getElementById("SentButton");

  //  function createMessage(message, isUser = true) {
  //    const newMessage = document.createElement("div");
  //    newMessage.classList.add(isUser ? "sentText" : "botText");
  //    newMessage.textContent = message;
  //    chatMessages.appendChild(newMessage);
  //    return newMessage;
  //  }

  //  function chatbotResponse() {
  //    const messages = [
  //      "Hello!",
  //      "How can I assist you?",
  //      "Let me know if you have any further questions",
  //    ];
  //    const randomIndex = Math.floor(Math.random() * messages.length);
  //    const message = messages[randomIndex];
  //    const botMessage = createMessage(message, false);
  //    botMessage.scrollIntoView();
  //  }

  //  chatInput.addEventListener("input", function (event) {
  //    if (event.target.value) {
  //      sendButton.classList.add("svgsent");
  //    } else {
  //      sendButton.classList.remove("svgsent");
  //    }
  //  });

  //  chatInput.addEventListener("keypress", function (event) {
  //    if (event.keyCode === 13) {
  //      const message = chatInput.value;
  //      chatInput.value = "";
  //      const userMessage = createMessage(message);
  //      userMessage.scrollIntoView();
  //      setTimeout(chatbotResponse, 1000);
  //      sendButton.classList.add("svgsent");
  //    }
  //  });

  //  if (sendButton) {
  //    sendButton.addEventListener("click", function () {
  //      const message = chatInput.value;
  //      chatInput.value = "";
  //      const userMessage = createMessage(message);
  //      userMessage.scrollIntoView();
  //      setTimeout(chatbotResponse, 1000);
  //      sendButton.classList.add("svgsent");
  //    });
  //  }

  return (
    <div className="animate__animated ">
      {/*-Chat Board Start*/}
      <div className="chat-board chatbot chat new trending" />
      <div
        className={`frame-content ${
          isOpen ? "frame-open" : "frame-close"
        }  animate__animated animate__fadeIn`}
      >
        <div
          className={`widget-position-right sidebar-position-right onlyBubble animate__animated animate__fadeIn  ${
            isOpen ? "open" : ""
          }`}
          id="chatContainer"
        >
          <div className="chat no-clip-path chrome moveFromRight-enter-done">
            <div
              className="chat-header project-online"
              style={{
                color: "rgb(255, 255, 255)",
                background:
                  "linear-gradient(135deg, rgb(42, 39, 218) 0%, rgb(0, 204, 255) 100%)",
              }}
            >
              <h2 className="oneline">
                <span>Hi there!</span>
              </h2>
              <button
                className="material-icons exit-chat ripple tidio-1s5t5ku"
                id="minimize-button"
                type="button"
                aria-label="Minimize"
                style={{ color: "rgb(255, 255, 255)" }}
                onClick={handleMinimizeButtonClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height={24}
                  viewBox="0 0 24 24"
                  width={24}
                  id="ic-minimize"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
                </svg>
                <span>Minimize</span>
              </button>
              <div
                className="offline-message"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(42, 39, 218, 0.72) 0%, rgba(0, 204, 255, 0.72) 100%)",
                }}
              >
                <span className="online">
                  <span>We are online</span>
                </span>
              </div>
            </div>
            <div id="conversation-group" role="log">
              <div
                id="messages"
                aria-live="polite"
                aria-atomic="false"
                data-testid="messagesLog"
              >
                <div className="message message-operator  ">
                  <span className="message-content">Hi</span>
                </div>
                <div className="message message-operator bots-quick-replies">
                  <div className="button-wrapper"></div>
                </div>
              </div>
              <div id="conversation-scroll">
                <div style={{ top: 0, height: "55.8952px" }} />
              </div>
            </div>
            <div className="input-group ">
              <hr />
              <div className="drag-active-wrapper footer-input-wrapper">
                <textarea
                  id="chat-input"
                  rows={1}
                  placeholder="Hit the buttons to respond"
                  aria-label="New message"
                  data-testid="newMessageTextarea"
                  defaultValue={""}
                />
                <button
                  id="SentButton"
                  className="send-icon"
                  title="SentButton"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    xmlSpace="preserve"
                  >
                    <path
                      fill="#d7d7d7"
                      d="M22,11.7V12h-0.1c-0.1,1-17.7,9.5-18.8,9.1c-1.1-0.4,2.4-6.7,3-7.5C6.8,12.9,17.1,12,17.1,12H17c0,0,0-0.2,0-0.2c0,0,0,0,0,0c0-0.4-10.2-1-10.8-1.7c-0.6-0.7-4-7.1-3-7.5C4.3,2.1,22,10.5,22,11.7z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          id="chat-button"
          data-testid="widgetButton"
          className={`chat-closed mobile-size__medium ${
            isOpen ? "clicked" : ""
          }`}
          onClick={handleChatButtonClick}
        >
          <div className="buttonWave" />
          <button
            type="button"
            id="button-body"
            data-testid="widgetButtonBody"
            className="chrome"
            tabIndex={0}
            aria-label="Open chat widget"
            style={{
              background:
                "linear-gradient(135deg, rgb(42, 39, 218), rgb(0, 204, 255))",
              boxShadow: "rgba(0, 77, 255, 0.5) 0px 4px 24px",
            }}
          >
            <i
              className="material-icons type1 for-closed active"
              style={{ color: "rgb(255, 255, 255)" }}
            >
              <svg
                id="ic_bubble"
                fill="#FFFFFF"
                height={24}
                viewBox="0 0 24 24"
                width={24}
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </i>
          </button>
        </div>
      </div>
      {/*-Chat Board End*/}
    </div>
  );
};

export default ChatBot;
