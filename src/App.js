import React, { useState, useEffect } from 'react';
import './App.css';
import Chat from './components/Chat';
import { ThemeProvider } from './contexts/ThemeContext';
import Sidebar from './components/Sidebar';
import Logo from './components/Logo';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [conversations, setConversations] = useState([
    { id: 1, title: '新对话', timestamp: new Date() }
  ]);
  const [activeConversation, setActiveConversation] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const createNewConversation = () => {
    const newId = conversations.length > 0 ? Math.max(...conversations.map(c => c.id)) + 1 : 1;
    const newConversation = {
      id: newId,
      title: '新对话',
      timestamp: new Date()
    };
    setConversations([...conversations, newConversation]);
    setActiveConversation(newId);
  };

  return (
    <ThemeProvider>
      <div className="App">
        <Sidebar 
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          conversations={conversations}
          activeConversation={activeConversation}
          setActiveConversation={setActiveConversation}
          createNewConversation={createNewConversation}
        />
        <div className="main-content">
          <header className="App-header">
            <div className="header-left">
              {!sidebarOpen && (
                <button className="menu-button" onClick={() => setSidebarOpen(true)}>
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                  </svg>
                </button>
              )}
              <Logo />
            </div>
            <h1>DeepSeek-R1 AI助手</h1>
            <div className="header-actions">
              {/* 这里可以添加其他头部操作按钮 */}
            </div>
          </header>
          <main>
            <Chat conversationId={activeConversation} />
          </main>
          <footer className="App-footer">
            <p>Powered by DeepSeek-R1 · <a href="https://deepseek.com" target="_blank" rel="noopener noreferrer">deepseek.com</a></p>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App; 