/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import GradientText from "../componenets/GradientText";
import FadeContent from "../componenets/FadeContent";
import { FaArrowAltCircleUp } from "react-icons/fa";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import "../cssFiles/Herosection.css";

export default function Herosection() {
  const [isHeadingVisible, setIsHeadingVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]); // Store chat messages

  // Auto-resize textarea on input
  useEffect(() => {
    const textarea = document.getElementById("user_prompt");
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    textarea.addEventListener("input", adjustHeight);
    return () => {
      textarea.removeEventListener("input", adjustHeight);
    };



  }, []);



  // Function to fetch AI response
  async function GetData(promptText) {
    const API_KEY = "AIzaSyC30kKSbndWDKxRWNt-DfBmkRyukm6-IqI"; // Replace with your API key
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
        }),
      });

      const data = await response.json();

      if (data && data.candidates) {
        return data.candidates[0].content.parts[0].text; // Extract AI response
      } else {
        return "No response from AI.";
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Error fetching AI response.";
    }
  }


const [basket,setBasket]=useState("");


  // Handle user submission
  const handleSubmit = async () => {
    if (!userInput.trim()) return; // Prevent empty submissions

    setIsFadingOut(true); // Fade out heading on first message

    // Add user message to chat
    const newChatMessages = [...chatMessages, { sender: "user", text: userInput }];
    setChatMessages(newChatMessages);
    
    setUserInput(""); // Clear input field

    // Fetch AI response
    const aiResponse = await GetData(userInput);

    // Add AI response to chat
    setChatMessages([...newChatMessages, { sender: "ai", text: aiResponse }]);
    
    setBasket(localStorage.setItem("UserMessage",JSON.stringify(newChatMessages)));

    
  };





  return (
    <>
      <div className="hero-container">
        {isHeadingVisible && (
          <div className={`heading ${isFadingOut ? "fade-out" : ""}`}>
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class"
            >
              How can I Help You !
            </GradientText>
          </div>
        )}

        <div className="conversation-container">
          <div className="chat-container">
            {chatMessages.map((msg, index) => (
              <div key={index} className={msg.sender === "user" ? "user-chat" : "ai-container"}>
                {msg.sender === "ai" && (
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT50Ws1qKIfPup4k31gPRsB965OZSyyHc1tCrmnBxwJTX5N1BkJqtFnIG7R_DzAyv5DWhY&usqp=CAU"
                    alt="AI Avatar"  
                  />
                )}
                <div className="chat-text">{msg.text}</div>
              </div>
            ))}
          </div>

          <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
            <div className="user-container">
              <textarea
                id="user_prompt"
                placeholder="Enter the Prompt"
                rows="1"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <FaArrowAltCircleUp className="icon" onClick={handleSubmit} />
            </div>

            <div className="about">
              <a data-tooltip-id="my-tooltip" data-tooltip-content="Search">
                <Tooltip id="my-tooltip" />
              </a>
              <h4>
                Developed by{" "}
                <a href="https://github.com/DevwithHahsir" target="_blank" rel="noopener noreferrer">
                  Hashir
                </a>{" "}
                || All Rights Reserved
              </h4>
            </div>
          </FadeContent>
        </div>
      </div>
    </>
  );
}
