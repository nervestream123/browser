import { useRef, useState, useEffect } from 'react';
import './App.css'


function App() {
  const webviewRef = useRef(null);
  const [inputUrl, setInputUrl] = useState('https://example.com');
  const [webviewUrl, setWebviewUrl] = useState('https://example.com');

  const loadURL = () => {
    const formatted = /^https?:\/\//.test(inputUrl) ? inputUrl : `http://${inputUrl}`;
    setWebviewUrl(formatted);
  };

  useEffect(() => {
    const webview = webviewRef.current;
    if (webview) {
      webview.addEventListener('dom-ready', () => {
        webview.openDevTools();
      });
    }
    // Load initial URL
    setWebviewUrl(inputUrl);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen">
      {/* Webview */}
      <div className="flex-1 relative">
        <webview
          ref={webviewRef}
          src={webviewUrl}
          style={{ width: '100%', height: '100%' }}
          allowpopups="true"
          webpreferences="nativeWindowOpen=true"
        />
        {/* Example overlay */}
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded shadow z-10">
          <input
            className="flex-1 p-1 rounded text-black"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadURL()}
          />
        </div>
      </div>
    </div>
  )
}

export default App
