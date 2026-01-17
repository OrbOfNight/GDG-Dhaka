
import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from '@google/genai';
import { GenerateContentResponse } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { startChat } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { UserIcon } from './icons/UserIcon';
import { BotIcon } from './icons/BotIcon';
import { SendIcon } from './icons/SendIcon';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';
import { RefreshIcon } from './icons/RefreshIcon';

const Chatbot: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedMessageIndex, setCopiedMessageIndex] = useState<number | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChat(startChat());
    setHistory([{
        role: 'model',
        text: 'Hello! How can I help you today?'
    }]);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleNewChat = () => {
    setChat(startChat());
    setHistory([{
        role: 'model',
        text: 'Hello! How can I help you today?'
    }]);
    setError(null);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
        setCopiedMessageIndex(index);
        setTimeout(() => setCopiedMessageIndex(null), 2000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chat) return;

    setIsLoading(true);
    setError(null);
    const userMessage: ChatMessage = { role: 'user', text: userInput };
    setHistory(prev => [...prev, userMessage]);
    setUserInput('');

    try {
        const responseStream = await chat.sendMessageStream({ message: userInput });
        
        let modelResponse = '';
        setHistory(prev => [...prev, { role: 'model', text: '' }]);

        for await (const chunk of responseStream) {
            const c = chunk as GenerateContentResponse;
            const chunkText = c.text;
            if(chunkText) {
                modelResponse += chunkText;
                setHistory(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1].text = modelResponse;
                    return newHistory;
                });
            }
        }
    } catch (err) {
      console.error(err);
      setError('Sorry, something went wrong. Please try again.');
      setHistory(prev => prev.slice(0, -1)); // remove user message if error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[60vh]">
      <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-slate-200">Conversation</h3>
          <button
              onClick={handleNewChat}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200"
              aria-label="Start new chat"
          >
              <RefreshIcon className="w-4 h-4" />
              New Chat
          </button>
      </div>

      <div ref={chatContainerRef} className="flex-1 overflow-y-auto pr-4 -mr-4 space-y-6">
        {history.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'model' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                <BotIcon className="w-5 h-5 text-cyan-300" />
              </div>
            )}
            <div className={`relative group max-w-md p-3 rounded-xl ${msg.role === 'user' ? 'bg-cyan-500 text-slate-900 rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
              <div className="prose prose-sm prose-invert max-w-none prose-p:my-0 prose-ul:my-2 prose-ol:my-2 prose-pre:bg-slate-800/50 prose-pre:p-2 prose-pre:rounded-md">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.text || '...'}
                </ReactMarkdown>
              </div>
              {msg.role === 'model' && msg.text && (
                  <button
                      onClick={() => handleCopy(msg.text, index)}
                      className="absolute top-2 right-2 p-1 bg-slate-600/50 rounded-md text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-cyan-400"
                      aria-label="Copy message"
                  >
                      {copiedMessageIndex === index ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
                  </button>
              )}
            </div>
             {msg.role === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-slate-300" />
              </div>
            )}
          </div>
        ))}
        {isLoading && history[history.length -1].role === 'user' && (
             <div className="flex items-start gap-3">
                 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                    <BotIcon className="w-5 h-5 text-cyan-300" />
                </div>
                 <div className="max-w-md p-3 rounded-xl bg-slate-700 text-slate-200 rounded-bl-none">
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-0"></span>
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></span>
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-400"></span>
                    </div>
                </div>
             </div>
        )}
      </div>
      <div className="pt-6 mt-4 border-t border-slate-700">
        {error && <p className="text-red-400 text-sm text-center mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors duration-200 disabled:opacity-50"
            disabled={isLoading}
            aria-label="Chat input"
          />
          <button
            type="submit"
            className="p-2 bg-cyan-500 rounded-full text-slate-900 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !userInput.trim()}
            aria-label="Send message"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;