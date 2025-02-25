
# MicroFin - Microfinance Platform

A full-stack TypeScript application for microfinance solutions, featuring loan management, KYC verification, and financial education modules.

## Features

- User Authentication
- Loan Application & Management
- KYC Verification
- Financial Education Modules
- AI-powered Loan Assessment
- Interactive Chat Support

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS, Radix UI
- Backend: Express.js, TypeScript
- Database: PostgreSQL with Drizzle ORM
- Authentication: Passport.js
- File Storage: Multer
- AI Integration: OpenAI

## Getting Started

1. Click the "Run" button in your Replit workspace
2. The application will start automatically on port 5000
3. Access the application through the provided URL in your Replit workspace

## Project Structure

```
├── client/          # Frontend React application
├── server/          # Express.js backend
└── shared/          # Shared TypeScript types and schemas
```

## API Endpoints

- `/api/loans` - Loan management
- `/api/chat` - AI chat support
- `/api/education` - Education module progress
- `/api/kyc` - KYC verification

## Environment Variables

The following environment variables are required:

- Database connection details
- OpenAI API key
- Session secret

These can be set using the Replit Secrets tool.

## Development

The project uses:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## License

MIT
