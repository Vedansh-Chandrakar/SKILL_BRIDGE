import { useState } from 'react';
import { PageHeader, Card, CardHeader, Badge, StatCard, Button, Avatar } from '@/components/shared';
import {
  ChartBarIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  TrophyIcon,
  ArrowTrendingUpIcon,
  ArrowDownTrayIcon,
  StarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

/* ── Mock Data ────────────────────────────────── */
const STATS = [
  { label: 'Avg Completion Rate', value: '87%', change: '+3.2%', changeType: 'positive', icon: ChartBarIcon, iconColor: 'bg-indigo-100 text-indigo-600' },
  { label: 'Avg Student Rating', value: '4.5', change: '+0.2', changeType: 'positive', icon: StarIcon, iconColor: 'bg-amber-100 text-amber-600' },
  { label: 'Total Placements', value: '112', change: '+8 this month', changeType: 'positive', icon: TrophyIcon, iconColor: 'bg-emerald-100 text-emerald-600' },
  { label: 'Active Freelancers', value: '284', change: '+15%', changeType: 'positive', icon: UserGroupIcon, iconColor: 'bg-purple-100 text-purple-600' },
];

const TOP_PERFORMERS = [
  { rank: 1, name: 'Alice Johnson', gigs: 28, rating: 4.9, earnings: '$4,200', badge: 'gold' },
  { rank: 2, name: 'Bob Williams', gigs: 24, rating: 4.8, earnings: '$3,800', badge: 'gold' },
  { rank: 3, name: 'Carol Chen', gigs: 22, rating: 4.7, earnings: '$3,400', badge: 'silver' },
  { rank: 4, name: 'David Lee', gigs: 19, rating: 4.6, earnings: '$2,900', badge: 'silver' },
  { rank: 5, name: 'Eva Martinez', gigs: 17, rating: 4.5, earnings: '$2,600', badge: 'bronze' },
  { rank: 6, name: 'Frank Wilson', gigs: 15, rating: 4.4, earnings: '$2,200', badge: 'bronze' },
  { rank: 7, name: 'Grace Park', gigs: 14, rating: 4.3, earnings: '$2,000', badge: null },
  { rank: 8, name: 'Henry Adams', gigs: 12, rating: 4.2, earnings: '$1,800', badge: null },
];

const MONTHLY_PERFORMANCE = [
  { month: 'Sep', completed: 24, posted: 32, applications: 86 },
  { month: 'Oct', completed: 28, posted: 38, applications: 104 },
  { month: 'Nov', completed: 32, posted: 42, applications: 118 },
  { month: 'Dec', completed: 26, posted: 30, applications: 92 },
  { month: 'Jan', completed: 36, posted: 45, applications: 132 },
  { month: 'Feb', completed: 42, posted: 52, applications: 156 },
];

const SKILL_DISTRIBUTION = [
  { skill: 'React / Frontend', count: 142, pct: 28 },
  { skill: 'Python / Data', count: 98, pct: 19 },
  { skill: 'Design / UI/UX', count: 86, pct: 17 },
  { skill: 'Node.js / Backend', count: 72, pct: 14 },
  { skill: 'Mobile Dev', count: 54, pct: 11 },
  { skill: 'Content Writing', count: 38, pct: 7 },
  { skill: 'Other', count: 22, pct: 4 },
];

const RECRUITMENT_STATS = [
  { company: 'TechCorp Inc.', positions: 5, applicants: 48, shortlisted: 12, hired: 3 },
  { company: 'DataFlow Labs', positions: 3, applicants: 32, shortlisted: 8, hired: 2 },
  { company: 'DesignHub Co.', positions: 4, applicants: 28, shortlisted: 10, hired: 4 },
  { company: 'CloudNet Systems', positions: 2, applicants: 22, shortlisted: 6, hired: 1 },
];

const badgeColors = { gold: '\u{1F947}', silver: '\u{1F948}', bronze: '\u{1F949}' };

export default function CampusAnalyticsPage() {
  const [period, setPeriod] = useState('6m');
  const maxVal = Math.max(...MONTHLY_PERFORMANCE.map((d) => d.applications));

  return (
    <div>
      <PageHeader
        title="Campus Analytics"
        subtitle="Student performance metrics and recruitment statistics"
        actions={
          <div className="flex items-center gap-2">
            <div className="flex rounded-xl bg-gray-100 p-0.5">
              {['1m', '3m', '6m', '1y'].map((p) => (
                <button key={p} onClick={() => setPeriod(p)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${period === p ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  {p.toUpperCase()}
                </button>
              ))}
            </div>
            <Button variant="secondary" size="sm">
              <ArrowDownTrayIcon className="h-4 w-4 mr-1" /> Export
            </Button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        {/* Performance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader title="Monthly Performance" subtitle="Gigs completed, posted, and applications received" />
          <div className="mt-6 h-52 flex items-end gap-2">
            {MONTHLY_PERFORMANCE.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-0.5 items-end justify-center" style={{ height: '180px' }}>
                  <div className="w-3 rounded-t bg-emerald-400 transition-all" style={{ height: `${(d.completed / maxVal) * 180}px`, minHeight: '4px' }} title={`${d.completed} completed`} />
                  <div className="w-3 rounded-t bg-indigo-400 transition-all" style={{ height: `${(d.posted / maxVal) * 180}px`, minHeight: '4px' }} title={`${d.posted} posted`} />
                  <div className="w-3 rounded-t bg-amber-400 transition-all" style={{ height: `${(d.applications / maxVal) * 180}px`, minHeight: '4px' }} title={`${d.applications} applications`} />
                </div>
                <span className="text-[10px] text-gray-500 font-medium">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-5 pt-4 border-t border-gray-100">
            {[{ label: 'Completed', color: 'bg-emerald-400' }, { label: 'Posted', color: 'bg-indigo-400' }, { label: 'Applications', color: 'bg-amber-400' }].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className={`h-2.5 w-2.5 rounded ${l.color}`} />
                <span className="text-xs text-gray-500">{l.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Skill Distribution */}
        <Card>
          <CardHeader title="Skill Distribution" subtitle="Student skills breakdown" />
          <div className="mt-4 space-y-3">
            {SKILL_DISTRIBUTION.map((s) => (
              <div key={s.skill}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700">{s.skill}</span>
                  <span className="text-xs text-gray-500">{s.count} ({s.pct}%)</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-400 transition-all duration-700" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        {/* Top Performers */}
        <Card padding={false}>
          <div className="px-5 pt-5 pb-3">
            <CardHeader title="Top Performers" subtitle="Students ranked by completions" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">#</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Student</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Gigs</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Rating</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Earnings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {TOP_PERFORMERS.map((p) => (
                  <tr key={p.rank} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <span className="text-lg">{p.badge ? badgeColors[p.badge] : <span className="text-xs font-bold text-gray-400">{p.rank}</span>}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Avatar name={p.name} size="xs" />
                        <span className="font-semibold text-gray-900">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{p.gigs}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-3.5 w-3.5 text-amber-400" />
                        <span className="font-medium text-gray-900">{p.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-emerald-600">{p.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recruitment Stats */}
        <Card padding={false}>
          <div className="px-5 pt-5 pb-3">
            <CardHeader title="Company Recruitment" subtitle="Hiring pipeline overview" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Company</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Pos.</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Apps</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Short</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Hired</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Pipeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {RECRUITMENT_STATS.map((r) => {
                  const hiringRate = Math.round((r.hired / r.applicants) * 100);
                  return (
                    <tr key={r.company} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-gray-900">{r.company}</td>
                      <td className="py-3 px-4 text-gray-600">{r.positions}</td>
                      <td className="py-3 px-4 text-gray-600">{r.applicants}</td>
                      <td className="py-3 px-4 text-indigo-600 font-medium">{r.shortlisted}</td>
                      <td className="py-3 px-4 text-emerald-600 font-medium">{r.hired}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${hiringRate}%` }} />
                          </div>
                          <span className="text-xs text-gray-500">{hiringRate}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
