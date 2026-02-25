import { useState } from 'react';
import {
  PageHeader, Card, Badge, Avatar, Button,
  Table, TableHead, TableHeader, TableBody, TableRow, TableCell,
} from '@/components/shared';
import { CheckIcon, XMarkIcon, EyeIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const REQUESTS = [
  { id: 1, name: 'Carol Chen', email: 'carol@campus.edu', document: 'Student ID Card', submittedAt: '2026-02-22', mode: 'Both', status: 'pending' },
  { id: 2, name: 'Eva Martinez', email: 'eva@campus.edu', document: 'Enrollment Letter', submittedAt: '2026-02-21', mode: 'Recruiter', status: 'pending' },
  { id: 3, name: 'Grace Kim', email: 'grace@campus.edu', document: 'Student ID Card', submittedAt: '2026-02-20', mode: 'Freelancer', status: 'pending' },
  { id: 4, name: 'Alice Johnson', email: 'alice@campus.edu', document: 'Student ID Card', submittedAt: '2026-02-10', mode: 'Freelancer', status: 'approved' },
  { id: 5, name: 'Bob Williams', email: 'bob@campus.edu', document: 'Enrollment Letter', submittedAt: '2026-02-08', mode: 'Recruiter', status: 'approved' },
];

const statusColor = { pending: 'yellow', approved: 'green', rejected: 'red' };

export default function CampusVerificationsPage() {
  const [requests, setRequests] = useState(REQUESTS);
  const pending = requests.filter((r) => r.status === 'pending');

  const handleAction = (id, action) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r)),
    );
  };

  return (
    <div>
      <PageHeader
        title="Student Verifications"
        subtitle={`${pending.length} students awaiting verification.`}
      />

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
              <DocumentTextIcon className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-xl font-bold text-amber-600">{pending.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <CheckIcon className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Approved</p>
              <p className="text-xl font-bold text-emerald-600">
                {requests.filter((r) => r.status === 'approved').length}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
              <XMarkIcon className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Rejected</p>
              <p className="text-xl font-bold text-red-600">
                {requests.filter((r) => r.status === 'rejected').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card padding={false}>
        <Table>
          <TableHead>
            <TableHeader>Student</TableHeader>
            <TableHeader>Document</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader className="text-right">Actions</TableHeader>
          </TableHead>
          <TableBody>
            {requests.map((r) => (
              <TableRow key={r.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar name={r.name} size="sm" />
                    <div>
                      <p className="font-semibold text-gray-900">{r.name}</p>
                      <p className="text-xs text-gray-500">{r.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{r.document}</TableCell>
                <TableCell className="text-gray-500">
                  {new Date(r.submittedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge color={statusColor[r.status]} dot>{r.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {r.status === 'pending' ? (
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleAction(r.id, 'approved')}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        title="Approve"
                      >
                        <CheckIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(r.id, 'rejected')}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Reject"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        title="View document"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 capitalize">{r.status}</span>
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
