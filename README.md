# LittleStars ToySwap (星宝玩具屋)

A desktop-first, highly playful, and heartwarming Toy Exchange Platform for families with kids aged 0-12. Parents can swap outgrown or idle toys using a **"Star Coin (星星币)" virtual points system**.

![LittleStars ToySwap](https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=1200&h=400&fit=crop)

## ✨ Features

- 🎁 **List & Exchange Toys** - Share toys your kids have outgrown and earn Star Coins
- ⭐ **Star Coins System** - Virtual points for exchanging toys
- 🔍 **Smart Filtering** - Filter by category, age range, condition, and delivery method
- 💬 **Parent-to-Parent Chat** - Communicate directly with other parents
- 🧼 **Safety & Hygiene Tags** - Mark sanitized toys and small parts warnings
- 📍 **Local Meetup & Shipping** - Flexible delivery options

## 🎨 Design System

### Color Palette (Macaron Pastel Theme)

- **Background**: Soft cream `#FAF8F5`
- **Primary/Action**: Pastel Butter Yellow `#FDE68A` / `#F59E0B` & Soft Peach `#FDBA74`
- **Secondary/Accent**: Mint Green `#A7F3D0`, Baby Blue `#BAE6FD`, Pastel Lavender `#DDD6FE`, Blossom Pink `#FBCFE8`
- **Text**: Warm charcoal `#374151`, soft gray `#9CA3AF`

### UI Components

- Heavily rounded corners (`rounded-2xl`, `rounded-3xl`, `rounded-full`)
- Soft, plush shadows with warm tints
- Badge tags with cute emojis (⭐, 🧼, ⚠️)
- Whimsical iconography using `lucide-react`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
   ```bash
   cd littlestars-toyswap
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
littlestars-toyswap/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles with Tailwind
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main application page
│   ├── components/
│   │   ├── Navigation/      # Header with logo, search, categories
│   │   ├── HeroBanner/      # Hero with 3-step process
│   │   ├── ToyCatalog/      # Filter toolbar & toy grid
│   │   ├── ToyCard/         # Individual toy card
│   │   ├── ToyDetailModal/  # Full toy detail view
│   │   ├── ListToyModal/    # Form to list a new toy
│   │   └── ChatView/        # Parent-to-parent messaging
│   ├── data/
│   │   └── mockData.ts      # Sample toys & conversations
│   └── types/
│       └── index.ts         # TypeScript interfaces
├── tailwind.config.ts       # Tailwind with custom theme
└── package.json
```

## 🎮 Features Overview

### Navigation Header
- Playful logo with toy chest icon
- Search bar for quick toy lookup
- Category quick links
- User profile with Star Coins balance
- Message inbox with unread count

### Hero Banner
- Catchy headline with animated decorative elements
- Interactive 3-step process explanation
- Quick age filter chips

### Toy Catalog
- Advanced filtering (category, age, condition, delivery)
- Sorting options (newest, price, popularity)
- 4-column responsive grid
- Hover effects on cards

### Toy Detail Modal
- Image gallery with thumbnails
- Specification badges (condition, age, safety)
- Owner story section
- Redeem with Star Coins
- Chat with parent option

### List a Toy Modal
- Drag-and-drop photo upload
- Condition selector with descriptions
- Hygiene & safety checkboxes
- Star Coins value slider with recommendations
- Success animation

### Chat View
- Split-screen layout
- Conversation list with unread indicators
- Quick reply buttons
- Email notification simulation

## 📝 Mock Data

The application comes pre-populated with 6 sample toys:

1. **Lego City Fire Station** - Age 6-8, Like New, 45 Stars
2. **Hot Wheels 5-Car Pack + Loop Track** - Age 3-5, Brand New, 35 Stars
3. **Giant Squishmallow Cat Plush** - Age 0-2, Like New, 25 Stars
4. **Nerf Elite 2.0 Blaster** - Age 9-12, Good Condition, 30 Stars
5. **Pokémon Battle Figure Arena** - Age 6-8, Like New, 40 Stars
6. **Melissa & Doug Wooden Shape Sorter** - Age 0-2, Like New, 20 Stars

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State**: React useState (client-side)

## 📜 License

MIT License - Made with ❤️ for families everywhere

---

*LittleStars ToySwap - Give outgrown toys a second life, bring new smiles to kids!* 🌟
