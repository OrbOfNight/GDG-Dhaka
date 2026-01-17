
import React from 'react';
import type { EmailData } from '../types';

interface EmailInputFormProps {
  emailData: EmailData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EmailInputForm: React.FC<EmailInputFormProps> = ({ emailData, onInputChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="from" className="block text-sm font-medium text-slate-300">
          From
        </label>
        <input
          type="email"
          name="from"
          id="from"
          value={emailData.from}
          onChange={onInputChange}
          placeholder="sender@example.com"
          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors duration-200"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="block text-sm font-medium text-slate-300">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={emailData.subject}
          onChange={onInputChange}
          placeholder="Urgent: Your account needs attention!"
          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors duration-200"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="body" className="block text-sm font-medium text-slate-300">
          Body
        </label>
        <textarea
          name="body"
          id="body"
          value={emailData.body}
          onChange={onInputChange}
          placeholder="Paste the email body here..."
          rows={8}
          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-slate-100 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors duration-200 resize-y"
          required
        />
      </div>
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 bg-cyan-500 text-slate-900 font-bold text-lg rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-400 transition-all duration-200 transform hover:scale-105"
        >
          Filter Email
        </button>
      </div>
    </form>
  );
};

export default EmailInputForm;
