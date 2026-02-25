import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  HomeIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
  BuildingLibraryIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  UserCircleIcon,
  DocumentCheckIcon,
  CloudArrowUpIcon,
  FlagIcon,
  GlobeAltIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { useAuth, useRole } from '@/hooks';
import { ROLES } from '@/models';
import { ModeToggle, Avatar, Dropdown } from '@/components/shared';

/* ── Sidebar link configs per role ─────────────────────── */
const linksByRole = {
  admin: [
    { to: '/admin', label: 'Dashboard', icon: HomeIcon },
    { to: '/admin/campuses', label: 'Campuses', icon: BuildingLibraryIcon },
    { to: '/admin/users', label: 'Users', icon: UsersIcon },
    { to: '/admin/verifications', label: 'Verifications', icon: ShieldCheckIcon },
    { to: '/admin/analytics', label: 'Analytics', icon: ChartBarIcon },
    { to: '/admin/moderation', label: 'Moderation', icon: FlagIcon },
    { to: '/admin/chat', label: 'Messages', icon: ChatBubbleLeftRightIcon },
    { to: '/admin/settings', label: 'Settings', icon: Cog6ToothIcon },
  ],
  campus: [
    { to: '/campus', label: 'Dashboard', icon: HomeIcon },
    { to: '/campus/students', label: 'Students', icon: AcademicCapIcon },
    { to: '/campus/gigs', label: 'Gig Monitor', icon: BriefcaseIcon },
    { to: '/campus/activity', label: 'Activity', icon: ChartBarIcon },
    { to: '/campus/verifications', label: 'Verifications', icon: DocumentCheckIcon },
    { to: '/campus/opportunities', label: 'Opportunities', icon: BuildingLibraryIcon },
    { to: '/campus/analytics', label: 'Analytics', icon: ChartBarIcon },
    { to: '/campus/chat', label: 'Messages', icon: ChatBubbleLeftRightIcon },
    { to: '/campus/profile', label: 'Campus Profile', icon: UserCircleIcon },
    { to: '/campus/settings', label: 'Settings', icon: Cog6ToothIcon },
  ],
  freelancer: [
    { to: '/student', label: 'Dashboard', icon: HomeIcon },
    { to: '/student/profile', label: 'My Profile', icon: UserCircleIcon },
    { to: '/student/gigs', label: 'Browse Gigs', icon: BriefcaseIcon },
    { to: '/student/applications', label: 'Applications', icon: ClipboardDocumentListIcon },
    { to: '/student/submissions', label: 'Submissions', icon: CloudArrowUpIcon },
    { to: '/student/analytics', label: 'Analytics', icon: ChartBarIcon },
    { to: '/student/cross-campus', label: 'Cross-Campus', icon: GlobeAltIcon },
    { to: '/student/advanced', label: 'AI & Reputation', icon: SparklesIcon },
    { to: '/student/chat', label: 'Messages', icon: ChatBubbleLeftRightIcon },
  ],
  recruiter: [
    { to: '/student', label: 'Dashboard', icon: HomeIcon },
    { to: '/student/profile', label: 'My Profile', icon: UserCircleIcon },
    { to: '/student/post-gig', label: 'Post a Gig', icon: BriefcaseIcon },
    { to: '/student/my-gigs', label: 'My Gigs', icon: ClipboardDocumentListIcon },
    { to: '/student/applicants', label: 'Applicants', icon: UserGroupIcon },
    { to: '/student/recruitment-status', label: 'Pipeline', icon: ChartBarIcon },
    { to: '/student/analytics', label: 'Analytics', icon: ChartBarIcon },
    { to: '/student/cross-campus', label: 'Cross-Campus', icon: GlobeAltIcon },
    { to: '/student/advanced', label: 'AI & Reputation', icon: SparklesIcon },
    { to: '/student/chat', label: 'Messages', icon: ChatBubbleLeftRightIcon },
  ],
};

