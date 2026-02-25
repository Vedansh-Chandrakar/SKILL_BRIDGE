import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PageHeader, Card, Badge, Button, EmptyState, Modal, SearchInput, Select,
  Table, TableHead, TableHeader, TableBody, TableRow, TableCell,
} from '@/components/shared';
import {
  DocumentCheckIcon, EyeIcon, XMarkIcon, ClockIcon,
  CheckCircleIcon, XCircleIcon, ChatBubbleLeftRightIcon,
  ArrowPathIcon, ChevronRightIcon, FunnelIcon,
} from '@heroicons/react/24/outline';

const APPLICATIONS = [
  { id: 'a-1', gigTitle: 'Build a Portfolio Website', campus: 'MIT', status: 'pending', proposedBudget: 140, recruiter: 'Sarah K.', appliedAt: '2026-02-21', gigId: 'g-10', timeline: [
    { stage: 'Applied', date: 'Feb 21', done: true },
    { stage: 'Under Review', date: '', done: false },
    { stage: 'Decision', date: '', done: false },
  ] },
  { id: 'a-2', gigTitle: 'Data Analysis for Research', campus: 'Stanford', status: 'accepted', proposedBudget: 190, recruiter: 'Dr. Kim', appliedAt: '2026-02-15', gigId: 'g-14', timeline: [
    { stage: 'Applied', date: 'Feb 15', done: true },
    { stage: 'Under Review', date: 'Feb 17', done: true },
    { stage: 'Shortlisted', date: 'Feb 19', done: true },
    { stage: 'Accepted', date: 'Feb 20', done: true },
  ] },
  { id: 'a-3', gigTitle: 'Logo Design for Club', campus: 'MIT', status: 'rejected', proposedBudget: 70, recruiter: 'Alex R.', appliedAt: '2026-02-10', gigId: 'g-13', timeline: [
    { stage: 'Applied', date: 'Feb 10', done: true },
    { stage: 'Under Review', date: 'Feb 12', done: true },
    { stage: 'Rejected', date: 'Feb 14', done: true },
  ] },
  { id: 'a-4', gigTitle: 'Mobile App UI Mockups', campus: 'Caltech', status: 'pending', proposedBudget: 115, recruiter: 'Eva M.', appliedAt: '2026-02-22', gigId: 'g-15', timeline: [
    { stage: 'Applied', date: 'Feb 22', done: true },
    { stage: 'Under Review', date: 'Feb 24', done: true },
    { stage: 'Decision', date: '', done: false },
  ] },
  { id: 'a-5', gigTitle: 'Python Script Automation', campus: 'Stanford', status: 'withdrawn', proposedBudget: 80, recruiter: 'Li W.', appliedAt: '2026-02-05', gigId: 'g-11', timeline: [
    { stage: 'Applied', date: 'Feb 5', done: true },
    { stage: 'Withdrawn', date: 'Feb 8', done: true },
  ] },
];

const statusColor = { pending: 'yellow', accepted: 'green', rejected: 'red', withdrawn: 'gray' };
const statusIcon = {
  pending: ClockIcon,
  accepted: CheckCircleIcon,
  rejected: XCircleIcon,
  withdrawn: ArrowPathIcon,
};

