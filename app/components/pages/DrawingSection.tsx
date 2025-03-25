import { DrawingCanvas } from "@/app/components/DrawingCanvas";
import { Style, Background } from "@/app/types/prompts";

interface DrawingSectionProps {
  selectedWord: string;
  selectedStyle: Style;
  selectedBackground: Background;
  onStyleChange: (style: Style) => void;
  onBackgroundChange: (background: Background) => void;
  onDrawingComplete: (base64Image: string) => void;
}

export function DrawingSection({
  selectedWord,
  selectedStyle,
  selectedBackground,
  onStyleChange,
  onBackgroundChange,
  onDrawingComplete,
}: DrawingSectionProps) {
  return (
    <section className="min-h-[calc(100vh-12rem)]">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-4xl font-semibold mb-8 text-center">
          Zeichne: {selectedWord}
        </h2>

        <div className="w-full max-w-2xl mx-auto">
          <DrawingCanvas
            onDrawingComplete={onDrawingComplete}
            selectedStyle={selectedStyle}
            selectedBackground={selectedBackground}
            onStyleChange={onStyleChange}
            onBackgroundChange={onBackgroundChange}
          />
        </div>
      </div>
    </section>
  );
}
