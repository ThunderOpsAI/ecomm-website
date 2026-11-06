import React from "react";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-cream text-text-primary font-sans">
      <div className="max-w-md w-full text-center space-y-6 p-8 sm:p-10 rounded-3xl bg-surface border border-border-subtle shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto text-accent">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <Badge variant="vermilion" size="sm">
            404 • Not Found
          </Badge>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary">
            Off The Edge of The Desk
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            The page or product you are looking for has been moved, archived, or is currently between seasonal runs.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <Link href="/" className="w-full">
            <Button variant="primary" size="md" className="w-full">
              <span>Back to Storefront Home</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link href="/category/japandi" className="w-full">
              <Button variant="outline" size="sm" className="w-full">
                Japandi Mats
              </Button>
            </Link>
            <Link href="/category/anime" className="w-full">
              <Button variant="outline" size="sm" className="w-full">
                Anime Series
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
