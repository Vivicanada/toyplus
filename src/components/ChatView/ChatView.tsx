"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Mail,
  CheckCircle,
  MapPin,
  Clock,
  ChevronLeft,
} from "lucide-react";
import { Conversation, Message, Toy } from "@/types";

interface ChatViewProps {
  conversations: Conversation[];
  onClose: () => void;
  onSendMessage: (conversationId: string, content: string) => void;
  onStartChat: (toy: Toy) => void;
  newChatToy?: Toy | null;
}

const ChatView: React.FC<ChatViewProps> = ({
  conversations,
  onClose,
  onSendMessage,
  onStartChat,
  newChatToy,
}) => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    conversations[0] || null
  );
  const [newMessage, setNewMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation?.messages]);

  useEffect(() => {
    if (newChatToy && !conversations.find((c) => c.toyId === newChatToy.id)) {
      // Create a new conversation placeholder
      const newConv: Conversation = {
        id: `new-conv-${newChatToy.id}`,
        participantId: newChatToy.ownerName,
        participantName: newChatToy.ownerName,
        participantAvatar: newChatToy.ownerAvatar,
        toyId: newChatToy.id,
        toyTitle: newChatToy.title,
        lastMessage: "",
        lastMessageTime: new Date(),
        unreadCount: 0,
        messages: [],
      };
      setSelectedConversation(newConv);
    }
  }, [newChatToy, conversations]);

  const handleSend = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    onSendMessage(selectedConversation.id, newMessage);
    setNewMessage("");
    
    // Simulate email notification
    if (!emailSent) {
      setTimeout(() => setEmailSent(true), 1000);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl h-[80vh] bg-white rounded-3xl shadow-soft-lg overflow-hidden animate-fadeIn flex">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-pastel-lavender/30 rounded-full flex items-center justify-center hover:bg-pastel-lavender/50 transition-colors"
        >
          <X className="w-5 h-5 text-charcoal" />
        </button>

        {/* Conversations List */}
        <div className="w-1/3 border-r border-pastel-lavender/30 flex flex-col">
          <div className="p-4 border-b border-pastel-lavender/30">
            <h2 className="text-lg font-bold text-charcoal flex items-center gap-2">
              <span className="text-xl">💬</span>
              Messages
            </h2>
            <p className="text-xs text-soft-gray mt-1">
              {conversations.length} conversations
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full p-4 text-left border-b border-pastel-lavender/20 transition-colors ${
                  selectedConversation?.id === conv.id
                    ? "bg-pastel-lavender/20"
                    : "hover:bg-pastel-lavender/10"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pastel-pink to-pastel-lavender rounded-full flex items-center justify-center text-xl flex-shrink-0">
                    {conv.participantAvatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-charcoal truncate">
                        {conv.participantName}
                      </span>
                      {conv.unreadCount > 0 && (
                        <span className="w-5 h-5 bg-pastel-pink rounded-full text-xs flex items-center justify-center font-medium text-charcoal">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-soft-gray truncate">
                      Re: {conv.toyTitle}
                    </p>
                    <p className="text-xs text-soft-gray truncate mt-1">
                      {conv.lastMessage}
                    </p>
                    <p className="text-xs text-soft-gray mt-1">
                      {formatTime(conv.lastMessageTime)}
                    </p>
                  </div>
                </div>
              </button>
            ))}

            {conversations.length === 0 && !newChatToy && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-pastel-lavender/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📭</span>
                </div>
                <p className="text-soft-gray text-sm">
                  No conversations yet.
                  <br />
                  Start chatting by clicking &quot;Chat&quot; on a toy!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-pastel-lavender/30 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pastel-pink to-pastel-lavender rounded-full flex items-center justify-center text-lg">
                  {selectedConversation.participantAvatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-charcoal">
                    {selectedConversation.participantName}
                  </p>
                  <p className="text-xs text-soft-gray">
                    Re: {selectedConversation.toyTitle}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-pastel-cream to-white">
                {selectedConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderId === "user-1" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        msg.senderId === "user-1"
                          ? "bg-gradient-to-r from-pastel-mint to-pastel-blue text-charcoal"
                          : "bg-white shadow-soft text-charcoal"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs text-soft-gray mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Email Notification */}
                {emailSent && (
                  <div className="flex justify-center">
                    <div className="bg-pastel-lavender/20 rounded-full px-4 py-2 text-xs text-soft-gray flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email notification sent to {selectedConversation.participantName}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-pastel-lavender/30">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 bg-pastel-lavender/20 rounded-full border-0 focus:ring-2 focus:ring-pastel-peach text-charcoal placeholder:text-soft-gray"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!newMessage.trim()}
                    className="w-12 h-12 bg-gradient-to-r from-pastel-yellow to-pastel-peach rounded-full flex items-center justify-center shadow-warm hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5 text-charcoal" />
                  </button>
                </div>

                {/* Quick Replies */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() =>
                      setNewMessage(
                        "Hi! I'm interested in this toy. Is it still available?"
                      )
                    }
                    className="px-3 py-1.5 bg-pastel-lavender/20 rounded-full text-xs text-charcoal hover:bg-pastel-lavender/40 transition-colors"
                  >
                    Is it available?
                  </button>
                  <button
                    onClick={() =>
                      setNewMessage(
                        "Can we meet at the community park this weekend?"
                      )
                    }
                    className="px-3 py-1.5 bg-pastel-lavender/20 rounded-full text-xs text-charcoal hover:bg-pastel-lavender/40 transition-colors"
                  >
                    Schedule meetup
                  </button>
                  <button
                    onClick={() =>
                      setNewMessage("What's the best time for pickup?")
                    }
                    className="px-3 py-1.5 bg-pastel-lavender/20 rounded-full text-xs text-charcoal hover:bg-pastel-lavender/40 transition-colors"
                  >
                    Ask about pickup
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-pastel-lavender/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">💬</span>
                </div>
                <p className="text-charcoal font-medium">Select a conversation</p>
                <p className="text-sm text-soft-gray">
                  Choose from the list on the left
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatView;
