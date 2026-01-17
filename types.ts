
export interface EmailData {
  from: string;
  subject: string;
  body: string;
}

export type Classification = 'Spam' | 'Not Spam' | 'Important';

export interface FilterResult {
  classification: Classification;
  reason: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
