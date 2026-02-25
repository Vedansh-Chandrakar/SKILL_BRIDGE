import { useState } from 'react';
import { PageHeader, Card, CardHeader, Badge, StatCard, Button } from '@/components/shared';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  BuildingLibraryIcon,
  ArrowDownTrayIcon,
  CalendarDaysIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

/* ── Mock Data ────────────────────────────────── */
const STATS = [
  { title: 'Total Revenue', value: '$128.4K', change: '+18.2%', changeType: 'positive', icon: CurrencyDollarIcon, color: 'emerald' },
  { title: 'Active Users', value: '3,482', change: '+12.5%', changeType: 'positive', icon: UsersIcon, color: 'indigo' },
  { title: 'Total Gigs', value: '1,298', change: '+8.1%', changeType: 'positive', icon: BriefcaseIcon, color: 'amber' },
  { title: 'Campuses', value: '12', change: '+2', changeType: 'positive', icon: BuildingLibraryIcon, color: 'purple' },
];

const MONTHLY_DATA = [
  { month: 'Sep', gigs: 82, revenue: 8200, users: 220 },
  { month: 'Oct', gigs: 96, revenue: 10400, users: 285 },
  { month: 'Nov', gigs: 110, revenue: 12800, users: 340 },
  { month: 'Dec', gigs: 88, revenue: 9600, users: 310 },
  { month: 'Jan', gigs: 125, revenue: 14200, users: 420 },
  { month: 'Feb', gigs: 148, revenue: 16800, users: 480 },
];

const CAMPUS_STATS = [
  { name: 'MIT', students: 820, gigs: 245, revenue: '$42.8K', growth: '+24%', active: true },
  { name: 'Stanford', students: 650, gigs: 198, revenue: '$35.2K', growth: '+18%', active: true },
  { name: 'Harvard', students: 480, gigs: 156, revenue: '$28.4K', growth: '+15%', active: true },
  { name: 'Caltech', students: 320, gigs: 112, revenue: '$18.6K', growth: '+22%', active: true },
  { name: 'Yale', students: 290, gigs: 98, revenue: '$14.2K', growth: '+12%', active: true },
  { name: 'Princeton', students: 240, gigs: 76, revenue: '$10.8K', growth: '+8%', active: false },
];

const CATEGORY_BREAKDOWN = [
  { name: 'Web Development', count: 342, pct: 26, color: 'bg-indigo-500' },
  { name: 'Design & Creative', count: 268, pct: 21, color: 'bg-purple-500' },
  { name: 'Data Science', count: 198, pct: 15, color: 'bg-emerald-500' },
  { name: 'Content Writing', count: 156, pct: 12, color: 'bg-amber-500' },
  { name: 'Mobile Development', count: 134, pct: 10, color: 'bg-cyan-500' },
  { name: 'Marketing', count: 112, pct: 9, color: 'bg-rose-500' },
  { name: 'Other', count: 88, pct: 7, color: 'bg-gray-400' },
];

