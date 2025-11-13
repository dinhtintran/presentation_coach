# 🎤 Presentation Coach - AI-Powered Presentation Training

A minimalist web application built on ShipFree that helps users practice and analyze their presentation performance using AI.

## ✨ Features

### 📤 Upload & Process
- Upload PDF or PowerPoint presentations
- Automatic slide extraction and processing
- Clean, minimalist slide viewer with navigation

### 🎙️ Practice Mode
- Real-time voice recording synchronized with slides
- Slide transition tracking with timestamps
- Clean presentation interface (similar to Google Meet/Slides)

### 🤖 AI Analysis
- **Speech-to-Text**: Full transcription of your presentation
- **Clarity & Pace Evaluation**: Analyze speaking speed and articulation
- **Filler Word Detection**: Identify "um", "uh", "like", etc.
- **Emotional Tone**: Estimate confidence and engagement level
- **Slide-Content Alignment**: Verify if speech matches visual content

### 📊 Performance Dashboard
- Confidence, Clarity, and Pace scores
- Words-per-minute metrics
- Detailed feedback with strengths and improvements
- Section-by-section analysis per slide

### ✍️ AI Script Generator
- Generate professional speaking scripts from slides
- Real-time highlighting during practice
- Natural, contextual narration for each slide

### 📈 Progress Tracking
- Compare sessions over time
- Improvement trend visualization
- Historical performance metrics

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Docker (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/shipfree.git
cd shipfree

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your credentials
```

### Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/shipfree

# Supabase (for auth)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# OpenAI (for AI features)
OPENAI_API_KEY=your_openai_key

# Optional: AssemblyAI (for speech-to-text)
ASSEMBLYAI_API_KEY=your_assemblyai_key
```

### Run with Docker

```bash
# Development with PostgreSQL
docker-compose -f docker/dev/docker-compose.yml -f docker/dev/docker-compose.postgres.yml up --build

# Production
docker-compose -f docker/prod/docker-compose.yml -f docker/prod/docker-compose.postgres.yml up --build -d
```

### Run Locally

```bash
# Development mode
pnpm dev

# Build for production
pnpm build
pnpm start
```

Access the app at `http://localhost:3000/presentation-coach`

## 📁 Project Structure

```
src/
├── app/
│   ├── presentation-coach/      # Main application page
│   └── api/
│       └── presentation/         # API endpoints
│           ├── upload/          # File upload handler
│           ├── analyze/         # AI analysis
│           └── report/          # Get analysis reports
├── components/
│   └── presentation/
│       ├── FileUpload.tsx       # Drag & drop upload
│       ├── SlideViewer.tsx      # Slide navigation
│       ├── PracticeSession.tsx  # Recording interface
│       ├── AnalysisDashboard.tsx # Results display
│       └── TrainingMode.tsx     # AI script practice
├── db/
│   └── schema.ts                # Database tables
├── types/
│   └── presentation.ts          # TypeScript types
└── utils/
    └── ai/
        ├── speech-to-text.ts    # Audio transcription
        ├── analysis.ts          # Performance analysis
        └── script-generator.ts  # AI script creation
```

## 🎯 Usage Flow

### 1. Upload Presentation
- Navigate to `/presentation-coach`
- Drag & drop or click to upload PDF/PowerPoint
- System processes and extracts slides

### 2. Start Practice Session
- Click "Start Practice"
- Click "Start Recording" when ready
- Navigate through slides while speaking
- Click "End Session" when finished

### 3. View AI Analysis
- System analyzes audio and generates report
- Review performance metrics
- Check detailed feedback per slide
- Identify areas for improvement

### 4. Generate AI Script (Optional)
- Click "Generate Script" for AI-written narration
- Use in Training Mode for guided practice
- Script highlights in real-time as you speak

### 5. Track Progress
- View past sessions
- Compare performance over time
- Monitor improvement trends

## 🤖 AI Implementation

### Speech-to-Text Options

**Option 1: OpenAI Whisper API** (Recommended)
```typescript
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function transcribe(audioFile: File) {
  const transcription = await openai.audio.transcriptions.create({
    file: audioFile,
    model: "whisper-1",
    language: "en",
  });
  return transcription.text;
}
```

**Option 2: AssemblyAI**
```typescript
import { AssemblyAI } from "assemblyai";

const client = new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY });

async function transcribe(audioUrl: string) {
  const transcript = await client.transcripts.create({
    audio_url: audioUrl,
    speech_model: "best",
  });
  return transcript.text;
}
```

### Analysis with GPT-4
```typescript
async function analyzePresentation(transcript: string, slideContent: string[]) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a professional presentation coach...",
      },
      {
        role: "user",
        content: `Analyze this presentation...`,
      },
    ],
  });
  return parseAnalysis(response.choices[0].message.content);
}
```

## 🎨 Design Philosophy

- **Minimalist**: Clean white-space, soft colors, distraction-free
- **Smooth**: Gentle animations and transitions
- **Focused**: Content-first approach
- **Professional**: Typography and spacing optimized for clarity

## 📊 Database Schema

Key tables:
- `presentations`: Uploaded files and slide data
- `practice_sessions`: Recording metadata and timestamps
- `analysis_reports`: AI-generated feedback
- `ai_scripts`: Generated speaking scripts
- `user_progress`: Historical performance tracking

## 🔧 Configuration

Edit `src/config.ts` to customize:
- App name and branding
- Email settings
- Feature flags
- AI provider settings

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

### Docker Production
```bash
docker-compose -f docker/prod/docker-compose.postgres.yml up -d
```

## 💰 Monetization Ideas

- **Free Tier**: 3 practice sessions/month
- **Pro ($19/mo)**: Unlimited sessions + AI scripts
- **Team ($49/mo)**: Multi-user + team analytics
- **Enterprise**: Custom deployment + API access

## 📝 TODO / Roadmap

- [ ] Real PDF/PPTX parsing (pdf-parse, officegen)
- [ ] Cloud storage integration (S3, Cloudinary)
- [ ] Real-time script highlighting during practice
- [ ] Video recording option
- [ ] Team collaboration features
- [ ] Mobile app (React Native)

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 License

See [LICENSE.md](LICENSE.md)

---

Built with ❤️ using ShipFree
