import { motion } from "framer-motion";
import { useGeneratedImageStore } from "../../store/generatedImageStore";
import React from "react";
import { Style } from "../../types/prompts";
import { RefreshCw } from "lucide-react";

interface Word {
  display: string;
  prompt: string;
}

interface ResultSectionProps {
  drawing: string;
  generatedImage: string;
  onStyleChange: (style: Style) => void;
  currentStyle: Style;
  availableStyles: Style[];
  isGenerating: boolean;
  selectedWord: Word;
  onRedraw: () => void;
}

export function ResultSection({
  drawing,
  generatedImage,
  onStyleChange,
  currentStyle,
  availableStyles,
  isGenerating,
  selectedWord,
  onRedraw,
}: ResultSectionProps) {
  const { generatedImage: storedImage, setGeneratedImage } =
    useGeneratedImageStore();
  const drawingSrc = `data:image/png;base64,${drawing}`;
  const generatedSrc = `data:image/png;base64,${storedImage || generatedImage}`;

  // Speichere das generierte Bild im Store
  React.useEffect(() => {
    if (generatedImage) {
      console.log("Storing generated image, length:", generatedImage.length);
      setGeneratedImage(generatedImage);
    }
  }, [generatedImage, setGeneratedImage]);

  // Debug-Ausgaben
  React.useEffect(() => {
    console.log("Drawing length:", drawing?.length);
    console.log("Generated image length:", generatedImage?.length);
    console.log("Stored image length:", storedImage?.length);
  }, [drawing, generatedImage, storedImage]);

  return (
    <section>
      <h2 className="text-4xl font-semibold mb-12 text-center">Ergebnis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-medium mb-4 text-center">
            Du hast gemalt: {selectedWord.display}
          </h3>
          <div className="flex justify-center">
            <img
              src={drawingSrc}
              alt="Gezeichnetes Bild"
              width={512}
              height={512}
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-medium mb-4 text-center">
            KI-generiertes Bild
          </h3>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={generatedSrc}
                alt="KI-generiertes Bild"
                width={512}
                height={512}
                className="max-w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  console.error("Error loading generated image:", e);
                  const imgElement = e.target as HTMLImageElement;
                  console.log("Failed src:", imgElement.src);
                }}
              />
              {isGenerating && (
                <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-white/10 dark:bg-black/10 rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
                    <p className="mt-4 text-white text-lg">
                      KI generiert dein Bild...
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full max-w-xs mt-4 flex flex-col gap-4">
              <select
                value={currentStyle}
                onChange={(e) => onStyleChange(e.target.value as Style)}
                disabled={isGenerating}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {availableStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>

              <button
                onClick={onRedraw}
                disabled={isGenerating}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontSize: 18 }}
              >
                <RefreshCw className="w-6 h-6" />
                Neu generieren
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="mt-16 text-center">
        <p className="text-xs text-gray-500 break-words">
          {selectedWord.prompt}
        </p>
      </div>
    </section>
  );
}
