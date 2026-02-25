import { useState } from 'react';
import {
  PageHeader, Button, Badge, Avatar, SearchInput, Card, Tabs,
  Table, TableHead, TableHeader, TableBody, TableRow, TableCell,
} from '@/components/shared';
import { FunnelIcon } from '@heroicons/react/24/outline';

const USERS = [
  { id: 'u-1', name: 'Jane Doe', email: 'jane@mit.edu', role: 'student', mode: 'freelancer', campus: 'MIT', status: 'active', joinedAt: '2025-09-01' },
  { id: 'u-2', name: 'Alex Chen', email: 'alex@stanford.edu', role: 'student', mode: 'recruiter', campus: 'Stanford', status: 'active', joinedAt: '2025-09-15' },
  { id: 'u-3', name: 'Sarah Lee', email: 'sarah@mit.edu', role: 'student', mode: 'freelancer', campus: 'MIT', status: 'active', joinedAt: '2025-10-01' },
  { id: 'u-4', name: 'Dr. Smith', email: 'smith@harvard.edu', role: 'campus', mode: null, campus: 'Harvard', status: 'active', joinedAt: '2025-05-20' },
  { id: 'u-5', name: 'John Park', email: 'john@caltech.edu', role: 'student', mode: 'both', campus: 'Caltech', status: 'suspended', joinedAt: '2025-11-10' },
  { id: 'u-6', name: 'Maria Garcia', email: 'maria@berkeley.edu', role: 'student', mode: 'freelancer', campus: 'UC Berkeley', status: 'pending', joinedAt: '2026-01-05' },
];

const roleColor = { student: 'indigo', campus: 'blue', admin: 'purple' };
const statusColor = { active: 'green', suspended: 'red', pending: 'yellow' };
const modeColor = { freelancer: 'cyan', recruiter: 'purple', both: 'indigo' };

function UserTable({ users }) {
  return (
    <Table>
      <TableHead>
        <TableHeader>User</TableHeader>
        <TableHeader>Role</TableHeader>
        <TableHeader>Mode</TableHeader>
        <TableHeader>Campus</TableHeader>
        <TableHeader>Status</TableHeader>
        <TableHeader>Joined</TableHeader>
        <TableHeader className="text-right">Actions</TableHeader>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar name={user.name} size="sm" status={user.status === 'active' ? 'online' : 'offline'} />
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge color={roleColor[user.role]} size="sm">{user.role}</Badge>
            </TableCell>
            <TableCell>
              {user.mode ? (
                <Badge color={modeColor[user.mode]} size="sm">{user.mode}</Badge>
              ) : (
                <span className="text-gray-400">—</span>
              )}
            </TableCell>
            <TableCell className="text-gray-500">{user.campus}</TableCell>
            <TableCell>
              <Badge color={statusColor[user.status]} dot size="sm">{user.status}</Badge>
            </TableCell>
            <TableCell className="text-gray-500">
              {new Date(user.joinedAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="xs">Manage</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function UserManagementPage() {
  const [search, setSearch] = useState('');

  const filtered = USERS.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const students = filtered.filter((u) => u.role === 'student');
  const campusUsers = filtered.filter((u) => u.role === 'campus');

  const tabs = [
    { label: 'All Users', count: filtered.length, content: <UserTable users={filtered} /> },
    { label: 'Students', count: students.length, content: <UserTable users={students} /> },
    { label: 'Campus Auth', count: campusUsers.length, content: <UserTable users={campusUsers} /> },
  ];

  return (
    <div>
      <PageHeader
        title="User Management"
        subtitle="View and manage all platform users"
        actions={
          <Button variant="secondary">
            <FunnelIcon className="h-4 w-4" /> Filter
          </Button>
        }
      />

      <Card>
        <div className="mb-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by name or email..."
            className="max-w-sm"
          />
        </div>
        <Tabs tabs={tabs} />
      </Card>
    </div>
  );
}
