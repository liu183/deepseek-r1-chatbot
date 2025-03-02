import React, { useState, useRef, useEffect, useContext } from 'react';
import './Chat.css';
import { ThemeContext } from '../contexts/ThemeContext';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

function Chat({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { darkMode } = useContext(ThemeContext);
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  const suggestions = [
    "根据凡人修仙传设计一部修仙类的小说",
    "写一篇关于人工智能未来发展的文章",
    "给我讲解量子计算的基本原理",
    "如何学习编程才能事半功倍？"
  ];

  useEffect(() => {
    // 如果有活跃对话的ID变更，可以在这里加载历史信息
    console.log("加载对话ID:", conversationId);
    setMessages([]);
    setShowSuggestions(true);
  }, [conversationId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // 自动聚焦输入框
    inputRef.current?.focus();
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = input.trim() || e.currentTarget.getAttribute('data-text');
    if (!userMessage) return;

    setShowSuggestions(false);
    setMessages(prev => [...prev, { text: userMessage, isUser: true, timestamp: new Date() }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      let aiResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const text = new TextDecoder().decode(value);
        aiResponse += text;
        
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          
          if (lastMessage && !lastMessage.isUser) {
            newMessages[newMessages.length - 1] = { 
              text: aiResponse, 
              isUser: false, 
              timestamp: new Date() 
            };
          } else {
            newMessages.push({ 
              text: aiResponse, 
              isUser: false,
              timestamp: new Date() 
            });
          }
          
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: '抱歉，服务器出现错误，请稍后重试。', 
        isUser: false,
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    handleSubmit({ preventDefault: () => {}, currentTarget: { getAttribute: () => suggestion } });
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.length === 0 && showSuggestions ? (
          <div className="suggestions-container">
            <h2>开始您的对话</h2>
            <p>可以尝试以下问题，或输入您自己的问题：</p>
            <div className="suggestions">
              {suggestions.map((suggestion, index) => (
                <button 
                  key={index} 
                  className="suggestion-button"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.isUser ? 'user' : 'ai'} ${message.isError ? 'error' : ''}`}
            >
              <div className="message-header">
                <div className="message-avatar">
                  {message.isUser ? (
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                    </svg>
                  )}
                </div>
                <div className="message-author">
                  {message.isUser ? '您' : 'DeepSeek AI'}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
              <div className="message-content">
                <Markdown 
                  components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, '')}
                          style={darkMode ? atomDark : prism}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    }
                  }}
                >
                  {message.text}
                </Markdown>
              </div>
              {!message.isUser && (
                <div className="message-actions">
                  <button className="action-button copy-button" title="复制内容" onClick={() => navigator.clipboard.writeText(message.text)}>
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入消息..."
            disabled={isLoading}
          />
          <button type="submit" className={`send-button ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
              </svg>
            )}
          </button>
        </div>
      </form>
      
      <div className="input-suggestions">
        <p>DeepSeek AI 可能会生成不准确的信息，包括关于人物、地点或事实的错误信息。</p>
      </div>
    </div>
  );
}

export default Chat; 