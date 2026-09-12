"use client";

import React, { useState } from "react";
import {
  X,
  Star,
  MapPin,
  Truck,
  Users,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Toy } from "@/types";

interface ToyDetailModalProps {
  toy: Toy;
  userStarCoins: number;
  onClose: () => void;
  onRedeem: (toy: Toy) => void;
  onChat: (toy: Toy) => void;
}

const ToyDetailModal: React.FC<ToyDetailModalProps> = ({
  toy,
  userStarCoins,
  onClose,
  onRedeem,
  onChat,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showRedeemSuccess, setShowRedeemSuccess] = useState(false);

  const conditionDescriptions: Record<Toy["condition"], string> = {
    "Brand New": "Sealed in original packaging, never opened",
    "Like New": "95% new, original box included, barely used",
    "Good Condition": "Some signs of use, fully functional, well-maintained",
    "Well-Loved": "Visible wear but still has plenty of play left",
  };

  const deliveryLabels: Record<Toy["deliveryMethod"], string> = {
    "Local Meetup": "🤝 Local community meetup available",
    "Postal Shipping": "📦 Flat rate standard shipping available",
    Both: "🤝 Local meetup or 📦 postal shipping available",
  };

  const handleRedeem = () => {
    if (userStarCoins >= toy.starCoins) {
      setShowRedeemSuccess(true);
      setTimeout(() => {
        onRedeem(toy);
      }, 2000);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === toy.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? toy.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-soft-lg overflow-hidden animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft hover:shadow-soft-lg transition-shadow"
        >
          <X className="w-5 h-5 text-charcoal" />
        </button>

        {/* Success Overlay */}
        {showRedeemSuccess && (
          <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex items-center justify-center animate-fadeIn">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-pastel-yellow to-pastel-peach rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <span className="text-5xl">🎉</span>
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-2">
                Successfully Redeemed!
              </h3>
              <p className="text-soft-gray mb-4">
                You spent ⭐ {toy.starCoins} Stars
              </p>
              <p className="text-sm text-charcoal">
                Check your inbox for next steps from {toy.ownerName}!
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row h-full max-h-[90vh] overflow-y-auto">
          {/* Image Gallery */}
          <div className="lg:w-1/2 p-6 bg-gradient-to-br from-pastel-lavender/20 to-pastel-pink/20">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-soft mb-4">
              <img
                src={toy.images[currentImageIndex]}
                alt={toy.title}
                className="w-full h-full object-cover"
              />
              {toy.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft hover:shadow-soft-lg transition-shadow"
                  >
                    <ChevronLeft className="w-5 h-5 text-charcoal" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft hover:shadow-soft-lg transition-shadow"
                  >
                    <ChevronRight className="w-5 h-5 text-charcoal" />
                  </button>
                </>
              )}
            </div>
            {toy.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {toy.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      currentImageIndex === idx
                        ? "border-pastel-peach shadow-soft"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${toy.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:w-1/2 p-6 flex flex-col">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-2xl font-bold text-charcoal">{toy.title}</h2>
                <div className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-pastel-yellow to-pastel-peach rounded-full shadow-warm flex-shrink-0">
                  <Star className="w-5 h-5 text-pastel-yellow-dark fill-pastel-yellow-dark" />
                  <span className="font-bold text-charcoal">
                    {toy.starCoins} Stars
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-pastel-lavender/30 rounded-full text-sm text-purple-700 font-medium">
                  {toy.category}
                </span>
                <span className="px-3 py-1 bg-pastel-mint/30 rounded-full text-sm text-teal-700 font-medium">
                  Age: {toy.ageRange}
                </span>
              </div>
            </div>

            {/* Specification Badges */}
            <div className="space-y-3 mb-6">
              {/* Condition */}
              <div className="flex items-start gap-3 p-3 bg-pastel-blue/20 rounded-2xl">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal text-sm">
                    Condition: {toy.condition}
                  </p>
                  <p className="text-xs text-soft-gray">
                    {conditionDescriptions[toy.condition]}
                  </p>
                </div>
              </div>

              {/* Sanitized */}
              {toy.sanitized && (
                <div className="flex items-start gap-3 p-3 bg-pastel-mint/30 rounded-2xl">
                  <span className="text-lg">🧼</span>
                  <div>
                    <p className="font-medium text-charcoal text-sm">
                      Deep Cleaned & Sanitized
                    </p>
                    <p className="text-xs text-soft-gray">
                      Alcohol disinfected and ready for safe play
                    </p>
                  </div>
                </div>
              )}

              {/* Safety Warning */}
              {toy.smallPartsWarning && (
                <div className="flex items-start gap-3 p-3 bg-pastel-pink/30 rounded-2xl">
                  <AlertTriangle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-charcoal text-sm">
                      Safety Notice
                    </p>
                    <p className="text-xs text-soft-gray">
                      Contains small parts - keep away from children under 3
                    </p>
                  </div>
                </div>
              )}

              {/* Delivery */}
              <div className="flex items-start gap-3 p-3 bg-pastel-lavender/20 rounded-2xl">
                <Truck className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal text-sm">
                    Delivery Options
                  </p>
                  <p className="text-xs text-soft-gray">
                    {deliveryLabels[toy.deliveryMethod]}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 text-soft-gray">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{toy.ownerCity}</span>
              </div>
            </div>

            {/* Story & Description */}
            <div className="mb-6 flex-grow">
              <h3 className="font-semibold text-charcoal mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-pastel-pink" />
                The Story Behind This Toy
              </h3>
              <p className="text-sm text-charcoal mb-3 leading-relaxed">
                {toy.story || toy.description}
              </p>
              <p className="text-sm text-soft-gray leading-relaxed">
                {toy.description}
              </p>
            </div>

            {/* Owner Info */}
            <div className="flex items-center gap-3 p-4 bg-pastel-cream rounded-2xl mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pastel-pink to-pastel-lavender rounded-full flex items-center justify-center text-2xl">
                {toy.ownerAvatar}
              </div>
              <div className="flex-grow">
                <p className="font-medium text-charcoal">{toy.ownerName}</p>
                <p className="text-xs text-soft-gray">
                  Trusted community member
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-soft-gray">{toy.views} views</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleRedeem}
                disabled={userStarCoins < toy.starCoins}
                className={`flex-1 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  userStarCoins >= toy.starCoins
                    ? "bg-gradient-to-r from-pastel-yellow to-pastel-peach text-charcoal shadow-warm hover:shadow-lg hover:scale-[1.02]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Star className="w-5 h-5" />
                Redeem for {toy.starCoins} Stars
              </button>
              <button
                onClick={() => onChat(toy)}
                className="px-6 py-3.5 bg-gradient-to-r from-pastel-mint to-pastel-blue text-charcoal rounded-2xl font-semibold flex items-center gap-2 shadow-soft hover:shadow-soft-lg transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Chat
              </button>
            </div>

            {userStarCoins < toy.starCoins && (
              <p className="text-xs text-center text-pastel-peach mt-2">
                You need {toy.starCoins - userStarCoins} more Star Coins to redeem this toy
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToyDetailModal;
