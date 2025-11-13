# 🎤 Presentation Coach - Setup Guide

## Cài đặt nhanh với Docker

```bash
# 1. Clone repo
git clone <your-repo>
cd ShipFree

# 2. Chạy với Docker + PostgreSQL
docker-compose -f docker/dev/docker-compose.yml -f docker/dev/docker-compose.postgres.yml up --build
```

Truy cập: `http://localhost:3000/presentation-coach`

## Cài đặt thủ công

### 1. Cài dependencies
```bash
pnpm install
```

### 2. Setup database
```bash
# Tạo file .env.local
cp .env.example .env.local

# Thêm database URL
DATABASE_URL=postgresql://devuser:devpass@localhost:5432/shipfreedev
```

### 3. Push database schema
```bash
npx drizzle-kit push:pg
```

### 4. Chạy development server
```bash
pnpm dev
```

## ⚙️ Environment Variables (Optional - cho full features)

```bash
# OpenAI (for AI features)
OPENAI_API_KEY=sk-...

# AssemblyAI (alternative for speech-to-text)
ASSEMBLYAI_API_KEY=...

# Supabase (for auth)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## 🎯 MVP vs Full Version

### ✅ MVP (Hoạt động ngay)
- Upload presentations
- Slide viewer navigation
- Audio recording với timestamps
- Basic analysis (template-based)
- Performance dashboard

### 🚀 Full Version (Cần API keys)
- Real speech-to-text (OpenAI Whisper)
- Advanced AI analysis (GPT-4)
- AI script generation
- Real-time feedback
- Cloud storage (S3/Cloudinary)

## 📦 Dependencies cần thiết

Already in package.json:
- Next.js 16
- Drizzle ORM
- Tailwind CSS
- Lucide icons

Thêm cho full features:
```bash
pnpm add openai assemblyai pdf-parse mammoth
pnpm add -D @types/pdf-parse
```

## 🔧 Troubleshooting

### Lỗi: "Cannot find module 'react'"
```bash
pnpm install
```

### Lỗi: Database connection
Kiểm tra Docker container đang chạy:
```bash
docker ps
```

### Lỗi: Port 3000 đã được sử dụng
```bash
# Kill process
lsof -ti:3000 | xargs kill -9
```

## 📝 Next Steps

1. Test upload PDF/PPTX ✅
2. Practice recording ✅
3. View analysis dashboard ✅
4. Add OpenAI key for AI features 🔑
5. Deploy to production 🚀

## 🎨 Customization

Edit branding in `src/config.ts`:
```typescript
export const config = {
  appName: "Your Presentation Coach",
  // ... other settings
}
```

## 📚 Learn More

- [Full Documentation](./PRESENTATION_COACH_README.md)
- [Database Schema](./src/db/schema.ts)
- [API Routes](./src/app/api/presentation/)
- [Components](./src/components/presentation/)

---

Happy presenting! 🎤
