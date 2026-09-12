"use client";

import React, { useState } from "react";
import {
  X,
  Upload,
  Star,
  MapPin,
  Truck,
  Info,
  CheckCircle,
  AlertTriangle,
  Camera,
} from "lucide-react";
import { Toy } from "@/types";
import { categories, ageRanges, conditions, deliveryMethods } from "@/data/mockData";

interface ListToyModalProps {
  onClose: () => void;
  onSubmit: (toy: Omit<Toy, "id" | "createdAt" | "views" | "redeemed">) => void;
}

const ListToyModal: React.FC<ListToyModalProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Lego" as Toy["category"],
    ageRange: "3-5 Years" as Toy["ageRange"],
    condition: "Like New" as Toy["condition"],
    starCoins: 30,
    sanitized: true,
    smallPartsWarning: false,
    deliveryMethod: "Both" as Toy["deliveryMethod"],
    ownerCity: "San Francisco Bay Area",
    description: "",
    story: "",
    images: [] as string[],
    ownerName: "Sarah",
    ownerAvatar: "👩‍👧‍👦",
  });

  const [dragOver, setDragOver] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const recommendedPoints: Record<string, [number, number]> = {
    "Small plushies": [15, 20],
    "Action figures": [20, 35],
    "Board games & puzzles": [25, 40],
    "Lego sets": [40, 60],
    "Large toys": [50, 80],
    "Electronic toys": [60, 100],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      onSubmit({
        ...formData,
        images: formData.images.length > 0 ? formData.images : ["https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&h=400&fit=crop"],
      });
    }, 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setFormData({ ...formData, images: [...formData.images, ...newImages] });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-soft-lg my-8 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-pastel-lavender/30 rounded-full flex items-center justify-center hover:bg-pastel-lavender/50 transition-colors"
        >
          <X className="w-5 h-5 text-charcoal" />
        </button>

        {/* Success Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm rounded-3xl flex items-center justify-center animate-fadeIn">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-pastel-mint to-pastel-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-2">
                Toy Listed Successfully!
              </h3>
              <p className="text-soft-gray mb-2">
                You earned ⭐ {formData.starCoins} Star Coins!
              </p>
              <p className="text-sm text-charcoal">
                Your toy is now visible to the community
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="p-6 border-b border-pastel-lavender/30">
          <h2 className="text-2xl font-bold text-charcoal flex items-center gap-2">
            <span className="text-2xl">🎁</span>
            List Your Toy
          </h2>
          <p className="text-sm text-soft-gray mt-1">
            Share a toy and earn Star Coins for your family
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-charcoal mb-2">
              Toy Photos
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const files = e.dataTransfer.files;
                if (files) {
                  const newImages = Array.from(files).map((file) =>
                    URL.createObjectURL(file)
                  );
                  setFormData({
                    ...formData,
                    images: [...formData.images, ...newImages],
                  });
                }
              }}
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                dragOver
                  ? "border-pastel-peach bg-pastel-peach/10"
                  : "border-pastel-lavender/50 bg-pastel-lavender/10 hover:border-pastel-peach"
              }`}
            >
              <Upload className="w-10 h-10 text-pastel-peach mx-auto mb-3" />
              <p className="text-charcoal font-medium mb-1">
                Drag & drop photos here
              </p>
              <p className="text-xs text-soft-gray mb-3">
                or click to browse (max 5 photos)
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {/* Image Previews */}
            {formData.images.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {formData.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-20 h-20 rounded-xl overflow-hidden group"
                  >
                    <img
                      src={img}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute inset-0 bg-charcoal/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-charcoal mb-2">
              Toy Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Lego City Fire Station"
              className="w-full px-4 py-3 bg-pastel-lavender/20 rounded-xl border-0 focus:ring-2 focus:ring-pastel-peach text-charcoal placeholder:text-soft-gray"
            />
          </div>

          {/* Category & Age Range */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as Toy["category"],
                  })
                }
                className="w-full px-4 py-3 bg-pastel-lavender/20 rounded-xl border-0 focus:ring-2 focus:ring-pastel-peach text-charcoal"
              >
                {categories.filter((c) => c !== "All").map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Recommended Age *
              </label>
              <select
                value={formData.ageRange}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ageRange: e.target.value as Toy["ageRange"],
                  })
                }
                className="w-full px-4 py-3 bg-pastel-lavender/20 rounded-xl border-0 focus:ring-2 focus:ring-pastel-peach text-charcoal"
              >
                {ageRanges.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Condition */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-charcoal mb-2">
              Toy Condition *
            </label>
            <div className="flex flex-wrap gap-2">
              {conditions.map((cond) => (
                <button
                  key={cond}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, condition: cond })
                  }
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    formData.condition === cond
                      ? "bg-gradient-to-r from-pastel-yellow to-pastel-peach text-charcoal shadow-warm"
                      : "bg-pastel-lavender/20 text-soft-gray hover:bg-pastel-lavender/40"
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          {/* Hygiene & Safety */}
          <div className="mb-5 p-4 bg-pastel-mint/20 rounded-2xl">
            <label className="block text-sm font-medium text-charcoal mb-3">
              Hygiene & Safety
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.sanitized}
                  onChange={(e) =>
                    setFormData({ ...formData, sanitized: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-2 border-pastel-mint text-pastel-mint focus:ring-pastel-peach"
                />
                <div className="flex items-center gap-2">
                  <span>🧼</span>
                  <span className="text-sm text-charcoal">
                    Has been cleaned & sanitized
                  </span>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.smallPartsWarning}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      smallPartsWarning: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded border-2 border-pastel-pink text-pastel-pink focus:ring-pastel-peach"
                />
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-pastel-peach" />
                  <span className="text-sm text-charcoal">
                    Contains small parts / swallow hazard
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Star Coins Value */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-charcoal mb-2">
              Star Coins Value
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="10"
                max="100"
                value={formData.starCoins}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    starCoins: parseInt(e.target.value),
                  })
                }
                className="flex-1 h-2 bg-pastel-lavender/30 rounded-lg appearance-none cursor-pointer accent-pastel-peach"
              />
              <div className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-pastel-yellow to-pastel-peach rounded-full shadow-warm">
                <Star className="w-4 h-4 text-pastel-yellow-dark fill-pastel-yellow-dark" />
                <span className="font-bold text-charcoal">
                  {formData.starCoins} Stars
                </span>
              </div>
            </div>
            <div className="mt-3 p-3 bg-pastel-lavender/10 rounded-xl">
              <p className="text-xs text-soft-gray flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-charcoal">Recommended:</strong> Small
                  plushies: 15-20 Stars • Lego sets: 40-60 Stars • Large toys:
                  50-80 Stars
                </span>
              </p>
            </div>
          </div>

          {/* Delivery Preference */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-charcoal mb-2">
              Delivery Preference *
            </label>
            <div className="flex flex-wrap gap-2">
              {deliveryMethods.map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, deliveryMethod: method })
                  }
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    formData.deliveryMethod === method
                      ? "bg-gradient-to-r from-pastel-mint to-pastel-blue text-charcoal shadow-warm"
                      : "bg-pastel-lavender/20 text-soft-gray hover:bg-pastel-lavender/40"
                  }`}
                >
                  {method === "Local Meetup" && "🤝"}
                  {method === "Postal Shipping" && "📦"}
                  {method === "Both" && "🤝📦"}
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-charcoal mb-2">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the toy, what's included, and its current condition..."
              className="w-full px-4 py-3 bg-pastel-lavender/20 rounded-xl border-0 focus:ring-2 focus:ring-pastel-peach text-charcoal placeholder:text-soft-gray resize-none"
            />
          </div>

          {/* Story */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-charcoal mb-2">
              The Story Behind This Toy (Optional)
            </label>
            <textarea
              rows={2}
              value={formData.story}
              onChange={(e) =>
                setFormData({ ...formData, story: e.target.value })
              }
              placeholder="Why did your child love it? Why are you passing it on?"
              className="w-full px-4 py-3 bg-pastel-lavender/20 rounded-xl border-0 focus:ring-2 focus:ring-pastel-peach text-charcoal placeholder:text-soft-gray resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-pastel-lavender/20 text-charcoal rounded-xl font-medium hover:bg-pastel-lavender/40 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-pastel-mint to-pastel-blue text-charcoal font-semibold rounded-xl shadow-warm hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              List Toy & Earn Stars
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListToyModal;
