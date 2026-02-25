import {
  PageHeader, StatCard, Card, CardHeader, Badge, Avatar, Button,
  Table, TableHead, TableHeader, TableBody, TableRow, TableCell,
} from '@/components/shared';
import { STUDENT_MODES } from '@/models';
import { useRole } from '@/hooks';
import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  ClockIcon,
  StarIcon,
  ArrowTrendingUpIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';

const freelancerStats = [
  { label: 'Available Gigs', value: '24', change: '+6 new today', icon: BriefcaseIcon, color: 'indigo' },
  { label: 'My Applications', value: '8', change: '3 pending', icon: DocumentCheckIcon, color: 'blue' },
  { label: 'Earnings', value: '$1,240', change: '+$320 this month', icon: CurrencyDollarIcon, color: 'emerald' },
  { label: 'Avg. Rating', value: '4.8', change: '12 reviews', icon: StarIcon, color: 'amber' },
];

const recruiterStats = [
  { label: 'My Posted Gigs', value: '5', change: '2 active', icon: BriefcaseIcon, color: 'indigo' },
  { label: 'Total Applicants', value: '23', change: '+8 this week', icon: DocumentCheckIcon, color: 'blue' },
  { label: 'Total Spent', value: '$2,350', change: '3 completed', icon: CurrencyDollarIcon, color: 'emerald' },
  { label: 'Active Hires', value: '2', change: 'On track', icon: ClockIcon, color: 'amber' },
];

const recentActivity = [
  { text: 'Applied to "React Dashboard UI"', time: '2 hours ago', color: 'blue' },
  { text: 'Received payment for "Logo Design"', time: '1 day ago', color: 'green' },
  { text: 'Got accepted for "Data Analysis"', time: '2 days ago', color: 'emerald' },
  { text: 'Submitted milestone for "API Integration"', time: '3 days ago', color: 'indigo' },
  { text: 'Left a review for recruiter', time: '5 days ago', color: 'amber' },
];

const recommendedGigs = [
  { title: 'Build a Portfolio Website', budget: 150, tags: ['React', 'Tailwind'], deadline: 'Mar 15', campus: 'MIT' },
  { title: 'Design a Logo for Campus Club', budget: 75, tags: ['Design', 'Branding'], deadline: 'Mar 1', campus: 'MIT' },
  { title: 'Data Analysis for Research', budget: 200, tags: ['Python', 'Statistics'], deadline: 'Apr 1', campus: 'Stanford' },
  { title: 'Mobile App UI Mockups', budget: 120, tags: ['Figma', 'UI/UX'], deadline: 'Mar 10', campus: 'MIT' },
];

export default function StudentDashboard() {
  const { activeMode } = useRole();
  const isRecruiter = activeMode === STUDENT_MODES.RECRUITER;
  const stats = isRecruiter ? recruiterStats : freelancerStats;

  return (
    <div>
      <PageHeader
        title={isRecruiter ? 'Recruiter Dashboard' : 'Freelancer Dashboard'}
        subtitle={
          isRecruiter
            ? "Manage gigs you've posted and review incoming applicants."
            : 'Discover gigs that match your skills and track applications.'
        }
        actions={
          isRecruiter ? (
            <Button variant="gradient">
              <BriefcaseIcon className="h-4 w-4 mr-2" />
              Post New Gig
            </Button>
          ) : (
            <Button variant="gradient">
              <ArrowTrendingUpIcon className="h-4 w-4 mr-2" />
              Browse Gigs
            </Button>
          )
        }
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        {stats.map((s) => (
          <StatCard key={s.label} title={s.label} value={s.value} change={s.change} icon={s.icon} color={s.color} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-1">
          <CardHeader title="Recent Activity" />
          <div className="space-y-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className="relative mt-1">
                  <div className={`h-2.5 w-2.5 rounded-full bg-${a.color}-500`} />
                  {i < recentActivity.length - 1 && (
                    <div className="absolute left-1/2 top-3 h-full w-px -translate-x-1/2 bg-gray-200" />
                  )}
                </div>
                <div className="pb-4">
                  <p className="text-sm text-gray-700">{a.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommended Gigs */}
        <Card padding={false} className="lg:col-span-2">
          <CardHeader
            title={isRecruiter ? 'Your Active Gigs' : 'Recommended for You'}
            action={<Button variant="ghost" size="sm">View all</Button>}
          />
          <Table>
            <TableHead>
              <TableHeader>Gig</TableHeader>
              <TableHeader>Budget</TableHeader>
              <TableHeader>Deadline</TableHeader>
              <TableHeader>Campus</TableHeader>
            </TableHead>
            <TableBody>
              {recommendedGigs.map((g) => (
                <TableRow key={g.title}>
                  <TableCell>
                    <div>
                      <p className="font-semibold text-gray-900">{g.title}</p>
                      <div className="flex gap-1 mt-1">
                        {g.tags.map((t) => (
                          <span key={t} className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600">{t}</span>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-emerald-600">${g.budget}</TableCell>
                  <TableCell className="text-gray-500">{g.deadline}</TableCell>
                  <TableCell>
                    <Badge color="blue" size="sm">{g.campus}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Quick Stats Bar */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-600">92%</p>
            <p className="mt-1 text-xs text-gray-500">Profile Completion</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-600">15</p>
            <p className="mt-1 text-xs text-gray-500">Gigs Completed</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-600">Top 10%</p>
            <p className="mt-1 text-xs text-gray-500">Campus Ranking</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
