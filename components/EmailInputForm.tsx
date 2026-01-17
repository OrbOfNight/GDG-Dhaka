
import React from 'react';
import type { EmailData } from '../types';
import { UploadIcon } from './icons/UploadIcon';

interface EmailInputFormProps {
  emailData: EmailData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInputForm: React.FC<EmailInputFormProps> = ({ emailData, onInputChange, onSubmit, onFileChange }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="eml-upload"
          className="group w-full flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-cyan-400 hover:bg-slate-50 transition-colors duration-200"
        >
          <UploadIcon className="w-10 h-10 text-slate-400 group-hover:text-cyan-500 mb-2" />
          <p className="font-semibold text-slate-700 group-hover:text-cyan-600">
            Upload .eml File
          </p>
          <p className="text-sm text-slate-500">
            or drag and drop
          </p>
          <input
            id="eml-upload"
            name="eml-upload"
            type="file"
            className="sr-only"
            accept=".eml"
            onChange={onFileChange}
          />
        </label>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-slate-500">OR</span>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="from" className="block text-sm font-medium text-slate-700">
          From
        </label>
        <input
          type="email"
          name="from"
          id="from"
          value={emailData.from}
          onChange={onInputChange}
          placeholder="sender@example.com"
          className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors duration-200"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={emailData.subject}
          onChange={onInputChange}
          placeholder="Urgent: Your account needs attention!"
          className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors duration-200"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="body" className="block text-sm font-medium text-slate-700">
          Body
        </label>
        <textarea
          name="body"
          id="body"
          value={emailData.body}
          onChange={onInputChange}
          placeholder="Paste the email body here..."
          rows={8}
          className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-slate-900 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-colors duration-200 resize-y"
          required
        />
      </div>
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 bg-cyan-500 text-slate-900 font-bold text-lg rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-cyan-400 transition-all duration-200 transform hover:scale-105"
        >
          Filter Email
        </button>
      </div>
    </form>
  );
};

export default EmailInputForm;
