# Consciousness Exploration Website

A high-end, scroll-based animated website for consciousness exploration and philosophical content. Built with React, TypeScript, Tailwind CSS, and Motion (Framer Motion) for smooth 60fps animations.

![Website Preview](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop)

## ✨ Features

- **Cosmic Design Aesthetic**: Dark theme with blues, purples, and cyans
- **Smooth Animations**: 60fps performance optimized with Motion
- **Glassmorphism Effects**: Modern glass-like UI components
- **Interactive Awakening Stages**: 5-stage journey cards with expandable content
- **Blog Preview System**: Clean, minimal blog post cards
- **Dynamic Space Background**: Animated stars and celestial objects
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Performance Optimized**: Lazy loading, code splitting, and optimized animations

## 🚀 Live Demo

Visit the live website: [https://your-site-name.netlify.app](https://your-site-name.netlify.app)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify
- **Version Control**: Git + GitHub

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/consciousness-exploration-website.git
   cd consciousness-exploration-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🚀 Deployment to Netlify

### Option 1: Deploy via GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/consciousness-exploration-website.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository
   - Build settings are automatically detected from `netlify.toml`:
     - Build command: `npm run build`
     - Publish directory: `dist`
     - Node version: `18`
   - Click "Deploy site"

3. **Custom Domain (Optional)**
   - In Netlify dashboard, go to Site settings > Domain management
   - Add your custom domain
   - Configure DNS settings as instructed

### Option 2: Manual Deploy

1. **Build the project locally first**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or use Netlify CLI:
     ```bash
     npm install -g netlify-cli
     netlify deploy --prod --dir=dist
     ```

### 🔧 Troubleshooting Deployment Issues

**Build fails with PostCSS/Tailwind errors:**
- The project uses Tailwind CSS v4 alpha with the `@tailwindcss/postcss` plugin
- Make sure both `tailwindcss` and `@tailwindcss/postcss` are installed in devDependencies
- PostCSS configuration is set to use CommonJS format for better compatibility

**Build fails with plugin errors:**
- The `netlify.toml` has optional plugins commented out to avoid dependency issues
- If you want to add plugins, install them first: `npm install -D @netlify/plugin-sitemap`

**Build fails with module resolution:**
- Ensure all imports use relative paths (e.g., `./components/HeroSection`)
- Check that all component files exist in the correct directories

**Motion/Framer Motion issues:**
- The project uses `motion` (new name for Framer Motion)
- Ensure imports use: `import { motion } from 'motion/react'`

**Build succeeds but site doesn't load:**
- Check browser console for errors
- Verify all image URLs are accessible
- Check that the build output in `dist/` folder is complete

**CSS/Styling issues:**
- If styles aren't applying correctly, verify the PostCSS configuration is correct
- Check that the Tailwind CSS imports in `globals.css` are processing correctly

## 📁 Project Structure

```
├── src/
│   └── main.tsx           # React entry point
├── components/
│   ├── HeroSection.tsx    # Landing hero section
│   ├── WorkingAwakeningSection.tsx # Interactive awakening stages
│   ├── BlogPreviewSection.tsx # Blog post previews
│   ├── SimpleVisualSection.tsx # Visual showcase
│   ├── FooterSection.tsx  # Footer with navigation
│   ├── SimplifiedSpaceBackground.tsx # Animated background
│   └── ui/               # Reusable UI components
├── styles/
│   └── globals.css       # Global styles and design system
├── App.tsx              # Main application component
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
├── netlify.toml         # Netlify deployment config
└── README.md           # This file
```

## 🎨 Design System

### Color Palette
```css
--background: #0a0a0f;     /* Deep space background */
--foreground: #f4f4f5;     /* Primary text */
--blue-primary: #3b82f6;   /* Cosmic blue */
--purple-primary: #a855f7; /* Mystical purple */
--cyan-accent: #22d3ee;    /* Ethereal cyan */
```

### Typography
- **Font Family**: Inter (primary), Crimson Text (serif), Playfair Display (display)
- **Font Weights**: 300 (light), 400 (normal), 500 (medium), 600 (semibold)
- **Responsive Sizing**: Fluid typography using `clamp()`

### Animation Standards
- **Entrance**: 0.8-1.2s duration with easeOut
- **Hover Effects**: 1.02-1.05 scale with subtle y-transform
- **Viewport Triggers**: -50px to -100px margin for smooth reveals

## 🎭 Content Sections

1. **Hero Section**: Cosmic background with main tagline
2. **Awakening Section**: 5 interactive stages of consciousness exploration
3. **Blog Preview**: Recent articles with metadata
4. **Visual Section**: Featured cosmic imagery
5. **Footer**: Navigation and social links

## ⚡ Performance Optimizations

- **Code Splitting**: Vendor, motion, and icons bundles
- **Image Optimization**: WebP format with fallbacks
- **Canvas Optimization**: 60fps cap with intersection observer
- **Reduced Motion**: Respects user preferences
- **Mobile Optimized**: Reduced particle counts for mobile devices

## 🔧 Build Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🌐 Browser Support

- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- iOS Safari 14+
- Android Chrome 88+

## 📝 Customization

### Updating Content
- **Blog Posts**: Edit the `blogPosts` array in `BlogPreviewSection.tsx`
- **Awakening Stages**: Modify `awakeningStages` in `WorkingAwakeningSection.tsx`
- **Colors**: Adjust CSS variables in `styles/globals.css`
- **Background**: Configure variants in `SimplifiedSpaceBackground.tsx`

### Adding New Sections
1. Create new component in `components/`
2. Import and add to `App.tsx`
3. Follow existing animation patterns
4. Use glassmorphism utilities from `globals.css`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Cosmic consciousness and sacred geometry
- **Typography**: Google Fonts (Inter, Crimson Text, Playfair Display)
- **Icons**: Lucide React icon library
- **Images**: Unsplash for cosmic imagery
- **Animation Library**: Motion (formerly Framer Motion)

## 📞 Support

If you have any questions or need help with deployment:

- Create an issue on GitHub
- Check the [Netlify documentation](https://docs.netlify.com)
- Review the [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html)

---

**"A mind stretched by thought returns altered"** ✨
```

---

## 🚀 Quick Start

1. Clone → Install → Deploy
2. Customize content and colors
3. Share your consciousness exploration journey

Built with ❤️ for mindful contemplation and philosophical inquiry.