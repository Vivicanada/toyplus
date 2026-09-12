export interface Toy {
  id: string;
  title: string;
  category: string;
  ageRange: string;
  condition: "Brand New" | "Like New" | "Good Condition" | "Well-Loved";
  starCoins: number;
  sanitized: boolean;
  smallPartsWarning: boolean;
  deliveryMethod: "Local Meetup" | "Postal Shipping" | "Both";
  ownerCity: string;
  description: string;
  story?: string;
  images: string[];
  ownerName: string;
  ownerAvatar: string;
  createdAt: Date;
  views: number;
  redeemed: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  starCoins: number;
  role: "parent";
  children: number;
  city: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  recipientId: string;
  toyId: string;
  toyTitle: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  toyId: string;
  toyTitle: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

export type Category =
  | "All"
  | "Lego"
  | "Hot Wheels"
  | "Nerf"
  | "Pokémon"
  | "Plushies"
  | "Educational/Puzzles";

export type AgeRange = "0-2 Years" | "3-5 Years" | "6-8 Years" | "9-12 Years";

export type SortOption =
  | "Newest Listed"
  | "Star Coins (Low to High)"
  | "Most Popular";

export interface Filters {
  category: Category;
  ageRange: AgeRange | null;
  condition: Toy["condition"] | null;
  deliveryMethod: Toy["deliveryMethod"] | null;
  sort: SortOption;
  searchQuery: string;
}