const PLATFORM_HEALTH = [
  { label: 'Avg Response Time', value: '2.4h', trend: 'down', good: true },
  { label: 'Gig Completion Rate', value: '89%', trend: 'up', good: true },
  { label: 'Dispute Rate', value: '2.1%', trend: 'down', good: true },
  { label: 'User Retention', value: '78%', trend: 'up', good: true },
  { label: 'Avg Rating', value: '4.6/5', trend: 'up', good: true },
  { label: 'Support Tickets', value: '23', trend: 'up', good: false },
];

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState('6m');
  const maxGigs = Math.max(...MONTHLY_DATA.map((d) => d.gigs));

  return (
    <div>
      <PageHeader
        title="Platform Analytics"
        subtitle="Comprehensive insights across all campuses and users"
        actions={
          <div className="flex items-center gap-2">
            <div className="flex rounded-xl bg-gray-100 p-0.5">
              {['1m', '3m', '6m', '1y'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${period === p ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {p.toUpperCase()}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm">
              <ArrowDownTrayIcon className="h-4 w-4 mr-1" /> Export Report
            </Button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        {STATS.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        {/* Gig Volume Chart */}
        <Card className="lg:col-span-2">
          <CardHeader title="Gig Volume & Growth" subtitle="Monthly gig postings across all campuses" />
          <div className="mt-6 flex items-end gap-3 h-48">
            {MONTHLY_DATA.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-semibold text-gray-700">{d.gigs}</span>
                <div className="w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-purple-400 transition-all duration-500 hover:from-indigo-600 hover:to-purple-500"
                  style={{ height: `${(d.gigs / maxGigs) * 100}%`, minHeight: 8 }}
                />
                <span className="text-[11px] text-gray-500 font-medium">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-400" />
              <span className="text-xs text-gray-500">Gigs Posted</span>
            </div>
            <div className="text-xs text-gray-500">
              Avg: <span className="font-semibold text-gray-900">{Math.round(MONTHLY_DATA.reduce((s, d) => s + d.gigs, 0) / MONTHLY_DATA.length)}</span> / month
            </div>
          </div>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader title="Gig Categories" subtitle="Distribution by type" />
          <div className="mt-4 space-y-3">
            {CATEGORY_BREAKDOWN.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700">{cat.name}</span>
                  <span className="text-xs text-gray-500">{cat.count} ({cat.pct}%)</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className={`h-full rounded-full ${cat.color} transition-all duration-700`} style={{ width: `${cat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Campus Activity + Platform Health */}
      <div className="grid gap-6 lg:grid-cols-5 mb-6">
        {/* Campus Performance Table */}
        <Card padding={false} className="lg:col-span-3">
          <CardHeader title="Campus Performance" subtitle="Revenue and engagement by campus" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Campus</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Students</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Gigs</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Revenue</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Growth</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {CAMPUS_STATS.map((c, i) => (
                  <tr key={c.name} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600">{i + 1}</span>
                        <span className="font-semibold text-gray-900">{c.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{c.students}</td>
                    <td className="py-3 px-4 text-gray-600">{c.gigs}</td>
                    <td className="py-3 px-4 font-medium text-emerald-600">{c.revenue}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-green-600">
                        <ArrowTrendingUpIcon className="h-3 w-3" />{c.growth}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge color={c.active ? 'green' : 'yellow'} dot size="sm">{c.active ? 'Active' : 'Onboarding'}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Platform Health */}
        <Card className="lg:col-span-2">
          <CardHeader title="Platform Health" subtitle="Key performance indicators" />
          <div className="mt-4 space-y-4">
            {PLATFORM_HEALTH.map((m) => (
              <div key={m.label} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{m.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">{m.value}</span>
                  <span className={`flex items-center gap-0.5 text-xs font-medium ${m.good ? 'text-green-600' : 'text-red-500'}`}>
                    {m.trend === 'up' ? '\u2191' : '\u2193'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Donut visual */}
          <div className="mt-6 flex items-center justify-center">
            <div className="relative h-28 w-28">
              <svg className="h-28 w-28 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.5" fill="none" strokeWidth="3" stroke="#f3f4f6" />
                <circle cx="18" cy="18" r="15.5" fill="none" strokeWidth="3" stroke="url(#grad)" strokeDasharray="89 100" strokeLinecap="round" />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-gray-900">89%</span>
                <span className="text-[10px] text-gray-500">Overall</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue / User Growth comparison */}
      <Card>
        <CardHeader title="Revenue & User Growth Trends" subtitle="Monthly comparison over selected period" />
        <div className="mt-6 overflow-x-auto">
          <div className="grid grid-cols-6 gap-4 min-w-[500px]">
            {MONTHLY_DATA.map((d) => (
              <div key={d.month} className="text-center">
                <div className="mb-3 flex justify-center gap-1.5 items-end h-32">
                  <div className="w-6 rounded-t-md bg-indigo-400 transition-all" style={{ height: `${(d.users / 500) * 100}%` }} title={`${d.users} users`} />
                  <div className="w-6 rounded-t-md bg-emerald-400 transition-all" style={{ height: `${(d.revenue / 18000) * 100}%` }} title={`$${d.revenue}`} />
                </div>
                <p className="text-xs font-medium text-gray-700">{d.month}</p>
                <p className="text-[10px] text-gray-400">{d.users} users</p>
                <p className="text-[10px] text-emerald-500 font-medium">${(d.revenue / 1000).toFixed(1)}K</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded bg-indigo-400" />
            <span className="text-xs text-gray-500">New Users</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded bg-emerald-400" />
            <span className="text-xs text-gray-500">Revenue</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
