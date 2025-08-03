import React, { useEffect, useRef } from 'react';

// Main App Component
function App() {
  // Use a ref to store the Watson Assistant instance so we can call its methods.
  const watsonInstanceRef = useRef(null);

  // This effect runs once when the component mounts to load the Watson script.
  useEffect(() => {
    // Prevent the script from loading more than once
    if (watsonInstanceRef.current) {
        return;
    }

    window.watsonAssistantChatOptions = {
      integrationID: "ba0ea13f-3096-4ff7-8c91-2b4148b6bf28", // The ID of this integration.
      region: "au-syd", // The region your integration is hosted in.
      serviceInstanceID: "6372a42f-a7a5-40df-9675-631b3c58c3fd", // The ID of your service instance.
      // The onLoad handler is called when the web chat instance is ready.
      onLoad: async (instance) => {
        // Store the instance in our ref
        watsonInstanceRef.current = instance;
        // Render the chat widget
        await instance.render();
      }
    };

    const t = document.createElement('script');
    t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  }, []);

  // This function will be called when the "Start Chatting" button is clicked.
  const handleChatOpen = () => {
    // Check if the watson instance is available before trying to open it.
    if (watsonInstanceRef.current) {
      watsonInstanceRef.current.openWindow();
    }
  };

  return (
    <>
      {/* All the styling is contained within this <style> tag. */}
      <style>
        {`
          /* Import Google Font: Poppins */
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

          /* Root variables for theming */
          :root {
            --primary-bg: #121828;
            --secondary-bg: #1a233a;
            --card-bg: rgba(255, 255, 255, 0.05);
            --card-border: rgba(255, 255, 255, 0.1);
            --primary-text: #e0e0e0;
            --secondary-text: #a0a0c0;
            --accent-color: #7e57c2;
            --accent-hover: #673ab7;
            --shadow-color: rgba(0, 0, 0, 0.2);
          }

          /* Basic Reset and Body Styling */
          body {
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background: var(--primary-bg);
            color: var(--primary-text);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            overflow: hidden;
          }

          /* Background animated shapes */
          body::before, body::after {
            content: '';
            position: absolute;
            border-radius: 50%;
            filter: blur(100px);
            opacity: 0.5;
            z-index: -1;
          }

          body::before {
            width: 300px;
            height: 300px;
            background: linear-gradient(135deg, var(--accent-color), #3f51b5);
            top: 10vh;
            left: 10vw;
            animation: moveShape1 20s infinite alternate;
          }

          body::after {
            width: 250px;
            height: 250px;
            background: linear-gradient(135deg, #4caf50, #2196f3);
            bottom: 10vh;
            right: 10vw;
            animation: moveShape2 25s infinite alternate;
          }

          @keyframes moveShape1 {
            from { transform: translate(0, 0) rotate(0deg); }
            to { transform: translate(100px, 50px) rotate(360deg); }
          }
          
          @keyframes moveShape2 {
            from { transform: translate(0, 0) rotate(0deg); }
            to { transform: translate(-80px, -60px) rotate(-360deg); }
          }

          /* Main App Container */
          .app-container {
            text-align: center;
            padding: 2rem;
            max-width: 600px;
            width: 90%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            z-index: 1;
            animation: fadeIn 1.5s ease-in-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* Header Styling */
          .header {
            font-size: 2.5rem;
            font-weight: 700;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            text-shadow: 0 2px 10px var(--shadow-color);
          }
          
          .header .icon {
            width: 40px;
            height: 40px;
          }

          /* Glassmorphism Card Styling */
          .card-box {
            background: var(--card-bg);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border: 1px solid var(--card-border);
            border-radius: 20px;
            padding: 2.5rem;
            box-shadow: 0 8px 32px 0 var(--shadow-color);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .card-box:hover {
            transform: translateY(-10px);
            box-shadow: 0 16px 40px 0 var(--shadow-color);
          }

          .card-box h2 {
            margin-top: 0;
            font-size: 1.75rem;
            font-weight: 600;
            color: #fff;
          }

          .card-box p {
            font-size: 1rem;
            line-height: 1.6;
            color: var(--secondary-text);
            margin-bottom: 0;
          }
          
          .card-box p:not(:last-child) {
            margin-bottom: 1rem;
          }

          /* Call-to-action Button */
          .cta-button {
            margin-top: 2rem;
            padding: 0.8rem 2rem;
            font-size: 1rem;
            font-weight: 600;
            font-family: 'Poppins', sans-serif;
            color: white;
            background: linear-gradient(135deg, var(--accent-color), #5c6bc0);
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px var(--shadow-color);
          }
          
          .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 7px 20px rgba(126, 87, 194, 0.4);
          }
          
          .cta-button:active {
            transform: translateY(-1px);
          }

          /* Footer Styling */
          .footer {
            margin-top: 2rem;
            font-size: 0.875rem;
            color: var(--secondary-text);
            opacity: 0.7;
          }
        `}
      </style>

      <div className="app-container">
        <div className="header">
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5V19c1.45-1.1 3.55-1.5 5.5-1.5 1.17 0 2.39.15 3.5.5V5m-6.5-2H9C7.9 3 7 3.9 7 5v14c0 1.1.9 2 2 2h5.5c1.95 0 4.05-.4 5.5-1.5V6.5C18.55 4.4 16.45 3 14.5 3zM9 5h5v9.5c-1.38-.65-2.88-.95-4.5-.95C9.37 13.55 9 13.64 9 13.72V5z"></path>
          </svg>
          Welcome to PagePal
        </div>

        <div className="card-box">
          <h2>Discover Your Next Favorite Book</h2>
          <p>
            Talk to our AI chatbot to get book recommendations based on your mood, favorite genre, or curiosity.
          </p>
          <p>
            This is your digital library wingman — stylish, helpful, and powered by magic (a.k.a. AI).
          </p>
          <button className="cta-button" onClick={handleChatOpen}>Start Chatting</button>
        </div>

        <div className="footer">Made with ❤️ by Parth · 2025</div>
      </div>
    </>
  );
}

export default App;
