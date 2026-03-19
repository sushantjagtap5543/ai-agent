import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Message {
  text: string;
  isUser: boolean;
  type?: 'crew' | 'interpreter';
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I am your AI Agent Orchestrator. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'crew' | 'interpreter'>('crew');
  const [status, setStatus] = useState<{ backend: string; ollama: string; models: any[] }>({ 
    backend: 'checking', 
    ollama: 'checking',
    models: []
  });
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.get('/api/status');
        setStatus({
          backend: response.data.backend,
          ollama: response.data.ollama,
          models: response.data.models || []
        });
      } catch (error) {
        setStatus({ backend: 'offline', ollama: 'offline', models: [] });
      }
    };
    
    checkStatus();
    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const endpoint = mode === 'crew' ? '/api/run-crew' : '/api/run-interpreter';
      const response = await axios.post(endpoint, {
        task: input
      });

      const botMessage: Message = { 
        text: response.data.result, 
        isUser: false,
        type: mode
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling backend:", error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I encountered an error connecting to the AI brain. Make sure the backend and Ollama are running.", 
        isUser: false 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="glass-panel">
        <header className="header">
          <div className="title-group">
            <h1>AI Agent Orchestrator</h1>
            <div className="status-indicators">
              <span className={`status-dot ${status.backend}`}>Backend</span>
              <span className={`status-dot ${status.ollama}`}>Ollama</span>
              {status.models.length > 0 && (
                <span className="model-badge">
                  {status.models[0].name.split(':')[0]}
                </span>
              )}
            </div>
          </div>
          <div className="mode-selector">
            <button 
              className={`mode-btn ${mode === 'crew' ? 'active' : ''}`}
              onClick={() => setMode('crew')}
            >
              CrewAI
            </button>
            <button 
              className={`mode-btn ${mode === 'interpreter' ? 'active' : ''}`}
              onClick={() => setMode('interpreter')}
            >
              Interpreter
            </button>
          </div>
        </header>

        <main className="chat-area">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
              {!msg.isUser && msg.type && (
                <small style={{ display: 'block', opacity: 0.6, marginBottom: '0.4rem', fontSize: '0.7rem', fontWeight: 800 }}>
                  {msg.type.toUpperCase()}
                </small>
              )}
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="message bot loading">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}
          <div ref={chatEndRef} />
        </main>

        <footer className="input-area">
          <input 
            type="text" 
            className="text-input"
            placeholder={`Ask ${mode === 'crew' ? 'the Crew' : 'OpenInterpreter'}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={loading}
          />
          <button 
            className="send-btn"
            onClick={handleSend}
            disabled={loading || !input.trim()}
          >
            {loading ? 'RUNNING...' : 'SEND'}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default App;
