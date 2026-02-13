import Link from "next/link";
import { Heart, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4 py-12">
      <div className="w-full max-w-4xl text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Support for her, <br />
          <span className="text-primary-foreground/70">awareness for family.</span>
        </h1>
        <p className="mb-12 text-lg text-muted-foreground sm:text-xl">
          Bridging the gap in postpartum care with 24/7 AI-powered support.
        </p>

        <div className="grid gap-8 sm:grid-cols-2">
          {/* Mother Mode Card */}
          <Link
            href="/mother"
            className="group relative overflow-hidden rounded-3xl border bg-card p-8 transition-all hover:shadow-xl hover:shadow-primary/10 active:scale-[0.98]"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <Heart className="h-8 w-8" />
            </div>
            <h2 className="mb-3 text-2xl font-bold">Mother Mode</h2>
            <p className="text-muted-foreground">
              Track your mood, physical recovery, and talk to your 3AM AI companion.
            </p>
            <div className="absolute bottom-0 left-0 h-1 w-full scale-x-0 bg-primary transition-transform group-hover:scale-x-100" />
          </Link>

          {/* Family Mode Card */}
          <Link
            href="/family"
            className="group relative overflow-hidden rounded-3xl border bg-card p-8 transition-all hover:shadow-xl hover:shadow-secondary/10 active:scale-[0.98]"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-transform group-hover:scale-110">
              <Users className="h-8 w-8" />
            </div>
            <h2 className="mb-3 text-2xl font-bold">Family Mode</h2>
            <p className="text-muted-foreground">
              Learn how to support her journey, track daily care items, and stay alert to her needs.
            </p>
            <div className="absolute bottom-0 left-0 h-1 w-full scale-x-0 bg-secondary transition-transform group-hover:scale-x-100" />
          </Link>
        </div>

        <div className="mt-16 rounded-full bg-white/50 px-6 py-2 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm">
          ✨ Powered by Gemini 2.5 Flash
        </div>
      </div>
    </div>
  );
}
