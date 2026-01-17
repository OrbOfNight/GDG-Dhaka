
import React, { useState, useCallback } from 'react';
import type { FilterResult as FilterResultType } from './types';
import { EmailData } from './types';
import { filterEmail } from './services/geminiService';
import EmailInputForm from './components/EmailInputForm';
import FilterResult from './components/FilterResult';
import LoadingSpinner from './components/LoadingSpinner';
import { ShieldIcon } from './components/icons/ShieldIcon';

const App: React.FC = () => {
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
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <ShieldIcon className="h-10 w-10 text-cyan-400" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              AI Email Filtering Agent
            </h1>
          </div>
          <p className="text-slate-400 text-lg">
            Leverage Gemini to classify emails and shield your inbox from spam.
          </p>
        </header>

        <main className="bg-slate-800/50 rounded-2xl shadow-2xl shadow-slate-950/50 ring-1 ring-slate-700 p-6 sm:p-8 backdrop-blur-sm">
          {!filterResult && !isLoading && (
            <EmailInputForm
              emailData={emailData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
            />
          )}

          {isLoading && <LoadingSpinner />}
          
          {error && !isLoading && (
             <div className="text-center">
              <p className="text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</p>
              <button
                onClick={handleTryAgain}
                className="mt-6 px-6 py-2 bg-cyan-500 text-slate-900 font-semibold rounded-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-400 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          )}

          {filterResult && !isLoading && (
            <FilterResult result={filterResult} onTryAgain={handleTryAgain} />
          )}
        </main>
        
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Powered by Google Gemini API</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
