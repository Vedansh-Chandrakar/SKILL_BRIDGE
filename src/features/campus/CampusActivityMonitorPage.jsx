import { useState } from 'react';
import {
  PageHeader, Card, CardHeader, Badge, Avatar, Button,
} from '@/components/shared';
import {
  ChartBarIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  FlagIcon,
} from '@heroicons/react/24/outline';

const ACTIVITY_FEED = [
  { id: 'af-1', type: 'gig_posted', user: 'Sarah K.', detail: 'posted a new gig "Build a Portfolio Website"', time: '2 hours ago', icon: BriefcaseIcon, color: 'text-indigo-600 bg-indigo-50' },
  { id: 'af-2', type: 'application', user: 'Alex Rivera', detail: 'applied to "React Dashboard UI"', time: '3 hours ago', icon: CheckCircleIcon, color: 'text-emerald-600 bg-emerald-50' },
  { id: 'af-3', type: 'accepted', user: 'Jordan Park', detail: 'was accepted for "React Dashboard UI"', time: '5 hours ago', icon: CheckCircleIcon, color: 'text-green-600 bg-green-50' },
  { id: 'af-4', type: 'gig_completed', user: 'Li Wei', detail: 'completed "Python Data Pipeline"', time: '8 hours ago', icon: CheckCircleIcon, color: 'text-purple-600 bg-purple-50' },
  { id: 'af-5', type: 'flagged', user: 'System', detail: 'flagged "Inappropriate Gig Title" for review', time: '1 day ago', icon: FlagIcon, color: 'text-red-600 bg-red-50' },
  { id: 'af-6', type: 'new_student', user: 'Priya Sharma', detail: 'joined the campus as Freelancer', time: '1 day ago', icon: UserGroupIcon, color: 'text-blue-600 bg-blue-50' },
  { id: 'af-7', type: 'gig_posted', user: 'Mike T.', detail: 'posted a new gig "Tutoring — Calculus II"', time: '1 day ago', icon: BriefcaseIcon, color: 'text-indigo-600 bg-indigo-50' },
  { id: 'af-8', type: 'gig_deleted', user: 'Campus Admin', detail: 'removed "Spam Post" — violated policies', time: '2 days ago', icon: ExclamationTriangleIcon, color: 'text-red-600 bg-red-50' },
];

const WEEKLY_STATS = [
  { day: 'Mon', gigs: 3, apps: 8 },
  { day: 'Tue', gigs: 1, apps: 5 },
  { day: 'Wed', gigs: 4, apps: 12 },
  { day: 'Thu', gigs: 2, apps: 7 },
  { day: 'Fri', gigs: 5, apps: 15 },
  { day: 'Sat', gigs: 1, apps: 3 },
  { day: 'Sun', gigs: 0, apps: 1 },
];

const TOP_STUDENTS = [
  { name: 'Jordan Park', gigs: 24, rating: 4.9, earnings: '$3,200' },
  { name: 'Alex Rivera', gigs: 15, rating: 4.8, earnings: '$1,850' },
  { name: 'Sam Chen', gigs: 12, rating: 4.5, earnings: '$1,420' },
  { name: 'Li Wei', gigs: 9, rating: 4.7, earnings: '$1,100' },
  { name: 'Priya Sharma', gigs: 7, rating: 4.6, earnings: '$890' },
];

const CATEGORY_BREAKDOWN = [
  { name: 'Web Development', count: 18, pct: 35, color: 'bg-indigo-500' },
  { name: 'Design & Creative', count: 12, pct: 23, color: 'bg-purple-500' },
  { name: 'Tutoring', count: 8, pct: 15, color: 'bg-amber-500' },
  { name: 'Data & Analytics', count: 6, pct: 12, color: 'bg-cyan-500' },
  { name: 'Mobile', count: 5, pct: 10, color: 'bg-pink-500' },
  { name: 'Other', count: 3, pct: 5, color: 'bg-gray-400' },
];

