import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Card, CardHeader, Badge, StatCard, Button } from '@/components/shared';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  DocumentCheckIcon,
  StarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  BriefcaseIcon,
  TrophyIcon,
  CalendarDaysIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

/* ── Mock Data ────────────────────────────────── */
const STATS = [
  { title: 'Total Earnings', value: '$3,240', change: '+$840 this month', changeType: 'positive', icon: CurrencyDollarIcon, color: 'emerald' },
  { title: 'Gigs Completed', value: '18', change: '+3 this month', changeType: 'positive', icon: BriefcaseIcon, color: 'indigo' },
  { title: 'Avg. Rating', value: '4.8', change: '+0.1', changeType: 'positive', icon: StarIcon, color: 'amber' },
  { title: 'Success Rate', value: '94%', change: '+2%', changeType: 'positive', icon: TrophyIcon, color: 'purple' },
];

const EARNINGS_DATA = [
  { month: 'Sep', amount: 320 },
  { month: 'Oct', amount: 480 },
  { month: 'Nov', amount: 540 },
  { month: 'Dec', amount: 380 },
  { month: 'Jan', amount: 680 },
  { month: 'Feb', amount: 840 },
];

const APPLICATION_HISTORY = [
  { month: 'Sep', applied: 8, accepted: 5, rejected: 2, withdrawn: 1 },
  { month: 'Oct', applied: 12, accepted: 8, rejected: 3, withdrawn: 1 },
  { month: 'Nov', applied: 10, accepted: 7, rejected: 2, withdrawn: 1 },
  { month: 'Dec', applied: 6, accepted: 4, rejected: 1, withdrawn: 1 },
  { month: 'Jan', applied: 14, accepted: 10, rejected: 3, withdrawn: 1 },
  { month: 'Feb', applied: 16, accepted: 12, rejected: 3, withdrawn: 1 },
];

const SKILL_RATINGS = [
  { skill: 'React', level: 95, gigs: 8 },
  { skill: 'Tailwind CSS', level: 90, gigs: 7 },
  { skill: 'Node.js', level: 82, gigs: 5 },
  { skill: 'Python', level: 75, gigs: 3 },
  { skill: 'Figma', level: 70, gigs: 2 },
  { skill: 'TypeScript', level: 65, gigs: 2 },
];

const PERFORMANCE_METRICS = [
  { label: 'On-Time Delivery', value: '96%', icon: ClockIcon, color: 'text-emerald-600' },
  { label: 'Repeat Clients', value: '67%', icon: ArrowTrendingUpIcon, color: 'text-indigo-600' },
  { label: 'Avg Response Time', value: '1.2h', icon: ClockIcon, color: 'text-blue-600' },
  { label: 'Portfolio Views', value: '342', icon: EyeIcon, color: 'text-purple-600' },
  { label: 'Profile Completion', value: '92%', icon: DocumentCheckIcon, color: 'text-amber-600' },
  { label: 'Campus Ranking', value: 'Top 8%', icon: TrophyIcon, color: 'text-rose-600' },
];

const RECENT_REVIEWS = [
  { reviewer: 'Sarah Kim', rating: 5, text: 'Excellent work on the dashboard UI! Delivered early and exceeded expectations.', gig: 'React Dashboard', date: '2026-02-24' },
  { reviewer: 'Dr. Lee', rating: 5, text: 'Very professional and communicative. Would definitely hire again.', gig: 'Data Visualization', date: '2026-02-18' },
  { reviewer: 'Eva Martinez', rating: 4, text: 'Good work overall. Minor revisions needed but handled them quickly.', gig: 'Landing Page', date: '2026-02-10' },
  { reviewer: 'Jordan Park', rating: 5, text: 'Outstanding quality. Clean code and great attention to detail.', gig: 'API Integration', date: '2026-02-02' },
];

const MILESTONES = [
  { title: 'First Gig Completed', date: 'Aug 2025', achieved: true },
  { title: '5 Gigs Completed', date: 'Oct 2025', achieved: true },
  { title: '10 Gigs Completed', date: 'Dec 2025', achieved: true },
  { title: '$2,000 Earned', date: 'Jan 2026', achieved: true },
  { title: '4.5+ Rating', date: 'Jan 2026', achieved: true },
  { title: 'Top 10% Campus Ranking', date: 'Feb 2026', achieved: true },
  { title: '25 Gigs Completed', date: '-', achieved: false },
  { title: '$5,000 Earned', date: '-', achieved: false },
];

