import { useEffect } from "react";
import "./App.css";
import { issueSessionToken } from "./service";

function App() {
  const userId = 7123232;
  const script = (token) => {
    (function (w, d, s, ...args) {
      const div = d.createElement("div");
      div.id = "aichatbot";
      d.body.appendChild(div);

      w.chatbotConfig = args;
      const f = d.getElementsByTagName(s)[0],
        j = d.createElement(s);
      j.defer = true;
      j.type = "module";
      j.src = "https://aichatbot.sendbird.com/index.js";
      f.parentNode.insertBefore(j, f);
    })(
      window,
      document,
      "script",
      process.env.REACT_APP_APP_ID,
      process.env.REACT_APP_BOT_ID,
      {
        userId,
        sessionToken: token,
        configureSession: () => ({
          onSessionTokenRequired: (resolve, reject) => {
            // Action to take when a session token is required
            issueSessionToken(userId).then(resolve).catch(reject);
          },
          onSessionRefreshed: () => {
            // Action to take when session is refreshed
            console.log("Session refreshed");
          },
          onSessionError: (err) => {
            // Action to take when session encounters an error
            console.error("Session error", err);
          },
          onSessionClosed: () => {
            // Action to take when session is closed
            console.log("Session closed");
          },
        }),
      }
    );
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await issueSessionToken(userId);

      script(token);
    };

    fetchToken();
  }, []);

  return <div className="App">here</div>;
}

export default App;
