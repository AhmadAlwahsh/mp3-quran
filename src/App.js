import React, { useState, useEffect } from "react";
import "./styles/App.css";
import "./styles/progress.css";
import { AudioPlayer } from "./components/AudioPlayer";
import Inputs from "./components/Inputs";
import Logo from "./images/web.png";

function App() {
  const [items, setItems] = useState({});
  const [audioSrc, setAudioSrc] = useState("");

  const fetchItems = async () => {
    const api = await fetch("https://mp3quran.net/api/_arabic.json");
    const data = await api.json();

    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);
  console.log(items.reciters);

  return (
    <>
      <div className="container">
        <div className="overlay"></div>
        <img src={Logo} alt="المكتبة الصوتية" />
        {items.reciters ? (
          <>
            <Inputs reciters={items.reciters} setAudioSrc={setAudioSrc} />
            <AudioPlayer audioSrc={audioSrc} apiState={items.reciters} />
          </>
        ) : null}
      </div>
      <footer>
        <p>
          جميع الحقوق محفوظة ©
          <a href="https://ahmadalwahsh.netlify.app">
            <span>أحمد الوحش</span>
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
