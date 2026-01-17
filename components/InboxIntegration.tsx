
import React, { useState } from 'react';
import { GoogleIcon } from './icons/GoogleIcon';
import { ImportantIcon } from './icons/ImportantIcon';
import { SpamIcon } from './icons/SpamIcon';
import { InboxIcon } from './icons/InboxIcon';

const mockEmails = [
  { id: 1, from: 'Promotions', subject: '🔥 50% Off Everything!', classification: 'Spam' as const },
  { id: 2, from: 'Alice', subject: 'Re: Project Update', classification: 'Important' as const },
  { id: 3, from: 'Newsletter', subject: 'Your Weekly Digest', classification: 'Not Spam' as const },
  { id: 4, from: 'Security Alert', subject: 'New sign-in from another device', classification: 'Important' as const },
  { id: 5, from: 'Unknown Sender', subject: 'You have won a prize!', classification: 'Spam' as const },
];

const classificationConfig = {
  'Spam': { icon: SpamIcon, color: 'text-red-500' },
  'Important': { icon: ImportantIcon, color: 'text-yellow-500' },
  'Not Spam': { icon: InboxIcon, color: 'text-green-500' },
};

const InboxIntegration: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  const ConnectScreen = () => (
    <div className="text-center flex flex-col items-center py-8">
      <h3 className="text-2xl font-bold text-slate-800 mb-2">Connect Your Inbox</h3>
      <p className="text-slate-600 max-w-md mb-8">
        Allow the AI Agent to securely connect to your Google Account to automatically filter and categorize your incoming emails.
      </p>
      <button
        onClick={() => setIsConnected(true)}
        className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
      >
        <GoogleIcon className="w-6 h-6" />
        Connect with Google
      </button>
      <p className="text-xs text-slate-500 mt-4">
        This is a UI demonstration. No data will be accessed.
      </p>
    </div>
  );

  const ConnectedScreen = () => (
    <div>
      <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800">Auto-Filtered Inbox</h3>
        <button
          onClick={() => setIsConnected(false)}
          className="text-sm font-medium text-red-600 hover:text-red-500 transition-colors"
        >
          Disconnect
        </button>
      </div>
      <p className="text-sm text-slate-600 mb-6">
        Showing a mock-up of recently categorized emails. In a real application, this would be your live inbox data.
      </p>
      <ul className="space-y-3">
        {mockEmails.map((email) => {
          const config = classificationConfig[email.classification];
          const Icon = config.icon;
          return (
            <li key={email.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-4">
                <Icon className={`w-5 h-5 ${config.color}`} />
                <div>
                  <p className="font-semibold text-slate-800">{email.from}</p>
                  <p className="text-sm text-slate-600">{email.subject}</p>
                </div>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${config.color} ${config.color.replace('text', 'bg')}/10`}>
                {email.classification}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return isConnected ? <ConnectedScreen /> : <ConnectScreen />;
};

export default InboxIntegration;
