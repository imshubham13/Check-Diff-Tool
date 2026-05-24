import Editor from "@monaco-editor/react";

type EditorPanelProps = {
  title: string;
  value: string;
  onChange: (value: string) => void;
  language: string;
  isDark?: boolean;
};

const EditorPanel = ({ title, value, onChange, language, isDark = true }: EditorPanelProps) => {
  return (
    <div
      className={`flex min-w-0 flex-col overflow-hidden rounded-2xl border shadow-xl transition-colors duration-300 ${
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
        <div className={`text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>{title}</div>
        <div
          className={`rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
            isDark
              ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-200"
              : "border-cyan-300/40 bg-cyan-100 text-cyan-700"
          }`}
        >
          {language}
        </div>
      </div>

      <div style={{ height: "400px", overflow: "hidden", position: "relative" }}>
        <Editor
          language={language}
          value={value}
          theme={isDark ? "vs-dark" : "vs-light"}
          onChange={(newValue) => onChange(newValue || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",
            automaticLayout: true,
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

export default EditorPanel;