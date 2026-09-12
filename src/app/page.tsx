"use client";

import React, { useState, useCallback } from "react";
import Navigation from "@/components/Navigation/Navigation";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import ToyCatalog from "@/components/ToyCatalog/ToyCatalog";
import ToyDetailModal from "@/components/ToyDetailModal/ToyDetailModal";
import ListToyModal from "@/components/ListToyModal/ListToyModal";
import ChatView from "@/components/ChatView/ChatView";
import {
  mockToys,
  currentUser,
  mockConversations,
} from "@/data/mockData";
import { Toy, Filters, Conversation, Category, AgeRange } from "@/types";

export default function Home() {
  // State
  const [toys, setToys] = useState<Toy[]>(mockToys);
  const [userStarCoins, setUserStarCoins] = useState(currentUser.starCoins);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  
  // Filters
  const [filters, setFilters] = useState<Filters>({
    category: "All",
    ageRange: null,
    condition: null,
    deliveryMethod: null,
    sort: "Newest Listed",
    searchQuery: "",
  });

  // Modals
  const [selectedToy, setSelectedToy] = useState<Toy | null>(null);
  const [showListModal, setShowListModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [newChatToy, setNewChatToy] = useState<Toy | null>(null);

  // Handlers
  const handleSearchChange = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const handleCategoryChange = useCallback((category: Category) => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const handleAgeRangeChange = useCallback((ageRange: AgeRange | null) => {
    setFilters((prev) => ({ ...prev, ageRange }));
  }, []);

  const handleToyClick = useCallback((toy: Toy) => {
    setSelectedToy(toy);
  }, []);

  const handleRedeem = useCallback(
    (toy: Toy) => {
      // Deduct stars
      setUserStarCoins((prev) => prev - toy.starCoins);
      // Mark as redeemed
      setToys((prev) =>
        prev.map((t) =>
          t.id === toy.id ? { ...t, redeemed: true } : t
        )
      );
      // Close modal
      setTimeout(() => setSelectedToy(null), 2500);
    },
    []
  );

  const handleChat = useCallback((toy: Toy) => {
    setNewChatToy(toy);
    setShowChat(true);
    setSelectedToy(null);
  }, []);

  const handleListToy = useCallback(
    (newToy: Omit<Toy, "id" | "createdAt" | "views" | "redeemed">) => {
      const toy: Toy = {
        ...newToy,
        id: `toy-${Date.now()}`,
        createdAt: new Date(),
        views: 0,
        redeemed: false,
      };
      setToys((prev) => [toy, ...prev]);
      setUserStarCoins((prev) => prev + newToy.starCoins);
      setTimeout(() => setShowListModal(false), 2500);
    },
    []
  );

  const handleSendMessage = useCallback(
    (conversationId: string, content: string) => {
      const newMessage = {
        id: `msg-${Date.now()}`,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        recipientId:
          conversations.find((c) => c.id === conversationId)?.participantId ||
          "",
        toyId:
          conversations.find((c) => c.id === conversationId)?.toyId || "",
        toyTitle:
          conversations.find((c) => c.id === conversationId)?.toyTitle || "",
        content,
        timestamp: new Date(),
        read: true,
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === conversationId
            ? {
                ...conv,
                messages: [...conv.messages, newMessage],
                lastMessage: content,
                lastMessageTime: new Date(),
              }
            : conv
        )
      );
    },
    [conversations]
  );

  const unreadCount = conversations.reduce(
    (acc, conv) => acc + conv.unreadCount,
    0
  );

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Navigation
        userStarCoins={userStarCoins}
        userAvatar={currentUser.avatar}
        userName={currentUser.name}
        userChildren={currentUser.children}
        unreadMessages={unreadCount}
        searchQuery={filters.searchQuery}
        onSearchChange={handleSearchChange}
        selectedCategory={filters.category}
        onCategoryChange={handleCategoryChange}
        onListToy={() => setShowListModal(true)}
        onOpenChat={() => {
          setNewChatToy(null);
          setShowChat(true);
        }}
      />

      {/* Hero Banner */}
      <HeroBanner
        selectedAgeRange={filters.ageRange}
        onAgeRangeChange={handleAgeRangeChange}
      />

      {/* Toy Catalog */}
      <ToyCatalog
        toys={toys}
        filters={filters}
        onFilterChange={setFilters}
        onToyClick={handleToyClick}
      />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pastel-lavender/20 via-pastel-pink/20 to-pastel-yellow/20 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pastel-yellow to-pastel-peach rounded-2xl flex items-center justify-center shadow-warm">
              <span className="text-2xl">🎁</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-charcoal">
                LittleStars ToySwap
              </h3>
              <p className="text-xs text-soft-gray">星宝玩具屋</p>
            </div>
          </div>
          <p className="text-sm text-soft-gray mb-6 max-w-lg mx-auto">
            Giving toys a second life, one Star Coin at a time. Join thousands
            of families creating a sustainable toy-sharing community.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-soft-gray">
            <span>🧸 Safe & Sanitized</span>
            <span>⭐ Earn Star Coins</span>
            <span>💚 Eco-Friendly</span>
            <span>👨‍👩‍👧‍👦 Family-Focused</span>
          </div>
          <p className="text-xs text-soft-gray mt-8">
            © 2024 LittleStars ToySwap. Made with ❤️ for families everywhere.
          </p>
        </div>
      </footer>

      {/* Toy Detail Modal */}
      {selectedToy && (
        <ToyDetailModal
          toy={selectedToy}
          userStarCoins={userStarCoins}
          onClose={() => setSelectedToy(null)}
          onRedeem={handleRedeem}
          onChat={handleChat}
        />
      )}

      {/* List Toy Modal */}
      {showListModal && (
        <ListToyModal
          onClose={() => setShowListModal(false)}
          onSubmit={handleListToy}
        />
      )}

      {/* Chat View */}
      {showChat && (
        <ChatView
          conversations={conversations}
          onClose={() => setShowChat(false)}
          onSendMessage={handleSendMessage}
          onStartChat={handleChat}
          newChatToy={newChatToy}
        />
      )}
    </main>
  );
}
