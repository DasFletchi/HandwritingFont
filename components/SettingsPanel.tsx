
import React from 'react';
import { Settings, PaperType } from '../types';
import { HANDWRITING_FONTS, INK_COLORS, PAPER_COLORS } from '../constants';

interface SettingsPanelProps {
  settings: Settings;
  onSettingsChange: (newSettings: Partial<Settings>) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onSettingsChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full overflow-y-auto space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          Handwriting Style
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Font Family</label>
          <select 
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            value={settings.fontFamily}
            onChange={(e) => onSettingsChange({ fontFamily: e.target.value })}
          >
            {HANDWRITING_FONTS.map(font => (
              <option key={font.name} value={font.family} style={{ fontFamily: font.family }}>{font.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          Paper & Ink
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Ink Color</label>
            <div className="flex flex-wrap gap-2">
              {INK_COLORS.map(color => (
                <button
                  key={color.value}
                  onClick={() => onSettingsChange({ color: color.value })}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${settings.color === color.value ? 'border-blue-500 scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Paper Type</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(PaperType).map(type => (
                <button
                  key={type}
                  onClick={() => onSettingsChange({ paperType: type })}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${settings.paperType === type ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Paper Color</label>
            <div className="flex flex-wrap gap-2">
              {PAPER_COLORS.map(color => (
                <button
                  key={color.value}
                  onClick={() => onSettingsChange({ paperColor: color.value })}
                  className={`w-8 h-8 rounded-lg border shadow-sm transition-all ${settings.paperColor === color.value ? 'border-blue-500 scale-110 ring-2 ring-blue-100' : 'border-slate-200'}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
          Geometry & Spacing
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-slate-500">Font Size ({settings.fontSize}px)</label>
            </div>
            <input 
              type="range" min="12" max="64" step="1"
              value={settings.fontSize}
              onChange={(e) => onSettingsChange({ fontSize: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-slate-500">Line Height ({settings.lineHeight})</label>
            </div>
            <input 
              type="range" min="1" max="4" step="0.1"
              value={settings.lineHeight}
              onChange={(e) => onSettingsChange({ lineHeight: parseFloat(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-slate-500">Letter Spacing ({settings.letterSpacing}px)</label>
            </div>
            <input 
              type="range" min="-5" max="20" step="1"
              value={settings.letterSpacing}
              onChange={(e) => onSettingsChange({ letterSpacing: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-slate-500">Margins ({settings.margin}px)</label>
            </div>
            <input 
              type="range" min="0" max="100" step="5"
              value={settings.margin}
              onChange={(e) => onSettingsChange({ margin: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
