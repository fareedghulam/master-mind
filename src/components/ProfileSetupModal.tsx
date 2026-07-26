import React, { useState } from 'react';
import { User, Phone, MapPin, User as UserIcon, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { User as UserType } from '../types';

interface ProfileSetupModalProps {
  user: UserType;
  isOpen: boolean;
  isMandatory?: boolean;
  onSave: (name: string, phone: string, city: string) => Promise<{ success: boolean; message: string }>;
  onClose?: () => void;
}

export default function ProfileSetupModal({
  user,
  isOpen,
  isMandatory = false,
  onSave,
  onClose
}: ProfileSetupModalProps) {
  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [city, setCity] = useState(user.city || '');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!name.trim()) {
      setMessage({ type: 'error', text: 'براہ کرم اپنا پورا نام درج کریں۔' });
      return;
    }
    if (!phone.trim()) {
      setMessage({ type: 'error', text: 'براہ کرم اپنا موبائل نمبر درج کریں۔' });
      return;
    }
    if (!city.trim()) {
      setMessage({ type: 'error', text: 'براہ کرم اپنے شہر کا نام درج کریں۔' });
      return;
    }

    setIsLoading(true);
    try {
      const res = await onSave(name.trim(), phone.trim(), city.trim());
      if (res.success) {
        setMessage({ type: 'success', text: res.message || 'پروفائل کامیابی سے محفوظ ہو گئی ہے!' });
        setTimeout(() => {
          if (onClose) onClose();
        }, 1200);
      } else {
        setMessage({ type: 'error', text: res.message || 'پروفائل کی معلومات اپ ڈیٹ کرنے میں غلطی پیش آئی۔' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err?.message || 'ایک غیر متوقع غلطی پیش آئی۔' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-right font-sans animate-in fade-in zoom-in duration-200">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 p-6 text-white relative">
          {!isMandatory && onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 left-4 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center justify-end gap-3 mb-2">
            <div>
              <h3 className="text-xl font-bold font-sans">
                {isMandatory ? 'پروفائل سیٹ اپ (Profile Setup)' : 'پروفائل تبدیل کریں'}
              </h3>
              <p className="text-xs text-blue-200/80 font-sans mt-0.5">
                {isMandatory 
                  ? 'برائے کرم آگے بڑھنے سے پہلے اپنی معلومات مکمل کریں' 
                  : 'اپنی بنیادی معلومات اپ ڈیٹ کریں'}
              </p>
            </div>
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-12 h-12 rounded-full border-2 border-amber-400 object-cover shadow-md"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-white">
                <UserIcon className="w-6 h-6" />
              </div>
            )}
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`p-4 mx-6 mt-4 rounded-xl flex items-start gap-3 ${
            message.type === 'success' 
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}
            <p className="text-xs leading-relaxed font-semibold">{message.text}</p>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Read-only email */}
          <div>
            <label className="block text-slate-600 text-xs font-bold mb-1">
              ای میل (غیر قابل تبدیلی)
            </label>
            <input
              type="text"
              value={user.email}
              disabled
              className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-500 font-mono text-left cursor-not-allowed"
            />
          </div>

          {/* Read-only UID */}
          {user.uid && (
            <div>
              <label className="block text-slate-600 text-xs font-bold mb-1">
                یوزر ID (UID)
              </label>
              <input
                type="text"
                value={user.uid}
                disabled
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-500 font-mono text-left cursor-not-allowed"
              />
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-slate-800 text-xs font-bold mb-1">
              مکمل نام (Full Name) *
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اپنا پورا نام درج کریں"
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-900 text-right pr-10 focus:outline-none transition-all"
                required
              />
              <UserIcon className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-slate-800 text-xs font-bold mb-1">
              موبائل نمبر (Mobile Number) *
            </label>
            <div className="relative">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="03001234567"
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-900 text-right pr-10 focus:outline-none transition-all"
                required
              />
              <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-slate-800 text-xs font-bold mb-1">
              شہر (City) *
            </label>
            <div className="relative">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="اپنا شہر درج کریں"
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-900 text-right pr-10 focus:outline-none transition-all"
                required
              />
              <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end gap-3">
            {!isMandatory && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
              >
                منسوخ کریں
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-blue-500/20 text-xs transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span>محفوظ ہو رہا ہے...</span>
              ) : (
                <span>معلومات محفوظ کریں (Save Profile)</span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
