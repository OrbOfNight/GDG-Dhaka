
import React, { useState, useCallback } from 'react';
import type { FilterResult as FilterResultType } from '../types';
import { EmailData } from '../types';
import { filterEmail } from '../services/geminiService';
import EmailInputForm from './EmailInputForm';
import FilterResult from './FilterResult';
import LoadingSpinner from './LoadingSpinner';

// Helper function to parse EML content
const parseEml = (emlContent: string): Partial<EmailData> => {
    const fromMatch = emlContent.match(/^From:\s*(.*)$/im);
    const subjectMatch = emlContent.match(/^Subject:\s*(.*)$/im);
  
    // Find the body: it's everything after the first blank line
    const bodyIndex = emlContent.search(/\r?\n\r?\n/);
    const body = bodyIndex !== -1 ? emlContent.substring(bodyIndex).trim() : '';
  
    return {
      from: fromMatch ? fromMatch[1].trim() : '',
      subject: subjectMatch ? subjectMatch[1].trim() : '',
      body: body,
    };
};


const EmailFilter: React.FC = () => {
  const [emailData, setEmailData] = useState<EmailData>({
    from: '',
    subject: '',
    body: '',
  });
  const [filterResult, setFilterResult] = useState<FilterResultType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
            const parsedData = parseEml(content);
            setEmailData(prev => ({
                from: parsedData.from || prev.from,
                subject: parsedData.subject || prev.subject,
                body: parsedData.body || prev.body,
            }));
        }
    };
    reader.onerror = () => {
        setError("Failed to read the .eml file.");
    };
    reader.readAsText(file);
    // Reset file input value to allow re-uploading the same file
    e.target.value = '';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailData.from || !emailData.subject || !emailData.body) {
      setError('Please fill in all fields.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setFilterResult(null);

    try {
      const result = await filterEmail(emailData);
      setFilterResult(result);
    } catch (err) {
      setError('Failed to analyze email. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTryAgain = () => {
    setFilterResult(null);
    setError(null);
    setEmailData({ from: '', subject: '', body: '' });
  };

  return (
    <div>
      {!filterResult && !isLoading && (
        <EmailInputForm
          emailData={emailData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onFileChange={handleFileChange}
        />
      )}

      {isLoading && <LoadingSpinner />}
      
      {error && !isLoading && (
         <div className="text-center">
          <p className="text-red-600 bg-red-100 p-4 rounded-lg">{error}</p>
          <button
            onClick={handleTryAgain}
            className="mt-6 px-6 py-2 bg-cyan-500 text-slate-900 font-semibold rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-cyan-400 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      )}

      {filterResult && !isLoading && (
        <FilterResult result={filterResult} onTryAgain={handleTryAgain} />
      )}
    </div>
  );
};

export default EmailFilter;
