# Portfolio Next.js

A modern, interactive portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and advanced 3D graphics using Three.js and React Three Fiber.

## Features

- **🚀 Next.js 14** with App Router and Server Components
- **🎨 Tailwind CSS** with dark mode support
- **🎭 Framer Motion** for smooth animations and transitions
- **🎮 3D Graphics** using Three.js and React Three Fiber
- **📱 Fully Responsive** mobile-first design
- **🌙 Dark/Light Mode** toggle with system preference detection
- **📊 GitHub Integration** for live project showcase
- **✉️ Contact Form** with validation and real-time feedback
- **📝 MDX Support** for content management
- **⚡ Performance Optimized** with lazy loading and code splitting

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **3D Graphics:** Three.js, React Three Fiber, Drei
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-nextjs.git
cd portfolio-nextjs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file:
```bash
cp .env.example .env.local
```

4. Update the environment variables:
```env
NEXT_PUBLIC_GITHUB_USERNAME=your_github_username
GITHUB_TOKEN=your_github_token (optional, for higher API rate limits)
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   ├── about/              # About page
│   ├── projects/           # Projects page
│   └── contact/            # Contact page
├── components/
│   ├── ui/                 # UI components
│   ├── hero-3d.tsx         # 3D hero section
│   ├── navigation.tsx      # Navigation component
│   └── ...
├── lib/
│   └── utils.ts            # Utility functions
├── hooks/
│   └── use-reveal.ts       # Reveal animation hook
├── types/
│   └── index.ts            # TypeScript types
└── public/
    └── ...                 # Static assets
```

## Customization

### Personal Information

Update the following files with your information:

- `app/layout.tsx` - Metadata and SEO
- `components/navigation.tsx` - Navigation links
- `components/contact-info.tsx` - Contact information
- `components/skills-overview.tsx` - Skills and experience
- `components/experience-timeline.tsx` - Work experience

### Styling

The project uses Tailwind CSS with a custom color palette. You can modify the colors in:

- `tailwind.config.js` - Tailwind configuration
- `app/globals.css` - Global styles and CSS variables

### 3D Graphics

The 3D hero section can be customized in:

- `components/hero-3d.tsx` - 3D scene components
- `components/hero-section.tsx` - Hero section layout

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

```bash
npm run build
npm run start
```

## Environment Variables

- `NEXT_PUBLIC_GITHUB_USERNAME` - Your GitHub username for project showcase
- `GITHUB_TOKEN` (optional) - GitHub personal access token for higher API rate limits

## Performance

The portfolio includes several performance optimizations:

- **Image Optimization** - Next.js Image component with WebP/AVIF support
- **Code Splitting** - Automatic code splitting with Next.js
- **Lazy Loading** - 3D components and images are lazy loaded
- **Animation Performance** - Hardware-accelerated animations with Framer Motion
- **Bundle Size** - Tree shaking and minimal dependencies

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.