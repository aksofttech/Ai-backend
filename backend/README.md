# Yugsoft Tech — Backend API

Enterprise Educational AI SaaS backend built with **NestJS**, **PostgreSQL**, **TypeORM**, **Passport/JWT**, and **pgvector** for RAG.

## Stack

| Layer | Technology |
|-------|------------|
| Framework | NestJS 11 (TypeScript) |
| Database | PostgreSQL + pgvector |
| ORM | TypeORM |
| Auth | Passport JWT + RBAC (admin, teacher, student) |
| AI | OpenAI embeddings (1536-d) + chat completions |
| Documents | pdf-parse, Puppeteer, PDFKit, PptxGenJS |

## Project structure

```
src/
├── common/          # Guards, filters, interceptors, decorators
├── config/          # Environment configuration
├── database/        # Entities, migrations, pgvector helpers
└── modules/
    ├── auth/        # Signup, login, JWT
    ├── users/       # Tenant-scoped user management
    ├── curriculum/  # Books & chapters
    ├── rag-engine/  # PDF ingest, chunking, cosine search
    ├── ai-tools/    # Worksheet, lesson-plan, PPT, homework orchestrator
    └── compiler/    # PDF/PPTX export
```

## Quick start

1. **PostgreSQL with pgvector** (Docker example):

```bash
docker run -d --name yugsoft-pg \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=yugsoft_tech \
  -p 5432:5432 \
  pgvector/pgvector:pg16
```

2. **Environment**

```bash
cp .env.example .env
# Set JWT_SECRET, OPENAI_API_KEY, DB_* values
```

3. **Run migration** (enables `vector` extension + schema):

```bash
npm run migration:run
```

4. **Start API**

```bash
npm run start:dev
```

Base URL: `http://localhost:3000/api/v1`

## API overview

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | Public | Health check |
| POST | `/auth/signup` | Public | Register (creates tenant if omitted) |
| POST | `/auth/login` | Public | JWT login |
| GET | `/users/me` | JWT | Current profile |
| CRUD | `/users` | Admin | Tenant user management |
| CRUD | `/curriculum/books` | JWT + roles | Books & chapters |
| POST | `/rag/ingest` | Teacher+ | Upload PDF to chapter |
| POST | `/rag/search` | JWT | Semantic cosine search |
| POST | `/ai-tools/:tool/generate` | Teacher+ | AI content (`worksheet`, `lesson-plan`, `ppt`, `homework`) |
| POST | `/compiler/pdf/*` | Teacher+ | Export PDF/PPTX |

## Security

- Global `ValidationPipe` (whitelist + forbid unknown fields)
- `JwtAuthGuard` on all routes except `@Public()`
- `RolesGuard` with `@Roles(UserRole.ADMIN | TEACHER | STUDENT)`
- All curriculum/RAG queries scoped by `tenantId` from JWT

## RAG pipeline

1. Extract text from PDF (`PdfExtractionService`)
2. Semantic chunking with overlap (`ChunkingService`)
3. OpenAI embeddings → `book_chunks.embedding` (`vector(1536)`)
4. Query via pgvector cosine distance: `embedding <=> query_vector`

## License

Proprietary — Yugsoft Tech.
