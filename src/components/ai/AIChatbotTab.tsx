import React from 'react';
import { MessageSquare, Send } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

interface AIChatbotTabProps {
  suggestedQuestions: string[];
  handleChatQuestionClick: (q: string) => void;
  chatMessages: ChatMessage[];
  chatInput: string;
  setChatInput: (val: string) => void;
  handleSendChatInput: (e: React.FormEvent) => void;
}

export const AIChatbotTab: React.FC<AIChatbotTabProps> = ({
  suggestedQuestions,
  handleChatQuestionClick,
  chatMessages,
  chatInput,
  setChatInput,
  handleSendChatInput
}) => {
  return (
    <div className="space-y-6 text-right">
      <div className="bg-slate-800/50 p-4 sm:p-6 rounded-2xl border border-slate-700/50 flex flex-col h-[520px]">
        <div className="flex justify-between items-center pb-3 border-b border-slate-700/60 mb-4">
          <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold py-1 px-2 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>آن لائن (AI Live Response)</span>
          </span>
          
          <div className="text-right">
            <h3 className="text-xs sm:text-sm font-bold text-white flex items-center justify-end gap-1.5">
              <span>قریشی اے آئی لاٹری ایکسپرٹ</span>
              <MessageSquare className="w-4 h-4 text-amber-500" />
            </h3>
            <p className="text-[10px] text-slate-400">ریئل ٹائم تجزیاتی بوٹ برائے امکانی فارمولا جات</p>
          </div>
        </div>

        <div className="mb-4 text-right">
          <span className="text-[10px] text-slate-400 block mb-2">فوری مدد کے لیے سوال دبائیں (Quick Questions):</span>
          <div className="flex flex-row-reverse flex-wrap gap-1.5">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleChatQuestionClick(q)}
                className="bg-slate-900 hover:bg-slate-950 text-slate-300 hover:text-white border border-slate-800 py-1.5 px-3 rounded-lg text-[10px] transition-all cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 p-2 bg-slate-950/60 rounded-xl border border-slate-850 shadow-inner mb-4 flex flex-col-reverse">
          <div className="space-y-4">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === 'user' ? 'mr-auto items-start' : 'ml-auto items-end'
                }`}
              >
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed text-right ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 rounded-tl-none font-bold'
                      : 'bg-slate-800 text-slate-200 rounded-tr-none border border-slate-700/50'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 font-mono">{msg.time}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSendChatInput} className="flex gap-2">
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 rounded-xl flex items-center justify-center cursor-pointer active:translate-y-0.5 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="اے آئی سے لاٹری لیمٹ یا فارمولا کے بارے میں سوال پوچھیں..."
            className="flex-1 bg-slate-950 text-xs text-white border border-slate-800 rounded-xl p-3 text-right outline-none focus:border-amber-500/50"
          />
        </form>
      </div>
    </div>
  );
};
