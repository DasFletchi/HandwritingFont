
import React, { useState, useRef } from 'react';
import SettingsPanel from './components/SettingsPanel';
import PreviewPaper from './components/PreviewPaper';
import { Settings } from './types';
import { DEFAULT_SETTINGS } from './constants';

const App: React.FC = () => {
  const [text, setText] = useState<string>("Dearest Friend,\n\nI hope this letter finds you well. I wanted to share some thoughts on how digital technology is changing our personal connections. While we can send a message in seconds, there's something truly special about the weight and feel of a handwritten note.\n\nWarmly,\nA Friend");
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleSettingsChange = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleExport = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 overflow-hidden bg-slate-50">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10 no-print">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">HandText</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-indigo-100 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export to PDF
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Editor & Settings */}
        <div className="w-[420px] flex flex-col border-r border-slate-200 no-print bg-white">
          <div className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto">
            
            {/* Text Editor */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Input Text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-48 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all resize-none shadow-inner"
                placeholder="Type your message here..."
              />
            </div>

            {/* Settings Panel */}
            <div className="flex-1">
               <SettingsPanel settings={settings} onSettingsChange={handleSettingsChange} />
            </div>
          </div>
        </div>

        {/* Right Side: Visual Preview */}
        <div className="flex-1 flex flex-col bg-slate-100 overflow-hidden">
           <PreviewPaper text={text} settings={settings} previewRef={previewRef} />
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="bg-white border-t border-slate-200 px-6 py-2.5 flex items-center justify-between text-[11px] font-medium text-slate-400 no-print">
        <div className="flex gap-4">
          <span>Characters: {text.length}</span>
          <span>Words: {text.split(/\s+/).filter(w => w.length > 0).length}</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Live Preview
          </span>
          <span className="w-px h-3 bg-slate-200" />
          <span>&copy; 2024 HandText</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
