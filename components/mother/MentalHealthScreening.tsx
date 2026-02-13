"use client";

import { useState } from "react";
import { ClipboardCheck, Sparkles, AlertCircle, ChevronRight, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const questions = [
    "I have been able to laugh and see the bright side of things.",
    "I have looked forward with enjoyment to things.",
    "I have blamed myself unnecessarily when things went wrong.",
    "I have been anxious or worried for very little reason.",
    "I have felt scared or panicky for very little reason.",
    "Things have been getting on top of me.",
];

const answers = [
    "As much as I ever did",
    "Rather less than I used to",
    "Definitely less than I used to",
    "Not at all",
];

export function MentalHealthScreening() {
    const [currentStep, setCurrentStep] = useState(0);
    const [scores, setScores] = useState<number[]>([]);
    const [isComplete, setIsComplete] = useState(false);

    const handleAnswer = (index: number) => {
        const newScores = [...scores, index];
        setScores(newScores);

        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsComplete(true);
            const totalScore = newScores.reduce((a, b) => a + b, 0);
            localStorage.setItem("mental_health_score", totalScore.toString());
        }
    };

    const getResult = () => {
        const total = scores.reduce((a, b) => a + b, 0);
        if (total <= 5) return { text: "Normal – You're doing great! Keep using your support system.", color: "text-green-600", bg: "bg-green-50" };
        if (total <= 10) return { text: "Mild Stress – Consider talking to someone close to you.", color: "text-orange-600", bg: "bg-orange-50" };
        if (total <= 15) return { text: "Needs Emotional Support – We recommend reaching out to a professional.", color: "text-red-500", bg: "bg-red-50" };
        return { text: "Seek Professional Help – Please speak to a doctor soon.", color: "text-red-700", bg: "bg-red-100 font-bold" };
    };

    if (isComplete) {
        const result = getResult();
        return (
            <div className="rounded-3xl border bg-card p-8 shadow-sm text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-2xl font-bold">Your Screening Result</h3>
                <p className={cn("mb-6 rounded-2xl p-6 text-lg", result.bg, result.color)}>
                    {result.text}
                </p>
                <button
                    onClick={() => {
                        setCurrentStep(0);
                        setScores([]);
                        setIsComplete(false);
                    }}
                    className="flex items-center gap-2 mx-auto text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    <RefreshCcw className="h-4 w-4" />
                    Retake Screening
                </button>
            </div>
        );
    }

    return (
        <div className="rounded-3xl border bg-card p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                    <ClipboardCheck className="h-5 w-5 text-indigo-500" />
                    Wellness Check-in
                </h2>
                <span className="text-xs font-medium text-muted-foreground">
                    Step {currentStep + 1} of {questions.length}
                </span>
            </div>

            <div className="mb-8">
                <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            <div className="mb-8 min-h-[80px]">
                <p className="text-xl font-medium leading-tight">
                    "{questions[currentStep]}"
                </p>
            </div>

            <div className="grid gap-3">
                {answers.map((ans, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="flex items-center justify-between rounded-2xl border bg-muted/10 p-4 text-left transition-all hover:border-primary hover:bg-primary/5 active:scale-[0.98] group"
                    >
                        <span className="text-sm font-medium">{ans}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </button>
                ))}
            </div>

            <p className="mt-8 flex items-center gap-2 text-[10px] text-muted-foreground leading-snug">
                <AlertCircle className="h-3 w-3 shrink-0" />
                This is a supportive tool, not a clinical diagnosis. Always consult a healthcare professional.
            </p>
        </div>
    );
}
