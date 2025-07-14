import { useRef, useState, useEffect } from 'react';
import './App.css'
import { Flex, Box, Text } from '@radix-ui/themes';

const chatResponse = `GitHub is a web-based platform designed primarily for version control and collaborative software development. At its core, it uses Git, a distributed version control system created by Linus Torvalds, which allows developers to track changes in their code, collaborate with others, and manage multiple versions of their projects efficiently.`

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
            spellCheck="false"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>

        {/* Drag */}
        <img src="/drag.png" id="drag" className="absolute top-5 right-50 w-5 h-5 mt-[10px] mr-[5px] z-20 cursor-pointer!"></img>

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

        {/* Chat */}
        <div id="chat" className="absolute top-30 bottom-20 right-10 w-[300px] rounded z-10">
          <Flex direction="column" className="w-[100%] h-[100%] rounded">
            <Flex className="w-[100%] h-[25px] rounded bg-violet-500/50">
              <Text size="2" weight="bold" align="center" className="w-[100%] pt-[3px]">Chat</Text>
            </Flex>
            <Flex direction="column" className="w-[100%] grow bg-green-500 my-[15px] rounded bg-violet-500/50">
              <Flex direction="row" className="w-[100%] pr-[10px] pt-[15px] justify-end!">
                <Text align="left" className="w-[70%] p-[10px] text-[12px] font-medium bg-white/50 rounded">Can you summarize the info on this website?</Text>
              </Flex>
              <Flex direction="row" className="w-[100%] px-[10px] pt-[15px] justify-start!">
                <Text align="left" className="w-[100%] p-[10px] text-[12px] text-[#3c005e] font-medium bg-white/75 rounded">{chatResponse}</Text>
              </Flex>
            </Flex>
            <Flex className="w-[100%] h-[75px] rounded bg-violet-500/50">
              <textarea id="chat-bar" className="flex-1 px-[10px] py-[5px] mx-[2px] w-[100%] h-[100%] rounded text-white text-[12px] font-medium">Can you help me find a repository that contains the most popular AI/ML libraries?</textarea>
            </Flex>
          </Flex>
        </div>

      </div>
    </div>
  )
}

export default App
