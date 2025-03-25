"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { Category } from "../types/prompts";
import { prompts } from "../data/prompts";

interface SlotMachineProps {
  category: Category;
  onComplete: (word: string, category: Category) => void;
  isActive: boolean;
}

export function SlotMachine({
  category,
  onComplete,
  isActive,
}: SlotMachineProps) {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [finalWord, setFinalWord] = useState<string>("");
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const spinSpeedRef = useRef(30);
  const finalWordRef = useRef<string>("");

  // Cleanup-Funktion für Timeouts
  const cleanup = useCallback(() => {
    console.log("Cleaning up timeouts");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  // Slot-Machine-Logik
  const spin = useCallback(() => {
    const categoryData = prompts[category];
    const words = categoryData.words;
    console.log("Spinning with category:", category, "words:", words);
    const randomWord = words[Math.floor(Math.random() * words.length)];
    console.log("Selected random word:", randomWord);
    setCurrentWord(randomWord);

    if (spinSpeedRef.current < 200) {
      console.log("Continuing spin, current speed:", spinSpeedRef.current);
      timeoutRef.current = setTimeout(() => {
        spinSpeedRef.current += 12;
        spin();
      }, spinSpeedRef.current);
    } else {
      // Verwende das letzte zufällig ausgewählte Wort als finales Wort
      console.log("Spin complete, final word:", randomWord);
      finalWordRef.current = randomWord;
      setFinalWord(randomWord);
      setIsSpinning(false);
      setIsComplete(true);

      // Warte kurz, bevor das Wort ausgewählt wird
      timeoutRef.current = setTimeout(() => {
        console.log("Calling onComplete with word:", finalWordRef.current);
        onComplete(finalWordRef.current, category);
      }, 500);
    }
  }, [category, onComplete]);

  // Starte die Animation
  useEffect(() => {
    console.log("SlotMachine effect triggered, isActive:", isActive);
    if (!isActive) {
      console.log("SlotMachine not active, returning");
      return;
    }

    setIsSpinning(true);
    setIsComplete(false);
    spinSpeedRef.current = 50;
    console.log("Starting spin with initial speed:", spinSpeedRef.current);
    spin();

    // Cleanup beim Unmount oder wenn sich die Kategorie ändert
    return cleanup;
  }, [isActive, category, spin, cleanup]);

  // Wenn die Animation abgeschlossen ist, zeige nur das finale Wort
  if (isComplete) {
    console.log("Rendering final word:", finalWord);
    return (
      <div className="h-12 flex items-center justify-center">
        <span className="text-2xl font-semibold">{finalWord}</span>
      </div>
    );
  }

  console.log("Rendering spinning word:", currentWord);
  return (
    <div className="h-12 flex items-center justify-center overflow-hidden">
      <motion.div
        animate={{
          opacity: isSpinning ? [0.3, 1] : 1,
          y: isSpinning ? [-8, 0] : 0,
          scale: isSpinning ? [0.97, 1] : 1,
        }}
        transition={{
          duration: 0.2,
          repeat: isSpinning ? Infinity : 0,
          repeatType: "reverse",
        }}
        className="text-2xl font-semibold"
      >
        {currentWord}
      </motion.div>
    </div>
  );
}
