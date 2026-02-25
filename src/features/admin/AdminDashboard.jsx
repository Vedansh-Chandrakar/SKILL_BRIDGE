import { PageHeader, StatCard, Card, CardHeader, Badge, Avatar } from '@/components/shared';
import {
  BuildingLibraryIcon,
  UsersIcon,
  BriefcaseIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const stats = [
  { label: 'Total Campuses', value: '12', change: '+2 this month', changeType: 'positive', icon: BuildingLibraryIcon, iconColor: 'bg-indigo-100 text-indigo-600' },
  { label: 'Registered Users', value: '3,482', change: '+156 this week', changeType: 'positive', icon: UsersIcon, iconColor: 'bg-emerald-100 text-emerald-600' },
  { label: 'Active Gigs', value: '247', change: '+23 new', changeType: 'positive', icon: BriefcaseIcon, iconColor: 'bg-amber-100 text-amber-600' },
  { label: 'Completed Gigs', value: '1,051', change: '89% success rate', changeType: 'positive', icon: ChartBarIcon, iconColor: 'bg-purple-100 text-purple-600' },
  { label: 'Total Revenue', value: '$48.2K', change: '+12.5%', changeType: 'positive', icon: CurrencyDollarIcon, iconColor: 'bg-cyan-100 text-cyan-600' },
  { label: 'Growth Rate', value: '24%', change: '↑ vs last quarter', changeType: 'positive', icon: ArrowTrendingUpIcon, iconColor: 'bg-rose-100 text-rose-600' },
];

const recentActivity = [
  { id: 1, user: 'MIT Campus', action: 'registered as a new campus', time: '2 hours ago', type: 'campus' },
  { id: 2, user: 'Alex Chen', action: 'completed gig "Data Analysis"', time: '3 hours ago', type: 'gig' },
  { id: 3, user: 'Stanford', action: 'submitted verification request', time: '5 hours ago', type: 'verification' },
  { id: 4, user: 'Sarah Lee', action: 'posted a new gig', time: '6 hours ago', type: 'gig' },
  { id: 5, user: 'Jane Doe', action: 'joined as a freelancer', time: '8 hours ago', type: 'user' },
];

const topCampuses = [
  { name: 'MIT', students: 820, gigs: 145, status: 'active' },
  { name: 'Stanford', students: 650, gigs: 120, status: 'active' },
  { name: 'Harvard', students: 480, gigs: 89, status: 'active' },
  { name: 'Caltech', students: 320, gigs: 67, status: 'pending' },
];

export default function AdminDashboard() {
  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Platform-wide overview across all campuses"
      />

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Recent activity */}
        <Card className="lg:col-span-3">
          <CardHeader title="Recent Activity" subtitle="Latest platform events" />
          <div className="mt-4 space-y-3">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50">
                <Avatar name={item.user} size="sm" color={item.type === 'campus' ? 'blue' : item.type === 'gig' ? 'green' : 'purple'} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-semibold">{item.user}</span>{' '}
                    <span className="text-gray-500">{item.action}</span>
                  </p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top campuses */}
        <Card className="lg:col-span-2">
          <CardHeader title="Top Campuses" subtitle="By student count" />
          <div className="mt-4 space-y-3">
            {topCampuses.map((c, i) => (
              <div key={c.name} className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-500">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.students} students · {c.gigs} gigs</p>
                </div>
                <Badge color={c.status === 'active' ? 'green' : 'yellow'} dot size="sm">
                  {c.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
