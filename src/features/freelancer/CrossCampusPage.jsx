import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { PageHeader, Card, CardHeader, Badge, StatCard, Button, Avatar } from '@/components/shared';
import { useRole } from '@/hooks';
import { STUDENT_MODES } from '@/models';
import {
  GlobeAltIcon,
  BuildingLibraryIcon,
  BriefcaseIcon,
  UsersIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  MapPinIcon,
  ArrowsRightLeftIcon,
  UserGroupIcon,
  StarIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

/* ── Mock Data ────────────────────────────────── */
const CAMPUSES = ['All Campuses', 'MIT', 'Stanford', 'Harvard', 'Caltech', 'Yale', 'Princeton'];

const CROSS_CAMPUS_GIGS = [
  { id: 'xg-1', title: 'Full-Stack Web App', budget: 500, campus: 'MIT', crossCampus: true, targetCampuses: ['Stanford', 'Harvard'], postedBy: 'Sarah Kim', skills: ['React', 'Node.js', 'PostgreSQL'], applicants: 12, deadline: 'Mar 15', collaboration: true, rating: 4.8 },
  { id: 'xg-2', title: 'Research Data Pipeline', budget: 350, campus: 'Stanford', crossCampus: true, targetCampuses: ['MIT', 'Caltech'], postedBy: 'Dr. Lee', skills: ['Python', 'AWS', 'Spark'], applicants: 8, deadline: 'Mar 20', collaboration: true, rating: 4.9 },
  { id: 'xg-3', title: 'Campus Event Branding', budget: 200, campus: 'Harvard', crossCampus: true, targetCampuses: ['Yale', 'Princeton'], postedBy: 'Alex Rivera', skills: ['Figma', 'Illustrator', 'Branding'], applicants: 15, deadline: 'Mar 10', collaboration: false, rating: 4.7 },
  { id: 'xg-4', title: 'ML Model Training', budget: 800, campus: 'Caltech', crossCampus: true, targetCampuses: ['MIT', 'Stanford', 'Harvard'], postedBy: 'Eva Chen', skills: ['PyTorch', 'Python', 'CUDA'], applicants: 6, deadline: 'Apr 1', collaboration: true, rating: 5.0 },
  { id: 'xg-5', title: 'Mobile App UI/UX Audit', budget: 250, campus: 'Yale', crossCampus: false, targetCampuses: [], postedBy: 'Jordan Park', skills: ['Figma', 'UX Research'], applicants: 10, deadline: 'Mar 12', collaboration: false, rating: 4.6 },
  { id: 'xg-6', title: 'Cross-Campus Newsletter Platform', budget: 450, campus: 'Princeton', crossCampus: true, targetCampuses: ['MIT', 'Stanford', 'Caltech', 'Harvard', 'Yale'], postedBy: 'Grace Wilson', skills: ['React', 'Firebase', 'Tailwind'], applicants: 18, deadline: 'Mar 25', collaboration: true, rating: 4.5 },
];

const MULTI_CAMPUS_STUDENTS = [
  { name: 'Alice Johnson', primaryCampus: 'MIT', linkedCampuses: ['Stanford'], skills: ['React', 'Python', 'Data Science'], rating: 4.9, gigs: 28, available: true },
  { name: 'Bob Williams', primaryCampus: 'Stanford', linkedCampuses: ['MIT', 'Caltech'], skills: ['ML', 'Python', 'AWS'], rating: 4.8, gigs: 24, available: true },
  { name: 'Carol Chen', primaryCampus: 'Harvard', linkedCampuses: ['Yale'], skills: ['UX Design', 'Figma', 'Research'], rating: 4.7, gigs: 18, available: false },
  { name: 'David Lee', primaryCampus: 'Caltech', linkedCampuses: ['MIT', 'Stanford'], skills: ['CUDA', 'PyTorch', 'C++'], rating: 4.9, gigs: 15, available: true },
  { name: 'Eva Martinez', primaryCampus: 'Yale', linkedCampuses: ['Princeton', 'Harvard'], skills: ['Writing', 'Marketing', 'Design'], rating: 4.6, gigs: 12, available: true },
];

const COLLABORATION_PROJECTS = [
  { title: 'Inter-University Hackathon Platform', campuses: ['MIT', 'Stanford', 'Caltech'], members: 8, status: 'active', progress: 65 },
  { title: 'Cross-Campus Research DB', campuses: ['Harvard', 'Yale', 'Princeton'], members: 5, status: 'active', progress: 40 },
  { title: 'Joint Career Fair App', campuses: ['MIT', 'Harvard'], members: 4, status: 'planning', progress: 15 },
  { title: 'Campus-to-Campus Mentorship', campuses: ['Stanford', 'Caltech', 'MIT'], members: 12, status: 'active', progress: 80 },
];

export default function CrossCampusPage() {
  const { activeMode } = useRole();
  const [campusFilter, setCampusFilter] = useState('All Campuses');
  const [search, setSearch] = useState('');
  const [showCollabOnly, setShowCollabOnly] = useState(false);
  const [activeTab, setActiveTab] = useState('gigs');

  if (activeMode === STUDENT_MODES.RECRUITER) return <Navigate to="/student" replace />;

  const filteredGigs = CROSS_CAMPUS_GIGS.filter((g) => {
    if (campusFilter !== 'All Campuses' && g.campus !== campusFilter && !g.targetCampuses.includes(campusFilter)) return false;
    if (search && !g.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (showCollabOnly && !g.collaboration) return false;
    return true;
  });

  return (
    <div>
      <PageHeader
        title="Cross-Campus Hub"
        subtitle="Discover opportunities and collaborate across universities"
        actions={
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-600">
              <GlobeAltIcon className="h-4 w-4" />
              {CAMPUSES.length - 1} Campuses Connected
            </span>
          </div>
        }
      />

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        <StatCard title="Cross-Campus Gigs" value={String(CROSS_CAMPUS_GIGS.filter((g) => g.crossCampus).length)} change="Multi-campus" icon={GlobeAltIcon} color="indigo" />
        <StatCard title="Connected Campuses" value="6" change="Actively sharing" icon={BuildingLibraryIcon} color="purple" />
        <StatCard title="Multi-Campus Students" value={String(MULTI_CAMPUS_STUDENTS.length)} change="Cross-enrolled" icon={UsersIcon} color="emerald" />
        <StatCard title="Collaborations" value={String(COLLABORATION_PROJECTS.length)} change="Active projects" icon={ArrowsRightLeftIcon} color="amber" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-gray-100 p-1 mb-6">
        {[
          { key: 'gigs', label: 'Cross-Campus Gigs', icon: BriefcaseIcon },
          { key: 'students', label: 'Multi-Campus Profiles', icon: UsersIcon },
          { key: 'collab', label: 'Collaborations', icon: ArrowsRightLeftIcon },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${activeTab === t.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Gigs Tab ─────────────────────────── */}
      {activeTab === 'gigs' && (
        <div>
          {/* Filters */}
          <Card className="mb-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search cross-campus gigs..." className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
              </div>
              <select value={campusFilter} onChange={(e) => setCampusFilter(e.target.value)} className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100">
                {CAMPUSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={showCollabOnly} onChange={(e) => setShowCollabOnly(e.target.checked)} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="text-sm text-gray-600">Collaboration only</span>
              </label>
            </div>
          </Card>

          {/* Gig Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {filteredGigs.map((g) => (
              <Card key={g.id} className="hover:ring-2 hover:ring-indigo-200 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900">{g.title}</h3>
                      {g.crossCampus && (
                        <span className="flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-600">
                          <GlobeAltIcon className="h-3 w-3" /> Cross-Campus
                        </span>
                      )}
                      {g.collaboration && (
                        <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-600">
                          <UserGroupIcon className="h-3 w-3" /> Collab
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">by {g.postedBy}</p>
                  </div>
                  <span className="text-sm font-bold text-emerald-600">${g.budget}</span>
                </div>

                {/* Campus badges */}
                <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                  <Badge color="indigo" size="sm">
                    <MapPinIcon className="h-3 w-3 mr-0.5 inline" /> {g.campus}
                  </Badge>
                  {g.targetCampuses.map((tc) => (
                    <Badge key={tc} color="gray" size="sm">{tc}</Badge>
                  ))}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {g.skills.map((s) => (
                    <span key={s} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{s}</span>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <span>{g.applicants} applicants</span>
                    <span>Due {g.deadline}</span>
                    <span className="flex items-center gap-0.5">
                      <StarIcon className="h-3 w-3 text-amber-400" /> {g.rating}
                    </span>
                  </div>
                  <Link to={`/student/gigs/${g.id}`} className="text-indigo-600 font-medium hover:text-indigo-700">View &rarr;</Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── Students Tab ─────────────────────── */}
      {activeTab === 'students' && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MULTI_CAMPUS_STUDENTS.map((s) => (
            <Card key={s.name} className="hover:ring-2 hover:ring-indigo-200 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Avatar name={s.name} size="md" status={s.available ? 'online' : 'offline'} />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{s.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <AcademicCapIcon className="h-3.5 w-3.5" />
                    {s.primaryCampus}
                    {s.linkedCampuses.length > 0 && (
                      <span className="text-indigo-500"> + {s.linkedCampuses.join(', ')}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {s.skills.map((sk) => (
                  <span key={sk} className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600">{sk}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-0.5"><StarIcon className="h-3 w-3 text-amber-400" /> {s.rating}</span>
                  <span>{s.gigs} gigs</span>
                </div>
                <Badge color={s.available ? 'green' : 'gray'} dot size="sm">{s.available ? 'Available' : 'Busy'}</Badge>
              </div>

              {/* Multi-campus indicator */}
              {s.linkedCampuses.length > 0 && (
                <div className="mt-3 flex items-center gap-1 rounded-lg bg-indigo-50/50 px-3 py-2">
                  <GlobeAltIcon className="h-3.5 w-3.5 text-indigo-500" />
                  <span className="text-[10px] font-medium text-indigo-600">Multi-Campus Profile &bull; {s.linkedCampuses.length + 1} campuses</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* ── Collaborations Tab ────────────────── */}
      {activeTab === 'collab' && (
        <div className="space-y-4">
          {COLLABORATION_PROJECTS.map((p) => (
            <Card key={p.title} className="hover:ring-2 hover:ring-indigo-200 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-gray-900">{p.title}</h3>
                    <Badge color={p.status === 'active' ? 'green' : 'yellow'} size="sm">{p.status}</Badge>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    {p.campuses.map((c) => (
                      <Badge key={c} color="indigo" size="sm">
                        <BuildingLibraryIcon className="h-3 w-3 mr-0.5 inline" /> {c}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><UserGroupIcon className="h-3.5 w-3.5" /> {p.members} members</span>
                    <span>{p.campuses.length} campuses</span>
                  </div>
                </div>
                {/* Progress Circle */}
                <div className="relative h-14 w-14 shrink-0">
                  <svg className="h-14 w-14 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" strokeWidth="3" stroke="#f3f4f6" />
                    <circle cx="18" cy="18" r="14" fill="none" strokeWidth="3" stroke="#6366f1" strokeDasharray={`${p.progress} 100`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-900">{p.progress}%</span>
                  </div>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-400 transition-all duration-700" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