/* ── Sidebar Section Dividers ─────────────────────────────── */
const sectionDividers = {
  admin: { 4: 'Management', 0: 'Overview' },
  campus: { 3: 'Settings', 0: 'Overview' },
  freelancer: { 2: 'Marketplace', 5: 'Advanced', 0: 'Overview' },
  recruiter: { 2: 'Hiring', 6: 'Advanced', 0: 'Overview' },
};

function SidebarLink({ to, label, icon: Icon, onClick }) {
  return (
    <NavLink
      to={to}
      end
      onClick={onClick}
      className={({ isActive }) =>
        clsx(
          'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        )
      }
      aria-label={label}
    >
      <Icon className={clsx('h-5 w-5 shrink-0 transition-transform group-hover:scale-110')} />
      <span>{label}</span>
    </NavLink>
  );
}

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const { effectiveRole } = useRole();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = linksByRole[effectiveRole] ?? [];
  const dividers = sectionDividers[effectiveRole] ?? {};
  const isStudent = user?.type === ROLES.STUDENT;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const profileItems = [
    { label: 'Profile', icon: UserCircleIcon, onClick: () => navigate(isStudent ? '/student/profile' : '#') },
    { label: 'Settings', icon: Cog6ToothIcon, onClick: () => navigate(`/${user?.type ?? 'student'}/settings`) },
    { divider: true, key: 'div1' },
    { label: 'Sign out', icon: ArrowRightStartOnRectangleIcon, onClick: handleLogout, danger: true },
  ];

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-lg shadow-indigo-200">
          <BriefcaseIcon className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          SkillBridge
        </span>
      </div>

      {/* Mode toggle (students only) */}
      {isStudent && (
        <div className="mx-4 mb-2 rounded-xl border border-gray-100 bg-gray-50/50 px-3 py-3">
          <ModeToggle />
        </div>
      )}

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1" aria-label="Main navigation">
        {links.map((link, i) => (
          <div key={link.to}>
            {dividers[i] && (
              <p className="mb-2 mt-4 px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 first:mt-0">
                {dividers[i]}
              </p>
            )}
            <SidebarLink {...link} onClick={() => setSidebarOpen(false)} />
          </div>
        ))}
      </nav>

      {/* User card */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
          <Avatar name={user?.name} size="sm" status="online" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-900">{user?.name}</p>
            <p className="truncate text-xs text-gray-500 capitalize">{effectiveRole}</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
            aria-label="Logout"
          >
            <ArrowRightStartOnRectangleIcon className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* ── Mobile overlay ──────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar — Desktop ───────────────────── */}
      <aside className="hidden lg:flex lg:w-[16.5rem] lg:flex-col border-r border-gray-100 bg-white">
        {sidebarContent}
      </aside>

      {/* ── Sidebar — Mobile ────────────────────── */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-white shadow-2xl transition-transform duration-300 lg:hidden',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute right-3 top-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Close sidebar"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
        {sidebarContent}
      </aside>

      {/* ── Main column ─────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md px-4 sm:px-6 lg:px-8">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <Bars3Icon className="h-5 w-5" />
          </button>

          {/* Breadcrumb / search placeholder */}
          <div className="hidden lg:block">
            <p className="text-sm text-gray-500">
              Welcome back, <span className="font-semibold text-gray-900">{user?.name?.split(' ')[0]}</span>
            </p>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <button
              className="relative rounded-xl p-2 text-gray-500 transition-colors hover:bg-gray-100"
              aria-label="Notifications"
            >
              <BellIcon className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
              </span>
            </button>

            {/* Profile dropdown */}
            <Dropdown
              trigger={
                <button className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-gray-100">
                  <Avatar name={user?.name} size="sm" />
                  <span className="hidden text-sm font-medium text-gray-700 sm:block">
                    {user?.name?.split(' ')[0]}
                  </span>
                </button>
              }
              items={profileItems}
            />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
