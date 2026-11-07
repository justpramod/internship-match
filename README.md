# InternMatch

An AI-assisted internship matching platform that connects students, companies, and administrators in one role-based web application. Students can build profiles, upload resumes, and discover relevant internships. Companies can publish opportunities, review applicants, and manage postings. Administrators can moderate sectors, companies, and students from a dedicated dashboard.

## What This Project Demonstrates

- End-to-end product development with authentication, role-based access, and dashboard flows.
- AI-assisted resume and skill processing to improve internship discovery.
- Full-stack data modeling and server actions for application, profile, and internship management.
- Cloud file handling for resumes, profile photos, and company logos.
- Recruiter-friendly architecture built with modern React and Next.js patterns.

## Tech Stack

- Framework: Next.js 16 with the App Router
- UI: React 19, Tailwind CSS 4, shadcn/ui, Base UI, Lucide icons
- State and forms: Server Actions, Zod, cmdk, React Datepicker
- Authentication: NextAuth v5 with credentials-based login
- Database: MongoDB with Mongoose
- Storage: Cloudflare R2 with AWS SDK integrations
- AI / Parsing: Google GenAI, PDF parsing utilities, custom skill extraction helpers
- Visualization: Recharts
- Utilities: bcrypt, sharp, pdfjs-dist, pdf2json, unpdf

## Key Features

- Student, company, and admin role separation
- Resume upload and profile management
- Internship creation, browsing, filtering, and search
- Application tracking and applicant response workflows
- AI-assisted matching based on skills and internship requirements
- Sector management and moderation tools for admins
- Media upload support for logos, profile pictures, and resumes

## Project Structure

- `app/` - App Router pages, layouts, and route segments for each role
- `actions/` - Server actions for authentication, internships, profiles, uploads, and admin workflows
- `components/` - Shared UI and page sections
- `lib/` - Database, auth, storage, and reusable server-side helpers
- `lib/models/` - Mongoose models and schemas
- `utils/` - Shared utility functions
- `public/` - Static assets

## Getting Started

### Prerequisites

- Node.js 22+
- MongoDB database
- Cloudflare R2 bucket and credentials
- Google GenAI access if you want the AI features enabled

### Install

```bash
npm install
```

### Environment Variables

Create a `.env.local` file with values similar to these:

```env
db_atlas_uri=your_mongodb_connection_string

R2_ENDPOINT=your_r2_endpoint
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET_NAME=your_r2_bucket_name
R2_PUBLIC_BASE_URL=your_public_r2_base_url

R2_ENDPOINT_COMPANY_LOGO=your_company_logo_r2_endpoint
R2_ACCESS_KEY_ID_COMPANY_LOGO=your_company_logo_access_key
R2_SECRET_ACCESS_KEY_COMPANY_LOGO=your_company_logo_secret_key
R2_BUCKET_NAME_COMPANY_LOGO=your_company_logo_bucket_name

NEXTAUTH_SECRET=your_nextauth_secret
```

### Run Locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Demo Access

These accounts are included for evaluation and testing.

### Student

- Email: alice.johnson@example.edu
- Password: 12345678

### Company

- Email: hr@google.com
- Password: 12345678

### Admin

- Email: super.admin@example.com
- Password: 12345678

## Live Deployment

Live URL: https://internmatch.vercel.app
