"use client";

import React from "react";
import { Star, MapPin, Truck, Users } from "lucide-react";
import { Toy } from "@/types";

interface ToyCardProps {
  toy: Toy;
  onClick: () => void;
}

const ToyCard: React.FC<ToyCardProps> = ({ toy, onClick }) => {
  const conditionColors: Record<Toy["condition"], string> = {
    "Brand New": "bg-pastel-mint text-green-800",
    "Like New": "bg-pastel-blue text-blue-800",
    "Good Condition": "bg-pastel-yellow text-yellow-800",
    "Well-Loved": "bg-pastel-peach text-orange-800",
  };

  const deliveryIcons: Record<Toy["deliveryMethod"], string> = {
    "Local Meetup": "🤝",
    "Postal Shipping": "📦",
    Both: "🤝📦",
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-3xl shadow-soft overflow-hidden cursor-pointer group hover:shadow-soft-lg hover:-translate-y-2 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={toy.images[0]}
          alt={toy.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${conditionColors[toy.condition]}`}
          >
            {toy.condition}
          </span>
          {toy.sanitized && (
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-charcoal flex items-center gap-1">
              🧼 Cleaned
            </span>
          )}
        </div>
        {/* Star Coins Badge */}
        <div className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-pastel-yellow to-pastel-peach rounded-full shadow-warm flex items-center gap-1.5">
          <Star className="w-4 h-4 text-pastel-yellow-dark fill-pastel-yellow-dark" />
          <span className="font-bold text-charcoal text-sm">
            {toy.starCoins} Stars
          </span>
        </div>
        {/* Warning Badge */}
        {toy.smallPartsWarning && (
          <div className="absolute bottom-3 left-3">
            <span className="px-3 py-1 bg-pastel-pink/90 backdrop-blur-sm rounded-full text-xs font-medium text-red-800 flex items-center gap-1">
              ⚠️ Small Parts
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-charcoal mb-2 line-clamp-1 group-hover:text-pastel-yellow-dark transition-colors">
          {toy.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2.5 py-1 bg-pastel-lavender/30 rounded-full text-xs text-purple-700 font-medium">
            {toy.category}
          </span>
          <span className="px-2.5 py-1 bg-pastel-mint/30 rounded-full text-xs text-teal-700 font-medium">
            Age: {toy.ageRange}
          </span>
        </div>

        <p className="text-sm text-soft-gray line-clamp-2 mb-3">
          {toy.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-pastel-lavender/30">
          <div className="flex items-center gap-1.5 text-soft-gray">
            <MapPin className="w-4 h-4" />
            <span className="text-xs">{toy.ownerCity}</span>
          </div>
          <div className="flex items-center gap-2 text-soft-gray">
            <span className="text-xs">{deliveryIcons[toy.deliveryMethod]}</span>
            <span className="text-xs">•</span>
            <span className="text-xs">{toy.views} views</span>
          </div>
        </div>

        {/* Owner */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-pastel-lavender/30">
          <div className="w-8 h-8 bg-gradient-to-br from-pastel-pink to-pastel-lavender rounded-full flex items-center justify-center text-sm">
            {toy.ownerAvatar}
          </div>
          <span className="text-xs text-soft-gray">
            Listed by <span className="font-medium text-charcoal">{toy.ownerName}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ToyCard;
