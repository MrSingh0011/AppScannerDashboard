# App Scanner Dashboard

A professional, scalable dashboard application for analyzing mobile app security, permissions, components, and dependencies.

## 🚀 Live Demo

**[View Live Dashboard](https://app-scanner-dashboard-at9hselsp.vercel.app)**

Currently showcasing analysis of **Popcorn Time v3.6.10** with:
- 85/100 Risk Score
- 5 High-Risk Vulnerabilities  
- 69 Total Permissions (25 malware-prone)
- Binary Security Analysis

## Features

- **Overview Dashboard**: Key metrics, risk scores, and vulnerability summaries
- **Security Analysis**: Detailed vulnerability reports, network security status, and certificate information
- **Permissions Management**: Comprehensive permission breakdown by protection level
- **Component Analysis**: Activities, services, receivers, and providers with export status
- **Dependencies Tracking**: Library versions and vulnerability detection
- **Report Generation**: Executive summary and scan metadata

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **State Management**: React Context API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/MrSingh0011/AppScannerDashboard.git
cd AppScannerDashboard
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
pnpm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
pnpm dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
app-scanner-dashboard/
├── app/                      # Next.js app directory
│   ├── page.jsx             # Overview dashboard
│   ├── security/            # Security analysis page
│   ├── permissions/         # Permissions page
│   ├── components/          # Components page
│   ├── dependencies/        # Dependencies page
│   └── report/              # Report page
├── components/              # Reusable components
│   ├── ui/                  # shadcn/ui components
│   ├── dashboard-layout.jsx # Main layout wrapper
│   ├── sidebar.jsx          # Navigation sidebar
│   ├── header.jsx           # Top header
│   └── [feature-components] # Feature-specific components
├── contexts/                # React Context providers
│   └── app-context.jsx      # App state management
├── lib/                     # Utilities and data
│   ├── sample-data.js       # Sample app data
│   └── utils.ts             # Helper functions
└── public/                  # Static assets
\`\`\`

## Architecture Decisions

### State Management
- **Context API**: Chosen for simplicity and built-in React support
- **Scalability**: Easy to migrate to Redux/Zustand if needed
- **App Selection**: Centralized state for multi-app support

### Component Design
- **Modular**: Each feature has dedicated components
- **Reusable**: Metric cards, charts, and lists are abstracted
- **Clean Code**: Well-structured JavaScript with JSDoc comments

### Data Structure
- **Comprehensive Schema**: Mirrors real app scanner JSON structure
- **Extensible**: Easy to add new fields and features
- **Multiple Apps**: Built-in support for analyzing multiple apps

### Styling Approach
- **Dark Theme**: Professional security tool aesthetic
- **Consistent Colors**: Semantic color system for severity levels
- **Responsive**: Mobile-first design with breakpoints

## Scalability Considerations

1. **Multiple Apps**: Context provider supports unlimited apps
2. **Large Datasets**: Components use pagination-ready patterns
3. **Performance**: Memoization and lazy loading ready
4. **API Integration**: Easy to replace sample data with API calls
5. **Export Features**: Report page ready for PDF generation
6. **Search & Filter**: Implemented in dependencies and permissions

## Data Format

The dashboard expects JSON data in the following structure:

\`\`\`javascript
{
  id: string,
  appInfo: { name, packageName, version, ... },
  permissions: { dangerous[], normal[], signature[] },
  components: { activities[], services[], receivers[], providers[] },
  security: { vulnerabilities[], networkSecurity, certificateInfo, riskScore },
  dependencies: Library[],
  metadata: { scanDate, scanDuration, scannerVersion }
}
\`\`\`

See `lib/sample-data.js` for a complete example.

## Using Your Own Data

To use your own app scanner JSON data:

1. Replace the data in `lib/sample-data.js` with your JSON structure
2. Or extend the app to support file uploads
3. Ensure your JSON matches the expected structure

## Deployment

### Vercel (Recommended)

**Live Demo:** https://app-scanner-dashboard-at9hselsp.vercel.app

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MrSingh0011/AppScannerDashboard)

```bash
npm install -g vercel
vercel --prod
```

### Other Platforms

\`\`\`bash
npm run build
npm start
\`\`\`

## Future Enhancements

- JSON file upload functionality
- Real-time scanning integration
- Historical scan comparison
- Advanced filtering and search
- PDF report export
- Multi-user support with authentication
- API endpoints for programmatic access
- Comparison between multiple app versions

## License

MIT

## Repository

**GitHub:** https://github.com/MrSingh0011/AppScannerDashboard  
**Live Demo:** https://app-scanner-dashboard-at9hselsp.vercel.app

## Author

**MrSingh0011** - [GitHub Profile](https://github.com/MrSingh0011)

```typescriptreact file="app/layout.tsx" isDeleted="true"
...deleted...
