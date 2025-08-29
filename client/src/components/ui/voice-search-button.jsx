import React, { useState, useRef } from "react";
import { Mic, Square } from "lucide-react";
import { Button } from "./button";

/**
 * VoiceSearchButton
 * Props:
 *   onResult: (transcript: string) => void
 *   className?: string
 *   disabled?: boolean
 */
export default function VoiceSearchButton({ onResult, className = "", disabled = false }) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const isSpeechSupported =
    typeof window !== "undefined" &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  const handleStart = () => {
    if (!isSpeechSupported || listening) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onResult) onResult(transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  const handleStop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  if (!isSpeechSupported) {
    return null; // Or show a tooltip/disabled button
  }

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      aria-label={listening ? "Stop voice input" : "Start voice input"}
      onClick={listening ? handleStop : handleStart}
      className={`ml-1 border border-black bg-white text-black hover:bg-black hover:text-white focus:ring-2 focus:ring-black transition-colors ${listening ? "animate-pulse bg-black text-white" : ""} ${className}`}
      disabled={disabled}
      style={{ minWidth: 36, minHeight: 36 }}
    >
      {listening ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
    </Button>
  );
} 