export default function CampusActivityMonitorPage() {
  const [timeRange, setTimeRange] = useState('7d');

  const maxApps = Math.max(...WEEKLY_STATS.map((s) => s.apps));

  return (
    <div>
      <PageHeader
        title="Activity Monitor"
        subtitle="Track campus marketplace activity and trends."
        actions={
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 pr-9 text-sm text-gray-700 shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-gray-300"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        }
      />

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { label: 'Active Students', value: '142', change: '+12%', cls: 'text-indigo-600', bg: 'bg-indigo-50', Icon: UserGroupIcon },
          { label: 'Gigs This Week', value: '16', change: '+8%', cls: 'text-emerald-600', bg: 'bg-emerald-50', Icon: BriefcaseIcon },
          { label: 'Applications', value: '51', change: '+23%', cls: 'text-blue-600', bg: 'bg-blue-50', Icon: CheckCircleIcon },
          { label: 'Avg. Response Time', value: '4.2h', change: '-15%', cls: 'text-amber-600', bg: 'bg-amber-50', Icon: ClockIcon },
        ].map((c) => (
          <Card key={c.label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">{c.label}</p>
                <p className={`text-2xl font-bold ${c.cls} mt-1`}>{c.value}</p>
                <p className={`text-xs mt-1 flex items-center gap-1 ${c.change.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>
                  <ArrowTrendingUpIcon className="h-3 w-3" /> {c.change} vs last week
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center`}>
                <c.Icon className={`h-6 w-6 ${c.cls}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Weekly Activity Chart (simple bar chart) ── */}
        <Card className="lg:col-span-2">
          <CardHeader title="Weekly Activity" />
          <div className="flex items-end gap-3 h-48 mt-4">
            {WEEKLY_STATS.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 justify-center" style={{ height: '140px', alignItems: 'flex-end' }}>
                  <div
                    className="w-3 rounded-t-md bg-indigo-400 transition-all"
                    style={{ height: `${(d.gigs / 5) * 100}%`, minHeight: d.gigs > 0 ? '8px' : '2px' }}
                    title={`${d.gigs} gigs`}
                  />
                  <div
                    className="w-3 rounded-t-md bg-emerald-400 transition-all"
                    style={{ height: `${(d.apps / maxApps) * 100}%`, minHeight: d.apps > 0 ? '8px' : '2px' }}
                    title={`${d.apps} applications`}
                  />
                </div>
                <span className="text-xs text-gray-500">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-indigo-400" /> Gigs Posted</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-400" /> Applications</span>
          </div>
        </Card>

        {/* ── Category Breakdown ── */}
        <Card>
          <CardHeader title="Categories" />
          <div className="space-y-3 mt-2">
            {CATEGORY_BREAKDOWN.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-700 font-medium">{cat.name}</span>
                  <span className="text-gray-400">{cat.count} ({cat.pct}%)</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className={`h-full rounded-full ${cat.color} transition-all`} style={{ width: `${cat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Top Performers ── */}
        <Card>
          <CardHeader title="Top Performers" />
          <div className="space-y-3 mt-2">
            {TOP_STUDENTS.map((s, i) => (
              <div key={s.name} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  i === 0 ? 'bg-amber-100 text-amber-700' : i === 1 ? 'bg-gray-100 text-gray-600' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-gray-400'
                }`}>
                  {i + 1}
                </span>
                <Avatar name={s.name} size="xs" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{s.name}</p>
                  <p className="text-xs text-gray-400">{s.gigs} gigs • ⭐ {s.rating}</p>
                </div>
                <span className="text-sm font-semibold text-emerald-600">{s.earnings}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Activity Feed ── */}
        <Card className="lg:col-span-2">
          <CardHeader title="Recent Activity Feed" />
          <div className="mt-2 space-y-0 divide-y divide-gray-50">
            {ACTIVITY_FEED.map((item) => (
              <div key={item.id} className="flex items-start gap-3 py-3">
                <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center shrink-0`}>
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">{item.user}</span> {item.detail}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