export default function StudentAnalyticsPage() {
  const [period, setPeriod] = useState('6m');
  const maxEarning = Math.max(...EARNINGS_DATA.map((d) => d.amount));
  const maxApp = Math.max(...APPLICATION_HISTORY.map((d) => d.applied));

  return (
    <div>
      <PageHeader
        title="My Analytics"
        subtitle="Track your performance, earnings, and growth over time"
        actions={
          <div className="flex rounded-xl bg-gray-100 p-0.5">
            {['1m', '3m', '6m', '1y'].map((p) => (
              <button key={p} onClick={() => setPeriod(p)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${period === p ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        {STATS.map((s) => <StatCard key={s.title} {...s} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        {/* Earnings Chart */}
        <Card className="lg:col-span-2">
          <CardHeader title="Earnings Overview" subtitle="Monthly earnings trend" />
          <div className="mt-6 flex items-end gap-4 h-48">
            {EARNINGS_DATA.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-semibold text-emerald-600">${d.amount}</span>
                <div className="w-full rounded-t-lg bg-gradient-to-t from-emerald-500 to-emerald-300 hover:from-emerald-600 hover:to-emerald-400 transition-all duration-300 cursor-pointer"
                  style={{ height: `${(d.amount / maxEarning) * 100}%`, minHeight: 8 }}
                />
                <span className="text-[11px] text-gray-500 font-medium">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" />
              <span className="text-xs text-gray-500">Monthly Earnings</span>
            </div>
            <div className="text-xs text-gray-500">
              Avg: <span className="font-semibold text-emerald-600">${Math.round(EARNINGS_DATA.reduce((s, d) => s + d.amount, 0) / EARNINGS_DATA.length)}</span> / month
            </div>
          </div>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader title="Performance" subtitle="Key metrics" />
          <div className="mt-4 space-y-4">
            {PERFORMANCE_METRICS.map((m) => (
              <div key={m.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <m.icon className={`h-4 w-4 ${m.color}`} />
                  <span className="text-sm text-gray-600">{m.label}</span>
                </div>
                <span className={`text-sm font-bold ${m.color}`}>{m.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        {/* Application History */}
        <Card className="lg:col-span-2">
          <CardHeader title="Application History" subtitle="Monthly application outcomes" />
          <div className="mt-6 flex items-end gap-3 h-40">
            {APPLICATION_HISTORY.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-0.5 items-end justify-center" style={{ height: '100%' }}>
                  <div className="w-2.5 rounded-t bg-indigo-400 transition-all" style={{ height: `${(d.applied / maxApp) * 100}%` }} />
                  <div className="w-2.5 rounded-t bg-emerald-400 transition-all" style={{ height: `${(d.accepted / maxApp) * 100}%` }} />
                  <div className="w-2.5 rounded-t bg-red-300 transition-all" style={{ height: `${(d.rejected / maxApp) * 100}%` }} />
                </div>
                <span className="text-[10px] text-gray-500 font-medium">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-5 pt-4 border-t border-gray-100">
            {[{ label: 'Applied', color: 'bg-indigo-400' }, { label: 'Accepted', color: 'bg-emerald-400' }, { label: 'Rejected', color: 'bg-red-300' }].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className={`h-2.5 w-2.5 rounded ${l.color}`} />
                <span className="text-xs text-gray-500">{l.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Skill Proficiency */}
        <Card>
          <CardHeader title="Skill Proficiency" subtitle="Based on completed gigs" />
          <div className="mt-4 space-y-3">
            {SKILL_RATINGS.map((s) => (
              <div key={s.skill}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700">{s.skill}</span>
                  <span className="text-xs text-gray-500">{s.gigs} gigs &bull; {s.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-400 transition-all duration-700" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Reviews */}
        <Card>
          <CardHeader title="Recent Reviews" subtitle="Client feedback" />
          <div className="mt-4 space-y-4">
            {RECENT_REVIEWS.map((r, i) => (
              <div key={i} className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{r.reviewer}</span>
                    <Badge color="indigo" size="sm">{r.gig}</Badge>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <StarIcon key={j} className={`h-3.5 w-3.5 ${j < r.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{r.text}</p>
                <p className="text-xs text-gray-400 mt-2">{r.date}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Milestones */}
        <Card>
          <CardHeader title="Milestones" subtitle="Your achievement timeline" />
          <div className="mt-4 space-y-3">
            {MILESTONES.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 ${m.achieved ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                  {m.achieved ? (
                    <TrophyIcon className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <ClockIcon className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${m.achieved ? 'text-gray-900' : 'text-gray-400'}`}>{m.title}</p>
                  <p className="text-xs text-gray-400">{m.date}</p>
                </div>
                {m.achieved && <Badge color="green" size="sm">Achieved</Badge>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
