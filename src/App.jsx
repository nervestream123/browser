import { useEffect, useRef } from 'react';
import { Flex } from '@radix-ui/themes'
import './App.css'
import Tokens from './components/Tokens';

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    const resize = () => {
      const height = containerRef.current?.scrollHeight ?? 0;
      window.electronAPI?.setHeight(height + 30 + 2);
    };

    // Initial resize
    resize();

    // Observe DOM changes
    const observer = new ResizeObserver(resize);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Cleanup
    return () => observer.disconnect();
  }, []);

  return (
    <Flex className="mx-[10px]" direction="column" align="center" ref={containerRef}>
      <Tokens></Tokens>
    </Flex>
  )
}

export default App
