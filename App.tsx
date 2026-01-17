
import React, { useState } from 'react';
import { ShieldIcon } from './components/icons/ShieldIcon';
import { ChatIcon } from './components/icons/ChatIcon';
import EmailFilter from './components/EmailFilter';
import Chatbot from './components/Chatbot';

type Tab = 'filter' | 'chat';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('filter');

  const tabStyles = {
    active: 'bg-slate-700 text-cyan-400 border-b-2 border-cyan-400',
    inactive: 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <ShieldIcon className="h-10 w-10 text-cyan-400" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              AI Agent
            </h1>
            <ChatIcon className="h-10 w-10 text-blue-500" />
          </div>
          <p className="text-slate-400 text-lg">
            Filter emails and chat with an intelligent assistant.
          </p>
        </header>

        <main className="bg-slate-800/50 rounded-2xl shadow-2xl shadow-slate-950/50 ring-1 ring-slate-700 backdrop-blur-sm">
          <div className="border-b border-slate-700">
            <nav className="-mb-px flex space-x-2 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('filter')}
                className={`flex items-center gap-2 whitespace-nowrap py-4 px-3 font-medium text-sm transition-colors duration-200 ${activeTab === 'filter' ? tabStyles.active : tabStyles.inactive}`}
              >
                <ShieldIcon className="h-5 w-5" />
                Email Filter
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center gap-2 whitespace-nowrap py-4 px-3 font-medium text-sm transition-colors duration-200 ${activeTab === 'chat' ? tabStyles.active : tabStyles.inactive}`}
              >
                <ChatIcon className="h-5 w-5" />
                Chatbot
              </button>
            </nav>
          </div>
          <div className="p-6 sm:p-8">
            {activeTab === 'filter' && <EmailFilter />}
            {activeTab === 'chat' && <Chatbot />}
          </div>
        </main>
        
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Powered by Google Gemini API</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
