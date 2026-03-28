# ShadowMind - AI Behaviour Intelligence

A modern React application for AI-powered emotional wellbeing analysis and insights.

## Features

- **Voice Input**: Web Speech API integration for voice-to-text
- **Text Input**: Traditional text input for analysis
- **Real-time Analysis**: AI-powered emotional state analysis
- **Interactive Dashboard**: Visual charts and insights
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Dark theme with neon accents

## Tech Stack

- **React 18** - UI library
- **React Router 6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Charting library
- **Lucide React** - Icon library
- **Vite** - Build tool

## Project Structure

```
/src
  /components
    - Header.jsx          # Sticky navigation header with Account dropdown
    - Sidebar.jsx         # Sidebar navigation for authenticated pages
    - VoiceInput.jsx      # Web Speech API voice input component
    - Loader.jsx          # Loading and progress components
    /ui
      - Button.jsx        # Reusable button component
      - Card.jsx          # Reusable card component
      - Input.jsx         # Reusable input component
  /context
    - AppContext.jsx      # Global state management
  /pages
    - Landing.jsx         # Landing page
    - Login.jsx           # Login page with Google button
    - Signup.jsx          # Multi-step signup page
    - InputScreen.jsx     # Voice/text input page
    - Processing.jsx      # Analysis processing page
    - Dashboard.jsx       # Results dashboard
  /styles
    - index.css           # Global styles and Tailwind directives
  /utils
    - cn.js               # Tailwind class merging utility
  - App.jsx               # Main app with routing
  - main.jsx              # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Key Features

### Voice Input
- Uses Web Speech API for voice-to-text conversion
- Real-time transcript display
- Waveform animation while recording
- Error handling for unsupported browsers
- Start/Stop recording functionality

### Account Dropdown
- User name and email display
- Profile icon
- Navigation shortcuts
- Logout option
- Accessible and responsive

### Responsive Design
- Mobile-first approach
- Sticky header on all screen sizes
- Collapsible mobile menu
- Flexible grid layouts
- Touch-friendly interactions

### Dashboard
- Radar chart for emotional profile
- Bar chart for emotion breakdown
- Wellbeing score cards
- Key indicators list
- Recommended exercises

## Browser Support

- Chrome (recommended for voice input)
- Edge
- Safari (limited voice support)
- Firefox (limited voice support)

## Notes

- Voice input requires a secure context (HTTPS) in production
- Google login is UI-only and requires backend integration
- Analysis data is generated locally and not persisted

## License

MIT
