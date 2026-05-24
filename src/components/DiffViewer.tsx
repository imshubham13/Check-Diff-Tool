import { DiffEditor } from "@monaco-editor/react";

type DiffViewerProps = {
  original: string;
  modified: string;
  language: string;
  isDark?: boolean;
};

const DiffViewer = ({ original, modified, language, isDark = true }: DiffViewerProps) => {
  return (
    <div
      className={`overflow-hidden rounded-2xl border shadow-xl transition-colors duration-300 ${
        isDark
          ? "border-white/10 bg-slate-950 shadow-black/20"
          : "border-slate-300 bg-white shadow-slate-300/20"
      }`}
    >
      <div
        className={`flex items-center justify-between border-b px-4 py-3 transition-colors duration-300 ${
          isDark ? "border-white/10" : "border-slate-200"
        }`}
      >
        <div className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
          Difference Result
        </div>
        <div
          className={`rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
            isDark
              ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
              : "border-emerald-300/40 bg-emerald-100 text-emerald-700"
          }`}
        >
          Side by side
        </div>
      </div>

      <div style={{ height: "400px", overflow: "hidden", position: "relative" }}>
        <DiffEditor
          language={language}
          original={original}
          modified={modified}
          theme={isDark ? "vs-dark" : "vs-light"}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",
            automaticLayout: true,
            renderSideBySide: true,
            scrollBeyondLastLine: false,
            scrollbar: {
              handleMouseWheel: false,
              alwaysConsumeMouseWheel: false,
            },
            padding: { top: 14, bottom: 14 },
            smoothScrolling: false,
          }}
        />
      </div>
    </div>
  );
};

export default DiffViewer;