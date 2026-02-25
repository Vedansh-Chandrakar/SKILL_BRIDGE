import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PageHeader, Card, CardHeader, Badge, Button, EmptyState, Modal, SearchInput, Select,
  Table, TableHead, TableHeader, TableBody, TableRow, TableCell,
} from '@/components/shared';
import {
  BriefcaseIcon,
  PlusIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const MY_GIGS = [
  { id: 'g-4', title: 'Mobile App UI Mockups', budget: 120, applicants: 5, accepted: 1, rejected: 2, pending: 2, status: 'open', deadline: '2026-03-10', createdAt: '2026-02-22', category: 'design' },
  { id: 'g-5', title: 'React Dashboard UI', budget: 200, applicants: 12, accepted: 1, rejected: 8, pending: 3, status: 'in_progress', deadline: '2026-03-20', createdAt: '2026-02-18', category: 'web' },
  { id: 'g-6', title: 'SEO Blog Articles', budget: 80, applicants: 8, accepted: 1, rejected: 7, pending: 0, status: 'completed', deadline: '2026-02-28', createdAt: '2026-02-05', category: 'writing' },
  { id: 'g-7', title: 'Python Data Pipeline', budget: 250, applicants: 3, accepted: 0, rejected: 0, pending: 3, status: 'open', deadline: '2026-04-01', createdAt: '2026-02-20', category: 'data' },
];

const statusColor = { open: 'green', in_progress: 'yellow', completed: 'indigo', closed: 'gray' };
const statusLabel = { open: 'Open', in_progress: 'In Progress', completed: 'Completed', closed: 'Closed' };

export default function MyGigsPage() {
  const [gigs, setGigs] = useState(MY_GIGS);
  const [deleteGig, setDeleteGig] = useState(null);
  const [statusTab, setStatusTab] = useState('all');

  const filtered = statusTab === 'all' ? gigs : gigs.filter((g) => g.status === statusTab);

  const handleDelete = () => {
    setGigs((prev) => prev.filter((g) => g.id !== deleteGig.id));
    setDeleteGig(null);
  };

  return (
    <div>
      <PageHeader
        title="My Gigs"
        subtitle={`${gigs.length} gigs posted`}
        actions={
          <Link to="/student/post-gig">
            <Button variant="gradient">
              <PlusIcon className="h-4 w-4 mr-2" /> Post New Gig
            </Button>
          </Link>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        {[
          { label: 'Total Gigs', value: gigs.length, cls: 'text-gray-900', bg: 'bg-gray-50', icon: BriefcaseIcon },
          { label: 'Open', value: gigs.filter((g) => g.status === 'open').length, cls: 'text-emerald-600', bg: 'bg-emerald-50', icon: ClockIcon },
          { label: 'In Progress', value: gigs.filter((g) => g.status === 'in_progress').length, cls: 'text-amber-600', bg: 'bg-amber-50', icon: ChartBarIcon },
          { label: 'Completed', value: gigs.filter((g) => g.status === 'completed').length, cls: 'text-indigo-600', bg: 'bg-indigo-50', icon: CheckCircleIcon },
        ].map((c) => (
          <Card key={c.label}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
                <c.icon className={`h-5 w-5 ${c.cls}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{c.label}</p>
                <p className={`text-2xl font-bold ${c.cls}`}>{c.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {[
          { label: 'All', value: 'all', count: gigs.length },
          { label: 'Open', value: 'open', count: gigs.filter((g) => g.status === 'open').length },
          { label: 'In Progress', value: 'in_progress', count: gigs.filter((g) => g.status === 'in_progress').length },
          { label: 'Completed', value: 'completed', count: gigs.filter((g) => g.status === 'completed').length },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusTab(tab.value)}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              statusTab === tab.value
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label} <span className={`ml-1 text-xs ${statusTab === tab.value ? 'text-indigo-200' : 'text-gray-400'}`}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <Card padding={false}>
        <Table>
          <TableHead>
            <TableHeader>Gig</TableHeader>
            <TableHeader>Budget</TableHeader>
            <TableHeader>Recruitment Pipeline</TableHeader>
            <TableHeader>Deadline</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader className="text-right">Actions</TableHeader>
          </TableHead>
          <TableBody>
            {filtered.map((gig) => (
              <TableRow key={gig.id}>
                <TableCell>
                  <div>
                    <p className="font-semibold text-gray-900">{gig.title}</p>
                    <p className="text-xs text-gray-500">Posted {new Date(gig.createdAt).toLocaleDateString()}</p>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-emerald-600">${gig.budget}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <span className="flex items-center gap-0.5 rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600" title="Total applicants">
                        <UserGroupIcon className="h-3 w-3" /> {gig.applicants}
                      </span>
                      <span className="flex items-center gap-0.5 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600" title="Pending">
                        <ClockIcon className="h-3 w-3" /> {gig.pending}
                      </span>
                      <span className="flex items-center gap-0.5 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600" title="Accepted">
                        <CheckCircleIcon className="h-3 w-3" /> {gig.accepted}
                      </span>
                      <span className="flex items-center gap-0.5 rounded-md bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600" title="Rejected">
                        <XCircleIcon className="h-3 w-3" /> {gig.rejected}
                      </span>
                    </div>
                  </div>
                  {/* Mini progress bar */}
                  {gig.applicants > 0 && (
                    <div className="mt-1.5 flex h-1.5 rounded-full overflow-hidden bg-gray-100 w-32">
                      <div className="bg-emerald-500 transition-all" style={{ width: `${(gig.accepted / gig.applicants) * 100}%` }} />
                      <div className="bg-amber-400 transition-all" style={{ width: `${(gig.pending / gig.applicants) * 100}%` }} />
                      <div className="bg-red-400 transition-all" style={{ width: `${(gig.rejected / gig.applicants) * 100}%` }} />
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-gray-500">{new Date(gig.deadline).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge color={statusColor[gig.status]} dot>{statusLabel[gig.status]}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link to="/student/applicants" className="rounded-lg p-1.5 text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors" title="View applicants">
                      <UserGroupIcon className="h-4 w-4" />
                    </Link>
                    <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors" title="View">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors" title="Edit">
                      <PencilSquareIcon className="h-4 w-4" />
                    </button>
                    <button onClick={() => setDeleteGig(gig)} className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Delete confirmation */}
      <Modal open={!!deleteGig} onClose={() => setDeleteGig(null)} title="Delete Gig" size="sm">
        {deleteGig && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-500 shrink-0" />
              <div>
                <p className="font-semibold text-red-800">Are you sure?</p>
                <p className="text-sm text-red-600 mt-1">This will permanently delete "<strong>{deleteGig.title}</strong>" and reject all pending applicants.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="danger" className="flex-1" onClick={handleDelete}>Yes, Delete</Button>
              <Button variant="secondary" className="flex-1" onClick={() => setDeleteGig(null)}>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
