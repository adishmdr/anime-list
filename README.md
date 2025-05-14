# AniList - Anime Discovery Platform

A modern web application for discovering and exploring anime, built with Next.js, TypeScript, and Chakra UI.

## 🚀 Features

### Current Features
- **Anime Discovery**
  - Browse a paginated list of anime
  - Search functionality with debounced input
  - Responsive grid layout
  - Skeleton loading states for better UX
  - Detailed anime information modal

- **User Interface**
  - Modern, responsive design using Chakra UI
  - Dark/Light mode support
  - Sticky navigation with blur effect
  - Smooth animations and transitions
  - Loading states and skeleton screens

- **Navigation**
  - Pagination with icon buttons
  - Search functionality
  - User profile display
  - Secure logout with confirmation modal

### Technical Implementation
- **Frontend**
  - Next.js 14 with App Router
  - TypeScript for type safety
  - Chakra UI for component library
  - Apollo Client for GraphQL integration
  - Custom hooks for debouncing and state management

- **State Management**
  - React Query for server state
  - Local state management with React hooks
  - URL-based pagination
  - Debounced search implementation

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- AniList API access

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/anilist.git
cd anilist
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory
```env
NEXT_PUBLIC_ANILIST_API_URL=https://graphql.anilist.co
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   └── anime/         # Anime-specific components
├── lib/               # Utility functions and configurations
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
└── styles/            # Global styles and theme
```

## 🔄 Future Improvements

### Features to Add
1. **Authentication**
   - User registration and login
   - Social authentication
   - Profile management
   - Watchlist functionality

2. **Enhanced Anime Features**
   - Advanced filtering and sorting
   - Genre-based browsing
   - Seasonal anime calendar
   - Recommendations system
   - User ratings and reviews

3. **Social Features**
   - User comments and discussions
   - Share anime on social media
   - Follow other users
   - Activity feed

4. **Performance Optimizations**
   - Image optimization and lazy loading
   - Infinite scroll implementation
   - Caching strategies
   - Service worker for offline support

5. **UI/UX Improvements**
   - Custom theme builder
   - Keyboard shortcuts
   - Advanced animations
   - Accessibility improvements
   - Mobile app version

6. **Technical Enhancements**
   - Unit and integration tests
   - E2E testing with Cypress
   - CI/CD pipeline
   - Performance monitoring
   - Error tracking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [AniList API](https://anilist.gitbook.io/anilist-apiv2-docs/) for the anime data
- [Next.js](https://nextjs.org/) for the framework
- [Chakra UI](https://chakra-ui.com/) for the component library
- [Apollo Client](https://www.apollographql.com/docs/react/) for GraphQL integration
