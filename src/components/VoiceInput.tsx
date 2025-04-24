
import { useVoice } from "@/contexts/VoiceContext";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Mic, Loader, MicOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function VoiceInput() {
  const { isRecording, transcript, startRecording, stopRecording, isProcessing } = useVoice();
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  // Update the input field when transcript changes
  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRecording) {
      stopRecording();
    } else if (inputValue.trim() !== "") {
      // Manually submit text input
      navigate("/results");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Click the microphone and ask a question..."
            className="w-full bg-white rounded-full px-6 py-3 pr-16 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
            disabled={isRecording || isProcessing}
          />
          <div className="absolute right-2">
            <Button
              type={isRecording ? "submit" : "button"}
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
              size="icon"
              variant="ghost"
              className={`rounded-full ${isRecording ? 'text-red-500' : 'text-brand-purple'}`}
            >
              {isProcessing ? (
                <Loader className="h-6 w-6 animate-spin" />
              ) : isRecording ? (
                <MicOff className="h-6 w-6" />
              ) : (
                <div className="relative">
                  <Mic className="h-6 w-6" />
                  {isRecording && (
                    <div className="absolute inset-0 rounded-full bg-brand-purple opacity-25 animate-pulse-ring"></div>
                  )}
                </div>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
