type ToolbarProps = {
  format: string;
  onRepair: () => void;
  onBeautify: () => void;
  onMinify: () => void;
  onCopyModified: () => void;
  error: string;
};

const Toolbar = ({
  format,
  onRepair,
  onBeautify,
  onMinify,
  onCopyModified,
  error,
}: ToolbarProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-700 bg-[#111827] px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="rounded-lg bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
          Format: {format.toUpperCase()}
        </span>

        {error && (
          <span className="text-sm text-red-400">
            {error}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={onRepair}
          className="rounded-lg bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600"
        >
          Repair
        </button>

        <button
          onClick={onBeautify}
          className="rounded-lg bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600"
        >
          Beautify
        </button>

        <button
          onClick={onMinify}
          className="rounded-lg bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600"
        >
          Minify
        </button>

        <button
          onClick={onCopyModified}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-500"
        >
          Copy Modified
        </button>
      </div>
    </div>
  );
};

export default Toolbar;