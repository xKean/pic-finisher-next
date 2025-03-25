import { Undo2, Redo2 } from "lucide-react";
import { Style } from "../types/prompts";

interface ToolbarProps {
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onSave: () => void;
  canUndo: boolean;
  canRedo: boolean;
  selectedStyle: Style;
  onStyleChange: (style: Style) => void;
}

export function Toolbar({
  onUndo,
  onRedo,
  onClear,
  onSave,
  canUndo,
  canRedo,
  selectedStyle,
  onStyleChange,
}: ToolbarProps) {
  const styles: Style[] = [
    "Sci-Fi",
    "Fantasy",
    "Zeichnung",
    "Comic",
    "Realistisch",
  ];

  return (
    <div className="flex items-center justify-between w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
      <div className="flex gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="p-2 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
          title="Rückgängig"
        >
          <Undo2 className="w-6 h-6" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="p-2 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
          title="Wiederholen"
        >
          <Redo2 className="w-6 h-6" />
        </button>
        <button
          onClick={onClear}
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
        >
          Löschen
        </button>
      </div>

      <div className="flex items-center gap-4">
        <label
          htmlFor="style-select"
          className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap"
        >
          Stil:
        </label>
        <select
          id="style-select"
          value={selectedStyle}
          onChange={(e) => onStyleChange(e.target.value as Style)}
          className="w-48 h-10 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white sm:text-sm"
        >
          {styles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
        <button
          onClick={onSave}
          className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
        >
          Fertig
        </button>
      </div>
    </div>
  );
}
