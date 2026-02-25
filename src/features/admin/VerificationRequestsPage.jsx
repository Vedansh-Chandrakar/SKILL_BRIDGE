import { useState } from 'react';
import {
  PageHeader, Button, Badge, Avatar, Card, CardHeader,
  Table, TableHead, TableHeader, TableBody, TableRow, TableCell,
} from '@/components/shared';
import { CheckIcon, XMarkIcon, EyeIcon } from '@heroicons/react/24/outline';

const VERIFICATIONS = [
  { id: 'v-1', entity: 'Caltech', type: 'campus', submittedBy: 'Dr. Adams', email: 'adams@caltech.edu', document: 'Campus Registration Certificate', submittedAt: '2026-02-20', status: 'pending' },
  { id: 'v-2', entity: 'UC Berkeley', type: 'campus', submittedBy: 'Prof. Kim', email: 'kim@berkeley.edu', document: 'Accreditation Letter', submittedAt: '2026-02-18', status: 'pending' },
  { id: 'v-3', entity: 'Stanford', type: 'campus', submittedBy: 'Dean Wilson', email: 'wilson@stanford.edu', document: 'Campus Registration Certificate', submittedAt: '2026-02-10', status: 'approved' },
  { id: 'v-4', entity: 'John Park', type: 'student', submittedBy: 'John Park', email: 'john@caltech.edu', document: 'Student ID', submittedAt: '2026-02-22', status: 'pending' },
  { id: 'v-5', entity: 'MIT', type: 'campus', submittedBy: 'Dr. Johnson', email: 'johnson@mit.edu', document: 'Campus Registration Certificate', submittedAt: '2026-01-15', status: 'approved' },
];

const statusColor = { pending: 'yellow', approved: 'green', rejected: 'red' };
const typeColor = { campus: 'blue', student: 'indigo' };

export default function VerificationRequestsPage() {
  const [requests, setRequests] = useState(VERIFICATIONS);

  const pendingCount = requests.filter((r) => r.status === 'pending').length;

  const handleAction = (id, action) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r)),
    );
  };

  return (
    <div>
      <PageHeader
        title="Verification Requests"
        subtitle={`${pendingCount} pending verification${pendingCount !== 1 ? 's' : ''}`}
      />

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <Card>
          <p className="text-sm text-gray-500">Pending</p>
          <p className="mt-1 text-3xl font-bold text-amber-600">{pendingCount}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Approved</p>
          <p className="mt-1 text-3xl font-bold text-emerald-600">
            {requests.filter((r) => r.status === 'approved').length}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Rejected</p>
          <p className="mt-1 text-3xl font-bold text-red-600">
            {requests.filter((r) => r.status === 'rejected').length}
          </p>
        </Card>
      </div>

      <Card padding={false}>
        <Table>
          <TableHead>
            <TableHeader>Entity</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Submitted By</TableHeader>
            <TableHeader>Document</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader className="text-right">Actions</TableHeader>
          </TableHead>
          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar name={req.entity} size="sm" color={req.type === 'campus' ? 'blue' : 'indigo'} />
                    <span className="font-semibold text-gray-900">{req.entity}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge color={typeColor[req.type]} size="sm">{req.type}</Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-gray-900">{req.submittedBy}</p>
                    <p className="text-xs text-gray-500">{req.email}</p>
                  </div>
                </TableCell>
                <TableCell className="text-gray-500">{req.document}</TableCell>
                <TableCell className="text-gray-500">
                  {new Date(req.submittedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge color={statusColor[req.status]} dot>{req.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {req.status === 'pending' ? (
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleAction(req.id, 'approved')}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        aria-label="Approve"
                      >
                        <CheckIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(req.id, 'rejected')}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        aria-label="Reject"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        aria-label="View details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">Resolved</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
