
import React from 'react';
import type { FilterResult as FilterResultType } from '../types';
import { SpamIcon } from './icons/SpamIcon';
import { InboxIcon } from './icons/InboxIcon';
import { ImportantIcon } from './icons/ImportantIcon';

interface FilterResultProps {
  result: FilterResultType;
  onTryAgain: () => void;
}

const classificationConfig = {
  'Spam': {
    icon: SpamIcon,
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-400',
    ringColor: 'ring-red-500/30',
  },
  'Not Spam': {
    icon: InboxIcon,
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-400',
    ringColor: 'ring-green-500/30',
  },
  'Important': {
    icon: ImportantIcon,
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-400',
    ringColor: 'ring-yellow-500/30',
  }
};


const FilterResult: React.FC<FilterResultProps> = ({ result, onTryAgain }) => {
  const config = classificationConfig[result.classification];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center text-center animate-fade-in">
      <div className={`p-6 rounded-full ${config.bgColor} ring-4 ${config.ringColor} mb-6`}>
         <Icon className={`w-16 h-16 ${config.textColor}`} />
      </div>
      <h2 className={`text-4xl font-bold mb-3 ${config.textColor}`}>
        {result.classification}
      </h2>
      <p className="text-slate-300 text-lg mb-8 max-w-prose">
        <span className="font-semibold text-slate-100">Reason:</span> {result.reason}
      </p>

      <button
        onClick={onTryAgain}
        className="px-8 py-3 bg-slate-600 text-slate-100 font-semibold rounded-lg hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-400 transition-colors duration-200"
      >
        Analyze Another Email
      </button>
    </div>
  );
};

export default FilterResult;
