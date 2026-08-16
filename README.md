<div align="center">

# QUICK AI ⚡

AI-Powered Content Generation at Your Fingertips

![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![Version](https://img.shields.io/badge/version-1.0.0-success?style=flat-square)

*Powered by cutting-edge technologies:*

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=flat-square&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat-square&logo=clerk&logoColor=white)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [AI Capabilities](#ai-capabilities)
- [API Endpoints](#api-endpoints)
- [License](#license)

---

## Overview

QUICK AI is a comprehensive AI SaaS platform that provides:

- 🎨 AI Image Generation and Editing
- 📝 Intelligent Content Creation
- 📄 Resume Review and Optimization
- 🖼️ Background Removal and Object Removal
- ✍️ Article and Blog Title Generation
- 👥 Community Sharing Features

Built with the PERN stack (PostgreSQL, Express, React, Node.js) and integrated with Gemini and OpenAI APIs.

---

## Key Features

### 🤖 AI-Powered Tools
- **Generate Images**: Create photorealistic visuals from text descriptions
- **Remove Background**: Precision background removal from images
- **Remove Objects**: Clean up photos by erasing unwanted elements
- **Write Articles**: Exhaustive, long-form AI article writing
- **Blog Titles**: Generate viral, high-CTR blog headlines
- **Review Resume**: AI-powered ATS resume analysis and feedback

### 👤 User Experience
- **Secure Authentication**: Powered by Clerk
- **Dashboard**: Central hub for all AI tools
- **Community**: Share and discover public creations
- **Responsive Design**: Mobile drawer and desktop sidebar
- **Real-time Processing**: Instant AI results

---

## Tech Stack

### Frontend (Client)
- **React 19** - Latest React with concurrent features
- **Vite** - Next-generation build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Router DOM** - Client-side routing
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **React Markdown** - Markdown rendering
- **Clerk** - Authentication and user management

### Backend (Server)
- **Node.js** - JavaScript runtime
- **Express 5** - Web framework for Node.js
- **PostgreSQL** - Relational database (via Neon)
- **OpenAI / Gemini API** - AI model integration
- **Cloudinary** - Image and file management
- **Multer** - File upload handling
- **PDF-Parse** - PDF text extraction

---

## Architecture

```
QuickAI/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── assets/        # Static assets
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route pages
│   │   └── ...           # Config files
│
├── server/                # Express Backend
│   ├── configs/          # Database & service configs
│   ├── controllers/      # Business logic
│   ├── middlewares/      # Custom auth middlewares
│   ├── routes/           # API endpoints
│   └── server.js         # Entry point
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- PostgreSQL database
- OpenAI / Gemini API key
- Cloudinary credentials
- Clerk credentials

### Installation

1. Clone the repository:
```console
git clone https://github.com/your-username/QuickAI.git
cd QuickAI
```

2. Install client dependencies:
```console
cd client && npm install
```

3. Install server dependencies:
```console
cd ../server && npm install
```

### Environment Variables

**Client (.env)**
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_BASE_URL=http://localhost:3000
```

**Server (.env)**
```env
GEMINI_API_KEY=your-gemini-api-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
DATABASE_URL=your-postgres-connection-string
CLERK_SECRET_KEY=sk_test_...
PORT=3000
```

4. Start development servers:
```console
# Terminal 1 - Start backend
cd server && npm run server

# Terminal 2 - Start frontend
cd client && npm run dev
```

---

## API Endpoints

### AI Routes (`/api/ai`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/generate-image` | Generate images from text |
| POST | `/remove-image-background` | Remove image backgrounds |
| POST | `/remove-image-object` | Remove objects from images |
| POST | `/generate-article` | Generate long-form article content |
| POST | `/generate-blog-title` | Create viral blog post titles |
| POST | `/resume-review` | Analyze and score resumes |

---

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.

---

<div align="center">

**QUICK AI** - Supercharge your creativity with AI! 🚀

</div>
