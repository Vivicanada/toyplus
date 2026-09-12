"use client";

import React from "react";
import { Package, Star, Gift, Sparkles, Heart } from "lucide-react";
import { ageRanges, AgeRange } from "@/data/mockData";

interface HeroBannerProps {
  selectedAgeRange: AgeRange | null;
  onAgeRangeChange: (ageRange: AgeRange | null) => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  selectedAgeRange,
  onAgeRangeChange,
}) => {
  const steps = [
    {
      icon: Package,
      emoji: "📦",
      title: "List Idle Toys",
      description: "Share toys your kids have outgrown",
      color: "from-pastel-mint to-pastel-blue",
    },
    {
      icon: Star,
      emoji: "⭐",
      title: "Earn Star Coins",
      description: "Get rewarded for every listing",
      color: "from-pastel-yellow to-pastel-peach",
    },
    {
      icon: Gift,
      emoji: "🎁",
      title: "Claim New Toys",
      description: "Bring joy with exciting finds",
      color: "from-pastel-pink to-pastel-lavender",
    },
  ];

  const ageRangeLabels: Record<AgeRange, string> = {
    "0-2 Years": "👶 Babies",
    "3-5 Years": "🧒 Toddlers",
    "6-8 Years": "👦 Kids",
    "9-12 Years": "🧑 Pre-teens",
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pastel-lavender/20 via-pastel-pink/20 to-pastel-yellow/20">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pastel-yellow/30 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-10 right-20 w-40 h-40 bg-pastel-mint/30 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute top-20 right-1/4 w-24 h-24 bg-pastel-pink/30 rounded-full blur-2xl animate-pulse-soft" />
      
      {/* Floating Stars */}
      <Sparkles className="absolute top-8 right-16 w-6 h-6 text-pastel-yellow-dark/60 animate-float" />
      <Star className="absolute bottom-16 left-24 w-8 h-8 text-pastel-peach/50 animate-float" style={{ animationDelay: "0.5s" }} />
      <Heart className="absolute top-24 left-1/3 w-5 h-5 text-pastel-pink/60 animate-float" style={{ animationDelay: "1s" }} />

      <div className="max-w-7xl mx-auto px-6 py-12 relative">
        {/* Headline */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Give Outgrown Toys a Second Life,
            <br />
            <span className="bg-gradient-to-r from-pastel-yellow-dark to-pastel-peach bg-clip-text text-transparent">
              Bring New Smiles to Kids
            </span>
          </h2>
          <p className="text-lg text-soft-gray max-w-2xl mx-auto">
            Join thousands of families exchanging toys with love. 
            Every toy finds a new home, every child discovers new adventures.
          </p>
        </div>

        {/* 3-Step Loop */}
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-10">
          {steps.map((step, index) => (
            <React.Fragment key={step.title}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center shadow-warm transform hover:scale-110 transition-transform cursor-pointer group`}
                >
                  <span className="text-3xl md:text-4xl group-hover:animate-bounce">
                    {step.emoji}
                  </span>
                </div>
                <h3 className="mt-3 font-semibold text-charcoal text-sm md:text-base">
                  {step.title}
                </h3>
                <p className="text-xs text-soft-gray text-center max-w-[120px]">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="flex items-center">
                  <div className="w-8 md:w-16 h-0.5 bg-gradient-to-r from-pastel-lavender to-pastel-pink" />
                  <span className="text-2xl">→</span>
                  <div className="w-8 md:w-16 h-0.5 bg-gradient-to-r from-pastel-pink to-pastel-lavender" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Age Filter Chips */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="text-sm text-soft-gray mr-2">Quick filter by age:</span>
          <button
            onClick={() => onAgeRangeChange(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedAgeRange === null
                ? "bg-gradient-to-r from-pastel-yellow to-pastel-peach text-charcoal shadow-warm"
                : "bg-white text-soft-gray hover:bg-pastel-lavender/30 shadow-soft"
            }`}
          >
            All Ages
          </button>
          {ageRanges.map((ageRange) => (
            <button
              key={ageRange}
              onClick={() => onAgeRangeChange(ageRange)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedAgeRange === ageRange
                  ? "bg-gradient-to-r from-pastel-yellow to-pastel-peach text-charcoal shadow-warm"
                  : "bg-white text-soft-gray hover:bg-pastel-lavender/30 shadow-soft"
              }`}
            >
              {ageRangeLabels[ageRange]}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
