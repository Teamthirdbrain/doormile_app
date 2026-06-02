import { useState } from 'react';
import { Copy, Check, Terminal, FileCode, AppWindow, Command, HelpCircle } from 'lucide-react';
import { FLUTTER_DASHBOARD_CODE, FLUTTER_ANALYTICS_CODE, FLUTTER_SURVEY_CODE } from '../utils/flutterTemplates';

interface FlutterExporterProps {
  activeTab: 'dashboard' | 'clients' | 'analytics' | 'survey';
}

export default function FlutterExporter({ activeTab }: FlutterExporterProps) {
  const [copied, setCopied] = useState(false);
  const [showInstaller, setShowInstaller] = useState(false);

  // Pick dart template text based on the active tab of the preview
  let activeCode = FLUTTER_DASHBOARD_CODE;
  let layoutName = 'main_dashboard.dart';

  if (activeTab === 'analytics') {
    activeCode = FLUTTER_ANALYTICS_CODE;
    layoutName = 'analytics_screen.dart';
  } else if (activeTab === 'survey') {
    activeCode = FLUTTER_SURVEY_CODE;
    layoutName = 'survey_submission_form.dart';
  } else if (activeTab === 'clients') {
    activeCode = FLUTTER_ANALYTICS_CODE; // Fallback to close matching, as clients is detailed
    layoutName = 'clients_crm_database.dart';
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#111c2d] text-slate-100 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-full font-sans" id="flutter-exporter-root">
      {/* Code Header bar */}
      <div className="bg-[#0b1c30] px-4 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-red-500" />
          <div>
            <h3 className="text-xs font-bold text-slate-200">DART/FLUTTER WORKSPACE</h3>
            <p className="text-[10px] text-slate-400 font-mono">{layoutName}</p>
          </div>
        </div>

        {/* Copy Button action elements */}
        <button
          onClick={handleCopyCode}
          className="bg-red-950 hover:bg-red-900 text-red-100 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-red-900/45 transition-colors"
          id="copy-flutter-code-btn"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-300">Copied Dart!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-red-300" />
              <span>Copy Flutter Code</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs list inside export drawer */}
      <div className="px-4 py-2.5 bg-slate-900/60 flex gap-4 text-xs font-semibold border-b border-slate-800/80 shrink-0">
        <button
          onClick={() => setShowInstaller(false)}
          className={`flex items-center gap-1 pb-1 transition-colors relative cursor-pointer ${
            !showInstaller ? 'text-red-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCode className="w-4 h-4" />
          Source Code
          {!showInstaller && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full" />}
        </button>
        <button
          onClick={() => setShowInstaller(true)}
          className={`flex items-center gap-1 pb-1 transition-colors relative cursor-pointer ${
            showInstaller ? 'text-red-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Command className="w-4 h-4" />
          pubspec.yaml
          {showInstaller && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full" />}
        </button>
      </div>

      {/* Active screen content display */}
      <div className="p-4 flex-1 overflow-y-auto font-mono text-xs leading-relaxed space-y-4">
        {!showInstaller ? (
          <div>
            <div className="bg-[#0b1c30]/50 p-2.5 rounded-lg border border-slate-800/80 mb-3 text-slate-300 text-[10px] leading-relaxed flex items-start gap-2">
              <HelpCircle className="w-4.5 h-4.5 text-blue-400 shrink-0 mt-0.5" />
              <p>
                This code exports the **DoorMile {activeTab} Screen** in Flutter. It is styled with precise theme colors and utilizes Google Fonts for clean typography.
              </p>
            </div>
            <pre className="text-slate-200 bg-slate-900/40 p-3 rounded-lg border border-slate-800/50 overflow-x-auto text-[11px] selection:bg-red-950 max-h-[480px]">
              <code>{activeCode}</code>
            </pre>
          </div>
        ) : (
          <div className="space-y-4 text-slate-300">
            <div className="bg-[#0b1c30]/50 p-3 rounded-lg border border-slate-800 space-y-1">
              <h4 className="text-red-400 font-sans font-bold text-xs uppercase tracking-wider">
                FLUTTER CONFIGURATION GUIDE
              </h4>
              <p className="text-[11px]">
                Add these declarations to your Flutter project's `pubspec.yaml` to enable Google Fonts and smooth scrolling layouts:
              </p>
            </div>

            <pre className="bg-slate-950 p-4 rounded-lg text-slate-200 border border-slate-800 text-[11px]">
              {`dependencies:
  flutter:
    sdk: flutter

  # Fonts and symbols
  google_fonts: ^5.1.0
  cupertino_icons: ^1.0.5

  # Charts if loading analytics modules
  fl_chart: ^0.65.0`}
            </pre>

            <div className="bg-slate-900/40 p-3.5 rounded-lg border border-slate-800/50 space-y-2 text-[11px] leading-relaxed">
              <div className="font-sans font-bold text-slate-200 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-slate-400" />
                <span>SHELL INSTRUCTIONS</span>
              </div>
              <p>Run this command inside your flutter directory root to add packages:</p>
              <pre className="bg-slate-950/80 p-2.5 rounded-md text-red-300 font-mono text-xs">
                {`flutter pub get`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
