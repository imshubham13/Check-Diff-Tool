import { useMemo, useRef, useState } from "react";
import EditorPanel from "./components/EditorPanel";
import DiffViewer from "./components/DiffViewer";
import { detectFormat } from "./utils/detectFormat";

const defaultOriginal = `{
   \\"name\\" : \\"alex\\"
}`;

const defaultModified = `{
  "firstname": "alex"
}`;

function App() {
  const [original, setOriginal] = useState(defaultOriginal);
  const [modified, setModified] = useState(defaultModified);
  const [showDiff, setShowDiff] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const diffSectionRef = useRef<HTMLDivElement | null>(null);

  const format = useMemo(
    () => detectFormat(original || modified),
    [original, modified]
  );

  const editorLanguage = useMemo(() => {
    if (format === "json") return "json";
    if (format === "xml") return "xml";
    if (format === "yaml") return "yaml";
    return "plaintext";
  }, [format]);

  const handleCheckDiff = () => {
    setShowDiff(true);
    window.requestAnimationFrame(() => {
      diffSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div
      className={`min-h-screen w-full overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 transition-colors duration-300 relative dotted-bg ${
        isDark
          ? "dots-dark bg-[radial-gradient(circle_at_top,_#1e293b_0%,_#020617_45%,_#020617_100%)] text-white"
          : "dots-light bg-gradient-to-b from-slate-50 via-slate-100 to-white text-slate-900"
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section
          className={`rounded-2xl border px-5 py-4 shadow-lg backdrop-blur transition-colors duration-300 ${
            isDark
              ? "border-white/10 bg-slate-950/95 shadow-black/20"
              : "border-slate-200 bg-white/95 shadow-slate-300/20"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">Smart Diff Tool</h1>
              <p
                className={`text-xs transition-colors duration-300 ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Compare text, JSON, XML, YAML and code
              </p>
            </div>

            <button
              onClick={toggleTheme}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition hover:opacity-90 ${
                isDark
                  ? "bg-slate-700 text-white hover:bg-slate-600"
                  : "bg-slate-200 text-slate-900 hover:bg-slate-300"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? "🌙" : "☀️"}
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <EditorPanel
            title="Original Text"
            value={original}
            onChange={(value) => {
              setOriginal(value);
              setShowDiff(false);
            }}
            language={editorLanguage}
            isDark={isDark}
          />

          <EditorPanel
            title="Changed Text"
            value={modified}
            onChange={(value) => {
              setModified(value);
              setShowDiff(false);
            }}
            language={editorLanguage}
            isDark={isDark}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={handleCheckDiff}
            className={`rounded-lg px-6 py-2 text-sm font-semibold transition ${
              isDark
                ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                : "bg-cyan-600 text-white hover:bg-cyan-500"
            }`}
          >
            Find Difference
          </button>
        </div>

        <div ref={diffSectionRef} className="scroll-mt-6">
          {showDiff && (
            <DiffViewer
              original={original}
              modified={modified}
              language={editorLanguage}
              isDark={isDark}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;