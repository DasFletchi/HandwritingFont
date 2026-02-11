
import React, { useState, useRef, useCallback } from 'react';
import SettingsPanel from './components/SettingsPanel';
import PreviewPaper from './components/PreviewPaper';
import { Settings, PaperType } from './types';
import { DEFAULT_SETTINGS } from './constants';
import { generateCreativeDraft } from './services/geminiService';

const App: React.FC = () => {
  const [text, setText] = useState<string>("Dearest Friend,\n\nI hope this letter finds you well. I wanted to share some thoughts on how digital technology is changing our personal connections. While we can send a message in seconds, there's something truly special about the weight and feel of a handwritten note.\n\nWarmly,\nYour AI Companion");
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  const handleSettingsChange = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleExport = () => {
    window.print();
  };

  const handleAiDraft = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    const draft = await generateCreativeDraft(aiPrompt);
    setText(draft);
    setIsGenerating(false);
    setAiPrompt("");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 overflow-hidden">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10 no-print">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">HandText AI</h1>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Reality in every stroke</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export to PDF / Print
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Editor & Settings */}
        <div className="w-[450px] flex flex-col border-r border-slate-200 no-print bg-slate-50">
          <div className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto">
            {/* AI Generator Box */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 text-white shadow-md">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.657 15.657a1 1 0 001.414-1.414l-.707-.707a1 1 0 10-1.414 1.414l.707.707zM6.343 15.657L5.636 14.95a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414z" /></svg>
                AI Creative Assistant
              </h3>
              <div className="relative">
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Ask AI to write a thank you note, a formal letter, or a birthday card..."
                  className="w-full h-24 bg-white/10 border border-white/20 rounded-lg p-3 text-sm placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all text-white resize-none"
                />
                <button
                  onClick={handleAiDraft}
                  disabled={isGenerating || !aiPrompt.trim()}
                  className="absolute bottom-2 right-2 bg-white text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors disabled:opacity-50"
                >
                  {isGenerating ? "Thinking..." : "Generate Draft"}
                </button>
              </div>
            </div>

            {/* Text Editor */}
            <div className="flex-1 min-h-[300px] flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Text Content</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 w-full bg-white border border-slate-200 rounded-xl p-4 text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none shadow-inner"
                placeholder="Type your message here..."
              />
            </div>

            {/* Settings Components */}
            <SettingsPanel settings={settings} onSettingsChange={handleSettingsChange} />
          </div>
        </div>

        {/* Right Side: Visual Preview */}
        <PreviewPaper text={text} settings={settings} previewRef={previewRef} />
      </main>

      {/* Footer / Status Bar */}
      <footer className="bg-white border-t border-slate-200 px-6 py-2.5 flex items-center justify-between text-[11px] font-medium text-slate-400 no-print">
        <div className="flex gap-4">
          <span>Characters: {text.length}</span>
          <span>Words: {text.split(/\s+/).filter(w => w.length > 0).length}</span>
          <span className="text-green-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Real-time Sync Active
          </span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-500 transition-colors">Documentation</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
          <span>&copy; 2024 HandText AI</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
