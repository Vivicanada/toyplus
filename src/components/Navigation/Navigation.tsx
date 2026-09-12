"use client";

import React from "react";
import {
  Search,
  Gift,
  MessageCircle,
  Star,
  Sparkles,
  ChevronDown,
  Plus,
} from "lucide-react";
import { categories } from "@/data/mockData";
import { Category } from "@/types";

interface NavigationProps {
  userStarCoins: number;
  userAvatar: string;
  userName: string;
  userChildren: number;
  unreadMessages: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  onListToy: () => void;
  onOpenChat: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  userStarCoins,
  userAvatar,
  userName,
  userChildren,
  unreadMessages,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onListToy,
  onOpenChat,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-pastel-lavender/30 shadow-soft">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Top Row: Logo, Search, User */}
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-pastel-yellow to-pastel-peach rounded-2xl flex items-center justify-center shadow-warm transform group-hover:scale-105 transition-transform">
                <Gift className="w-6 h-6 text-charcoal" />
              </div>
              <Sparkles className="w-4 h-4 text-pastel-yellow-dark absolute -top-1 -right-1 animate-pulse-soft" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-charcoal">
                LittleStars ToySwap
              </h1>
              <p className="text-xs text-soft-gray">星宝玩具屋</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-gray" />
            <input
              type="text"
              placeholder="Search toys... (e.g., Lego police, Pikachu)"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-full border-2 border-pastel-lavender/50 focus:border-pastel-peach focus:outline-none transition-colors text-charcoal placeholder:text-soft-gray shadow-soft"
            />
          </div>

          {/* User Status Area */}
          <div className="flex items-center gap-4">
            {/* Star Coins Wallet */}
            <div className="relative group">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pastel-yellow to-pastel-peach rounded-full shadow-warm cursor-pointer hover:shadow-lg transition-shadow">
                <Star className="w-5 h-5 text-pastel-yellow-dark fill-pastel-yellow-dark" />
                <span className="font-bold text-charcoal">
                  {userStarCoins} Stars
                </span>
              </div>
              {/* Tooltip */}
              <div className="absolute top-full right-0 mt-2 w-64 p-4 bg-white rounded-2xl shadow-soft-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <p className="text-sm text-charcoal font-medium mb-2">
                  ⭐ How Star Coins Work
                </p>
                <p className="text-xs text-soft-gray">
                  Earn coins by listing toys your kids have outgrown. Spend them
                  to redeem exciting new toys!
                </p>
              </div>
            </div>

            {/* Messages */}
            <button
              onClick={onOpenChat}
              className="relative p-3 bg-white rounded-full shadow-soft hover:shadow-soft-lg transition-shadow"
            >
              <MessageCircle className="w-5 h-5 text-charcoal" />
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pastel-pink text-charcoal text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-full shadow-soft hover:shadow-soft-lg transition-shadow cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-pastel-mint to-pastel-blue rounded-full flex items-center justify-center text-xl">
                {userAvatar}
              </div>
              <div className="hidden lg:block">
                <p className="font-medium text-charcoal text-sm">
                  {userName} (Mom of {userChildren})
                </p>
                <p className="text-xs text-soft-gray">San Francisco Bay Area</p>
              </div>
              <ChevronDown className="w-4 h-4 text-soft-gray hidden lg:block" />
            </div>

            {/* List a Toy Button */}
            <button
              onClick={onListToy}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-pastel-mint to-pastel-blue text-charcoal font-semibold rounded-full shadow-warm hover:shadow-lg hover:scale-105 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden xl:inline">List a Toy</span>
            </button>
          </div>
        </div>

        {/* Category Quick Links */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-5 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-pastel-yellow to-pastel-peach text-charcoal shadow-warm"
                  : "bg-white text-soft-gray hover:bg-pastel-lavender/30 hover:text-charcoal shadow-soft"
              }`}
            >
              {category === "All" && "🎁 "}
              {category === "Lego" && "🧱 "}
              {category === "Hot Wheels" && "🚗 "}
              {category === "Nerf" && "🔫 "}
              {category === "Pokémon" && "⚡ "}
              {category === "Plushies" && "🧸 "}
              {category === "Educational/Puzzles" && "🧩 "}
              {category}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
