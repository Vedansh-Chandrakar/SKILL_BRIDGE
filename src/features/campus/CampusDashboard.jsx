import { useNavigate } from 'react-router-dom';
import {
  PageHeader, StatCard, Card, CardHeader, Badge, Avatar, Button,
  Table, TableHead, TableHeader, TableBody, TableRow, TableCell,
} from '@/components/shared';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  CheckBadgeIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

const stats = [
  { label: 'Total Students', value: '820', change: '+45 this month', icon: AcademicCapIcon, iconColor: 'bg-indigo-100 text-indigo-600' },
  { label: 'Active Gigs', value: '34', change: '+8 this week', icon: BriefcaseIcon, iconColor: 'bg-emerald-100 text-emerald-600' },
  { label: 'Placements', value: '112', change: '+12 this month', icon: ChartBarIcon, iconColor: 'bg-amber-100 text-amber-600' },
  { label: 'Pending Verifications', value: '6', change: '3 urgent', icon: ClockIcon, iconColor: 'bg-rose-100 text-rose-600' },
];

const recentStudents = [
  { name: 'Alice Johnson', email: 'alice@campus.edu', mode: 'Freelancer', joinedAt: '2026-02-22', verified: true },
  { name: 'Bob Williams', email: 'bob@campus.edu', mode: 'Recruiter', joinedAt: '2026-02-21', verified: true },
  { name: 'Carol Chen', email: 'carol@campus.edu', mode: 'Both', joinedAt: '2026-02-20', verified: false },
  { name: 'David Lee', email: 'david@campus.edu', mode: 'Freelancer', joinedAt: '2026-02-19', verified: true },
  { name: 'Eva Martinez', email: 'eva@campus.edu', mode: 'Recruiter', joinedAt: '2026-02-18', verified: false },
];

const recentGigs = [
  { title: 'React Dashboard UI', postedBy: 'Bob Williams', applications: 8, status: 'open' },
  { title: 'Logo Design for Club', postedBy: 'David Lee', applications: 12, status: 'open' },
  { title: 'Python Data Script', postedBy: 'Alice Johnson', applications: 3, status: 'in-progress' },
  { title: 'Mobile App Prototype', postedBy: 'Carol Chen', applications: 5, status: 'completed' },
];

const modeColor = { Freelancer: 'blue', Recruiter: 'purple', Both: 'cyan' };
const gigStatusColor = { open: 'green', 'in-progress': 'yellow', completed: 'indigo' };

export default function CampusDashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader
        title="Campus Dashboard"
        subtitle="Manage students, gigs, and recruitment for your institution."
        actions={
          <Button variant="gradient" onClick={() => navigate('/campus/verifications')}>
            <CheckBadgeIcon className="h-4 w-4 mr-2" />
            Verify Students
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-4">
        {stats.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            change={s.change}
            icon={s.icon}
            iconColor={s.iconColor}
          />
        ))}
      </div>

      {/* Quick Metrics */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
              <ArrowTrendingUpIcon className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Avg. Gig Completion</p>
              <p className="text-lg font-bold text-gray-900">4.2 days</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <UserGroupIcon className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Freelancers</p>
              <p className="text-lg font-bold text-gray-900">284</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
              <BriefcaseIcon className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Open Positions</p>
              <p className="text-lg font-bold text-gray-900">18</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Students */}
        <Card padding={false}>
          <div className="px-5 pt-5 pb-3">
            <CardHeader
              title="Recent Students"
              action={<Button variant="ghost" size="sm" onClick={() => navigate('/campus/students')}>View all</Button>}
            />
          </div>
          <Table>
            <TableHead>
              <TableHeader>Student</TableHeader>
              <TableHeader>Mode</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableHead>
            <TableBody>
              {recentStudents.map((s) => (
                <TableRow key={s.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar name={s.name} size="sm" status={s.verified ? 'online' : 'offline'} />
                      <div>
                        <p className="font-semibold text-gray-900">{s.name}</p>
                        <p className="text-xs text-gray-500">{s.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge color={modeColor[s.mode]} size="sm">{s.mode}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge color={s.verified ? 'green' : 'yellow'} dot size="sm">
                      {s.verified ? 'Verified' : 'Pending'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Recent Gigs */}
        <Card padding={false}>
          <div className="px-5 pt-5 pb-3">
            <CardHeader
              title="Recent Gigs"
              action={<Button variant="ghost" size="sm" onClick={() => navigate('/campus/gigs')}>View all</Button>}
            />
          </div>
          <Table>
            <TableHead>
              <TableHeader>Gig</TableHeader>
              <TableHeader>Apps</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableHead>
            <TableBody>
              {recentGigs.map((g) => (
                <TableRow key={g.title}>
                  <TableCell>
                    <div>
                      <p className="font-semibold text-gray-900">{g.title}</p>
                      <p className="text-xs text-gray-500">by {g.postedBy}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600 font-medium">{g.applications}</TableCell>
                  <TableCell>
                    <Badge color={gigStatusColor[g.status]} size="sm">{g.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