export default function MyApplicationsPage() {
  const [apps, setApps] = useState(APPLICATIONS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);
  const [withdrawApp, setWithdrawApp] = useState(null);

  const pending = apps.filter((a) => a.status === 'pending').length;
  const accepted = apps.filter((a) => a.status === 'accepted').length;

  const filtered = apps.filter((a) => {
    const matchSearch = a.gigTitle.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleWithdraw = (id) => {
    setApps((prev) => prev.map((a) => a.id === id ? { ...a, status: 'withdrawn' } : a));
    setWithdrawApp(null);
  };

  return (
    <div>
      <PageHeader
        title="My Applications"
        subtitle={`${apps.length} applications • ${pending} pending • ${accepted} accepted`}
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        {[
          { label: 'Total', value: apps.length, cls: 'text-gray-900', bg: 'bg-gray-50', Icon: DocumentCheckIcon },
          { label: 'Pending', value: pending, cls: 'text-amber-600', bg: 'bg-amber-50', Icon: ClockIcon },
          { label: 'Accepted', value: accepted, cls: 'text-emerald-600', bg: 'bg-emerald-50', Icon: CheckCircleIcon },
          { label: 'Rejected', value: apps.filter((a) => a.status === 'rejected').length, cls: 'text-red-600', bg: 'bg-red-50', Icon: XCircleIcon },
        ].map((c) => (
          <Card key={c.label}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
                <c.Icon className={`h-5 w-5 ${c.cls}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{c.label}</p>
                <p className={`text-2xl font-bold ${c.cls}`}>{c.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchInput value={search} onChange={setSearch} placeholder="Search by gig title..." />
          </div>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="withdrawn">Withdrawn</option>
          </Select>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState
          icon={DocumentCheckIcon}
          title="No applications found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <Card padding={false}>
          <Table>
            <TableHead>
              <TableHeader>Gig</TableHeader>
              <TableHeader>Campus</TableHeader>
              <TableHeader>Budget</TableHeader>
              <TableHeader>Progress</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader className="text-right">Actions</TableHeader>
            </TableHead>
            <TableBody>
              {filtered.map((app) => {
                const StatusI = statusIcon[app.status];
                return (
                  <TableRow key={app.id} className="cursor-pointer hover:bg-indigo-50/30" onClick={() => setSelectedApp(app)}>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-gray-900">{app.gigTitle}</p>
                        <p className="text-xs text-gray-500">by {app.recruiter}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge color="blue" size="sm">{app.campus}</Badge>
                    </TableCell>
                    <TableCell className="font-medium text-emerald-600">${app.proposedBudget}</TableCell>
                    <TableCell>
                      {/* Mini progress indicator */}
                      <div className="flex items-center gap-1">
                        {app.timeline.map((step, i) => (
                          <div key={i} className="flex items-center">
                            <div className={`w-2 h-2 rounded-full ${step.done
                                ? app.status === 'rejected' && i === app.timeline.length - 1 ? 'bg-red-500' : 'bg-emerald-500'
                                : 'bg-gray-200'}`}
                            />
                            {i < app.timeline.length - 1 && (
                              <div className={`w-4 h-0.5 ${step.done ? 'bg-emerald-300' : 'bg-gray-200'}`} />
                            )}
                          </div>
                        ))}
                        <span className="ml-2 text-xs text-gray-400">{app.timeline.filter((s) => s.done).length}/{app.timeline.length}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge color={statusColor[app.status]} dot>{app.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <Link to={`/student/gigs/${app.gigId}`} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors" title="View gig">
                          <EyeIcon className="h-4 w-4" />
                        </Link>
                        {app.status === 'pending' && (
                          <button onClick={() => setWithdrawApp(app)} className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Withdraw">
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* ── Application Detail + Timeline Modal ── */}
      <Modal open={!!selectedApp} onClose={() => setSelectedApp(null)} title="Application Details" size="md">
        {selectedApp && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{selectedApp.gigTitle}</h3>
              <p className="text-sm text-gray-500 mt-1">by {selectedApp.recruiter} • {selectedApp.campus}</p>
              <div className="flex items-center gap-3 mt-3">
                <Badge color={statusColor[selectedApp.status]} size="lg">{selectedApp.status}</Badge>
                <span className="text-sm text-emerald-600 font-semibold">${selectedApp.proposedBudget} proposed</span>
              </div>
            </div>

            {/* Visual Timeline */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Application Timeline</h4>
              <div className="relative">
                {selectedApp.timeline.map((step, i) => {
                  const isLast = i === selectedApp.timeline.length - 1;
                  const isRejected = selectedApp.status === 'rejected' && isLast;
                  return (
                    <div key={i} className="flex items-start gap-3 mb-0">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          step.done
                            ? isRejected ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {step.done ? (
                            isRejected ? <XCircleIcon className="h-4 w-4" /> : <CheckCircleIcon className="h-4 w-4" />
                          ) : (
                            <ClockIcon className="h-4 w-4" />
                          )}
                        </div>
                        {!isLast && (
                          <div className={`w-0.5 h-8 ${step.done ? isRejected ? 'bg-red-200' : 'bg-emerald-200' : 'bg-gray-200'}`} />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className={`text-sm font-medium ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>{step.stage}</p>
                        {step.date && <p className="text-xs text-gray-400">{step.date}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <Link to={`/student/gigs/${selectedApp.gigId}`} className="flex-1">
                <Button variant="secondary" className="w-full">
                  <EyeIcon className="h-4 w-4 mr-2" /> View Gig
                </Button>
              </Link>
              {selectedApp.status === 'accepted' && (
                <Link to="/student/chat" className="flex-1">
                  <Button variant="gradient" className="w-full">
                    <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" /> Message Recruiter
                  </Button>
                </Link>
              )}
              {selectedApp.status === 'pending' && (
                <Button variant="danger" className="flex-1" onClick={() => { setSelectedApp(null); setWithdrawApp(selectedApp); }}>
                  <XMarkIcon className="h-4 w-4 mr-2" /> Withdraw
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Withdraw Confirmation */}
      <Modal open={!!withdrawApp} onClose={() => setWithdrawApp(null)} title="Withdraw Application" size="sm">
        {withdrawApp && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Are you sure you want to withdraw your application for <strong>{withdrawApp.gigTitle}</strong>? This action cannot be undone.</p>
            <div className="flex gap-3">
              <Button variant="danger" className="flex-1" onClick={() => handleWithdraw(withdrawApp.id)}>Yes, Withdraw</Button>
              <Button variant="secondary" className="flex-1" onClick={() => setWithdrawApp(null)}>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
