import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { JobListingPage } from './pages/JobListingPage';
import { JobDetailsPage } from './pages/JobDetailsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { AddJobPage } from './pages/AddJobPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ResumeMatchPage } from './pages/ResumeMatchPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: LandingPage },
      { path: 'jobs', Component: JobListingPage },
      { path: 'jobs/:id', Component: JobDetailsPage },
      { path: 'resume-match', Component: ResumeMatchPage },
      { path: 'login', Component: LoginPage },
      { path: 'register', Component: RegisterPage },
      { path: 'dashboard', Component: DashboardPage },
      { path: 'add-job', Component: AddJobPage },
      { path: 'profile', Component: ProfilePage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);