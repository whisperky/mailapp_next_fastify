# Email Client Application

A modern web application for managing emails with a clean, Apple Mail-style interface. Built with Next.js frontend and Fastify backend.

## 🚀 Features

- 📧 Complete email management system with intuitive interface
- 🔍 Advanced search capabilities across all emails and leads
- 📱 Responsive design that works on desktop, tablet, and mobile
- 🔄 Real-time updates and synchronization
- 🎨 Modern, clean UI inspired by Apple Mail
- 🔐 Secure data handling and storage
- 📊 Lead tracking and management integration
- ⚡ Fast performance with optimized database queries
- 🌐 Cross-browser compatibility
- 🎯 Zero configuration setup process

### Frontend Features

- Apple Mail-style sidebar navigation
- Real-time email search with debouncing
- Email composition with To, CC, BCC support
- Material-UI based responsive design
- Email list filtering and management
- Archive and favorite functionality

### Backend Features

- RESTful API endpoints for email management
- SQLite database integration
- Email search functionality
- Lead management system
- CORS enabled for secure frontend communication

## 🏗️ Architecture

### Frontend (@frontend)

- **Framework**: Next.js 14
- **UI Library**: Material-UI (MUI)
- **State Management**: React Hooks
- **Styling**: CSS Modules + MUI Theming
- **Icons**: MUI Icons

### Backend (@backend)

- **Framework**: Fastify
- **Database**: SQLite3
- **ORM**: Knex.js
- **Testing**: Jest

## 📁 Project Structure

### Frontend Structure

#### frontend/
#### ├── src/
#### │ ├── pages/ # Next.js pages
#### │ ├── styles/ # Global styles and CSS modules
#### │ ├── components/ # Reusable React components
#### │ └── theme/ # MUI theme configuration
#### ├── public/ # Static assets
#### └── package.json # Dependencies and scripts

### Backend Structure

#### backend/
#### ├── src/
#### │ ├── db/ # Database configuration and repositories
#### │ ├── routes/ # API route handlers
#### │ └── services/ # Business logic
#### ├── migrations/ # Database migrations
#### ├── tests/ # Test files
#### └── package.json # Dependencies and scripts

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version)
- Yarn package manager
- SQLite3

### Installation

1. Frontend Setup

```bash
   cd frontend
   yarn install
   yarn dev
```

Frontend will be available at `http://localhost:3000`

2. Backend Setup

```bash
   cd backend
   yarn install
   yarn migrate
   yarn seed
   yarn dev
```

Backend will be available at `http://localhost:3001`

## 🔌 API Endpoints

### Email Routes

- `GET /api/emails` - Get all emails
- `GET /api/emails?search={query}` - Search emails
- `GET /api/emails/:id` - Get email by ID
- `POST /api/emails` - Create new email
- `DELETE /api/emails/:id` - Delete email
- `PUT /api/emails/:id/favorite` - Toggle favorite status
- `PUT /api/emails/:id/archive` - Toggle archive status

### Lead Routes

- `GET /api/leads` - Get all leads
- `GET /api/leads/:id` - Get lead by ID
- `POST /api/leads` - Create new lead

## 💾 Database Schema

### Emails Table

- id (PRIMARY KEY)
- to
- cc
- bcc
- subject
- body
- created_at
- is_favorite
- is_archived

### Leads Table

- id (PRIMARY KEY)
- name
- email
- created_at

## 🔒 Environment Variables

### Frontend (.env)

NEXT_PUBLIC_API_URL=http://localhost:3001

## 🧪 Testing

### Running Backend Tests

```bash
   cd backend
   yarn test
```

## 📦 Build and Deployment

### Frontend Build

```bash
   cd frontend
   yarn build
```

## 🛠️ Technologies Used

### Frontend

- Next.js
- Material-UI
- Framer Motion
- Lodash

### Backend

- Fastify
- Knex.js
- SQLite3
- Jest

## 📝 Notes

- The application doesn't actually send emails; it only stores them in the database
- The frontend uses MUI

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## 📄 License

This project is licensed under the ISC License.
