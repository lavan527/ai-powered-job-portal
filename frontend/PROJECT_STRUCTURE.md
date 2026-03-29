# Job Portal - Project Structure

## Overview
A modern, professional job portal web application built with React, TypeScript, and Tailwind CSS. Features role-based authentication for both job seekers and recruiters.

## Design System

### Color Palette
- **Primary**: #4F46E5 (Indigo) - Main brand color for buttons, links, accents
- **Background**: #F9FAFB (Light Gray) - Main background color
- **Text**: #111827 (Dark Gray) - Primary text color
- **Secondary**: #6B7280 (Medium Gray) - Secondary text and elements
- **Accent**: #E0E7FF (Light Indigo) - Highlights and hover states
- **Border**: #E5E7EB - Card borders and dividers

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- Clean, modern, and highly legible

### UI Elements
- **Border Radius**: 12px (0.75rem) - Soft, rounded corners
- **Spacing**: 16px/24px grid system
- **Shadows**: Subtle shadow-lg on cards
- **Buttons**: Rounded, consistent primary and secondary variants

## Application Structure

### Pages

1. **Landing Page** (`/`)
   - Hero section with search bar
   - Featured jobs display
   - Stats section
   - Call-to-action section
   - Full footer

2. **Job Listing Page** (`/jobs`)
   - Sidebar with filters (location, skills, salary, job type)
   - Job cards grid/list
   - Search functionality
   - Real-time filtering

3. **Job Details Page** (`/jobs/:id`)
   - Complete job information
   - Company overview
   - Skills required
   - Salary information
   - Apply button
   - Save job functionality

4. **Login Page** (`/login`)
   - Role selection (Job Seeker / Recruiter)
   - Email/password authentication
   - Forgot password link
   - Register link

5. **Register Page** (`/register`)
   - Role selection
   - Name, email, password fields
   - Terms and conditions
   - Login link

6. **Dashboard** (`/dashboard`)
   - **Job Seeker View**:
     - Applied jobs list
     - Saved jobs
     - Profile summary
   - **Recruiter View**:
     - Posted jobs list
     - Application statistics
     - Edit/Delete job options

7. **Add Job Page** (`/add-job`) - Recruiter only
   - Job posting form
   - Title, company, location
   - Job description
   - Skills required
   - Salary range

8. **Profile Page** (`/profile`)
   - User information
   - Editable fields
   - Skills management (Job Seekers)
   - Company info (Recruiters)
   - Resume upload option

9. **404 Page** (`/*`)
   - Not found message
   - Return to home button

### Components

#### Layout Components
- **Navbar**: Logo, navigation links, auth buttons/user menu
- **Footer**: Multi-column footer with links and info
- **Layout**: Wrapper component with Navbar + Outlet + Footer

#### UI Components
- **JobCard**: Reusable job display card
- All shadcn/ui components (Button, Input, Badge, etc.)

### Data & Context

#### AuthContext
- User authentication state
- Login/logout functionality
- Role-based access (jobseeker/recruiter)
- User profile information

#### Mock Data
- 8 sample jobs with realistic data
- Featured jobs
- Different job types and locations

## Key Features

### Authentication
- Role-based login (Job Seeker / Recruiter)
- Protected routes
- User session management
- Different dashboards per role

### Job Seeker Features
- Browse and search jobs
- Apply to jobs
- Save favorite jobs
- View application history
- Manage profile and skills

### Recruiter Features
- Post new jobs
- Edit existing jobs
- View applications
- Manage job listings
- Track hiring metrics

### Search & Filtering
- Keyword search
- Location filter
- Job type filter
- Skills filter
- Salary range slider

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router** - Navigation and routing
- **Tailwind CSS v4** - Styling
- **Lucide React** - Icons
- **Sonner** - Toast notifications
- **shadcn/ui** - UI component library

## File Structure

```
/src
  /app
    /components
      - Navbar.tsx
      - Footer.tsx
      - JobCard.tsx
      - Layout.tsx
      /ui (shadcn components)
    /context
      - AuthContext.tsx
    /data
      - jobs.ts
    /pages
      - LandingPage.tsx
      - JobListingPage.tsx
      - JobDetailsPage.tsx
      - LoginPage.tsx
      - RegisterPage.tsx
      - DashboardPage.tsx
      - AddJobPage.tsx
      - ProfilePage.tsx
      - NotFoundPage.tsx
    - routes.ts
    - App.tsx
  /styles
    - fonts.css
    - theme.css
    - tailwind.css
    - index.css
```

## Usage

### For Job Seekers
1. Register as a Job Seeker
2. Browse available jobs
3. Use filters to find relevant positions
4. View job details and apply
5. Track applications in dashboard
6. Manage profile and skills

### For Recruiters
1. Register as a Recruiter
2. Post new job listings
3. Manage existing jobs
4. View applications
5. Edit or delete jobs
6. Track hiring metrics

## Demo Notes
- All authentication is mock-based
- No real backend connection
- Use any email/password to login
- Data persists only during session
