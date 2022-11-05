import React, { useEffect } from "react";
import Weather from "./components/Weather.js";
import Todo from "./components/Todo.js";
import Spotlight from "./components/Spotlight.js";
import Credit from "./components/Credit.js";
import Quote from "./components/Quote.js";
import Image from "./components/Image.js";
import Settings from "./components/Settings.js";
import { isFreshDay } from "./utils/helpers.js";
import { useSettings } from './stores/useSettings'
import "./scss/style.scss";

function App() {
  const settings = useSettings((state) => state.config)
  useEffect(() => {
    isFreshDay();
  }, []);
  return (
    <div className="App" data-theme={settings.theme}>
      {settings.theme === "background" && <Image />}
      <main className="app-shell has-scroll">
        <div className="app-primary">
          <div className={`app-primary__wrap ${!settings.components["date"] ? 'app-primary__wrap--no-spotlight': ''}`}>
            {settings.components["date"] && <Spotlight settings={settings} />}

            <footer className="footer">
              <div className="footer__inner">
              {settings.components["quote"] && <Quote /> }
              {settings.theme === "background" && <Credit /> }
              </div>
            </footer>
          </div>
        </div>
        {(settings.components["weather"] || settings.components["todo"]) && (
          <div className="app-secondary">
            <div className="app-secondary__wrap has-scroll">
              {settings.components["weather"] && <Weather />}
              {settings.components["todo"] && <Todo />}
            </div>
          </div>
        )}

        <Settings />
      </main>
    </div>
  );
}

export default App;
