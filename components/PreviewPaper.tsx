
import React from 'react';
import { Settings, PaperType } from '../types';

interface PreviewPaperProps {
  text: string;
  settings: Settings;
  previewRef: React.RefObject<HTMLDivElement>;
}

const PreviewPaper: React.FC<PreviewPaperProps> = ({ text, settings, previewRef }) => {
  const getPaperClass = () => {
    switch (settings.paperType) {
      case PaperType.LINED:
        return 'lined-paper';
      case PaperType.GRID:
        return 'grid-paper';
      default:
        return '';
    }
  };

  const getOverlayStyle = () => {
    if (settings.paperType === PaperType.VINTAGE) {
      return {
        backgroundBlendMode: 'multiply',
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/parchment.png")',
      };
    }
    return {};
  };

  return (
    <div className="flex-1 flex justify-center bg-slate-100 p-8 overflow-y-auto">
      <div 
        ref={previewRef}
        id="preview-content"
        className={`relative w-full max-w-[800px] min-h-[1056px] shadow-2xl transition-all duration-300 paper-texture ${getPaperClass()}`}
        style={{
          backgroundColor: settings.paperColor,
          padding: `${settings.margin}px`,
          ...getOverlayStyle(),
        }}
      >
        <div 
          className="whitespace-pre-wrap break-words w-full h-full"
          style={{
            fontFamily: settings.fontFamily,
            fontSize: `${settings.fontSize}px`,
            lineHeight: `${settings.lineHeight}`,
            letterSpacing: `${settings.letterSpacing}px`,
            color: settings.color,
            wordSpacing: `${settings.wordSpacing}px`,
          }}
        >
          {text || "Start typing in the editor to see your handwriting here..."}
        </div>

        {/* Marginal Red Line for Notebook feel */}
        {settings.paperType === PaperType.LINED && (
          <div className="absolute left-12 top-0 bottom-0 w-[2px] bg-red-200 opacity-50 no-print" />
        )}
      </div>
    </div>
  );
};

export default PreviewPaper;
