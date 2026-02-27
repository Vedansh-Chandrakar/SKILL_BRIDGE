import {
  PageHeader, StatCard, Card, CardHeader, Badge, Button,
  Table, TableHead, TableHeader, TableBody, TableRow, TableCell,
} from '@/components/shared';
import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  ClockIcon,
  DocumentCheckIcon,
  UserGroupIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const STATS = [
  { label: 'My Posted Gigs',   value: '5',      change: '2 active',       icon: BriefcaseIcon,      iconColor: 'bg-indigo-100 text-indigo-600' },
  { label: 'Total Applicants', value: '23',     change: '+8 this week',   icon: DocumentCheckIcon,  iconColor: 'bg-blue-100 text-blue-600' },
  { label: 'Total Spent',      value: '$2,350', change: '3 completed',    icon: CurrencyDollarIcon, iconColor: 'bg-emerald-100 text-emerald-600' },
  { label: 'Active Hires',     value: '2',      change: 'On track',       icon: ClockIcon,          iconColor: 'bg-amber-100 text-amber-600' },
];

const ACTIVITY = [
  { text: 'New applicant for "React Dashboard UI"',   time: '1 hour ago',  color: 'blue' },
  { text: 'Milestone approved for "Logo Design"',     time: '3 hours ago', color: 'emerald' },
  { text: 'Payment released to Alex Chen',            time: '1 day ago',   color: 'green' },
  { text: 'New applicant for "Data Analysis"',        time: '2 days ago',  color: 'indigo' },
  { text: 'Gig "API Integration" marked complete',    time: '3 days ago',  color: 'amber' },
];

const ACTIVE_GIGS = [
  { title: 'React Dashboard UI',   applicants: 8,  status: 'open',        deadline: 'Mar 15', budget: 300 },
  { title: 'Data Analysis Script', applicants: 5,  status: 'in_progress', deadline: 'Mar 20', budget: 200 },
  { title: 'Logo Design',          applicants: 12, status: 'open',        deadline: 'Mar 1',  budget: 75  },
  { title: 'API Integration',      applicants: 3,  status: 'completed',   deadline: 'Feb 28', budget: 250 },
];

const STATUS_STYLES = {
  open:        { label: 'Open',        color: 'emerald' },
  in_progress: { label: 'In Progress', color: 'blue'    },
  completed:   { label: 'Completed',   color: 'gray'    },
};

export default function RecruiterDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        title="Recruiter Dashboard"
        subtitle="Manage gigs you've posted and review incoming applicants."
        actions={
          <Button variant="gradient" onClick={() => navigate('/student/post-gig')}>
            <BriefcaseIcon className="h-4 w-4 mr-2" />
            Post New Gig
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        {STATS.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} change={s.change} icon={s.icon} iconColor={s.iconColor} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-1">
          <CardHeader title="Recent Activity" />
          <div className="space-y-4">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className="relative mt-1">
                  <div className={`h-2.5 w-2.5 rounded-full bg-${a.color}-500`} />
                  {i < ACTIVITY.length - 1 && (
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

        {/* Active Gigs table */}
        <Card padding={false} className="lg:col-span-2">
          <div className="px-5 pt-5 pb-3">
            <CardHeader
              title="Your Active Gigs"
              action={<Button variant="ghost" size="sm" onClick={() => navigate('/student/my-gigs')}>View all</Button>}
            />
          </div>
          <Table>
            <TableHead>
              <TableHeader>Gig</TableHeader>
              <TableHeader>Applicants</TableHeader>
              <TableHeader>Budget</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableHead>
            <TableBody>
              {ACTIVE_GIGS.map((g) => {
                const s = STATUS_STYLES[g.status];
                return (
                  <TableRow key={g.title}>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-gray-900">{g.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Due {g.deadline}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <UserGroupIcon className="h-4 w-4 text-gray-400" />
                        {g.applicants}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-emerald-600">${g.budget}</TableCell>
                    <TableCell><Badge color={s.color} size="sm">{s.label}</Badge></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-600">3</p>
            <p className="mt-1 text-xs text-gray-500">Open Positions</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="flex items-center justify-center gap-2 text-3xl font-bold text-emerald-600">
              <CheckCircleIcon className="h-7 w-7" /> 5
            </p>
            <p className="mt-1 text-xs text-gray-500">Total Hires Made</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-600">$2,350</p>
            <p className="mt-1 text-xs text-gray-500">Budget Used</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
