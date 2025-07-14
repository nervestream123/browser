import { useRef, useState, useEffect } from 'react';
import './App.css'
import { Flex, Box } from '@radix-ui/themes';

function App() {
  const webviewRef = useRef(null);
  const [inputUrl, setInputUrl] = useState('https://google.com');
  const [webviewUrl, setWebviewUrl] = useState('https://google.com');

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

      webview.addEventListener('did-navigate', (event) => {
        setInputUrl(event.url);
      });
      webview.addEventListener('did-navigate-in-page', (event) => {
        setInputUrl(event.url);
      });
    }

    setWebviewUrl(inputUrl);
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

        {/* Navigation */}
        <div className="absolute top-5 left-10 w-[100px] h-10 bg-violet-500/50 rounded z-10">
          <Flex direction="row" className="w-[100%] h-[100%] items-center justify-around!">
            <Box className="w-7 h-7 hover:bg-violet-500/80 rounded cursor-pointer!">
              <Flex direction="column" align="center" className="w-[100%] h-[100%] justify-center!">
                <img src="/left.png" className="w-6 h-6"></img>
              </Flex>
            </Box>
            <Box className="w-7 h-7 hover:bg-violet-500/80 rounded cursor-pointer!">
              <Flex direction="column" align="center" className="w-[100%] h-[100%] justify-center!">
                <img src="/right.png" className="w-6 h-6"></img>
              </Flex>
            </Box>
            <Box className="w-7 h-7 hover:bg-violet-500/80 rounded cursor-pointer!">
              <Flex direction="column" align="center" className="w-[100%] h-[100%] justify-center!">
                <img src="/reload.png" className="w-4 h-4"></img>
              </Flex>
            </Box>
          </Flex>
        </div>

        {/* Address bar */}
        <div className="absolute top-5 left-50 right-50 bg-violet-500/50 rounded z-10">
          <input
            id="address-bar"
            className="flex-1 px-[10px] w-[100%] h-10 rounded text-white text-sm font-medium"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadURL()}
            spellcheck="false"
            autocorrect="off"
            autocapitalize="off"
          />
        </div>

        {/* Window */}
        <div className="absolute top-5 right-10 w-[100px] h-10 bg-violet-500/50 rounded z-10">
          <Flex direction="row" className="w-[100%] h-[100%] items-center justify-around!">
            <Box className="w-7 h-7 hover:bg-violet-500/80 rounded cursor-pointer!">
              <Flex direction="column" align="center" className="w-[100%] h-[100%] justify-end!">
                <img src="/minimize.png" className="w-4 h-4"></img>
              </Flex>
            </Box>
            <Box className="w-7 h-7 hover:bg-violet-500/80 rounded cursor-pointer!">
              <Flex direction="column" align="center" className="w-[100%] h-[100%] justify-center!">
                <img src="/square.png" className="w-4 h-4"></img>
              </Flex>
            </Box>
            <Box className="w-7 h-7 hover:bg-violet-500/80 rounded cursor-pointer!">
              <Flex direction="column" align="center" className="w-[100%] h-[100%] justify-center!">
                <img src="/x.png" className="w-3 h-3"></img>
              </Flex>
            </Box>
          </Flex>
        </div>

      </div>
    </div>
  )
}

export default App
