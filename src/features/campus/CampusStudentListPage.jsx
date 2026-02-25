import { useState } from 'react';
import {
  PageHeader, Button, Badge, Avatar, Card, CardHeader, SearchInput, Modal, Input, Select,
  Table, TableHead, TableHeader, TableBody, TableRow, TableCell,
} from '@/components/shared';
import {
  PlusIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

const STUDENTS = [
  { id: 1, name: 'Alice Johnson', email: 'alice@campus.edu', mode: 'Freelancer', skills: ['React', 'Node.js'], gigs: 5, rating: 4.8, verified: true, joinedAt: '2025-09-01' },
  { id: 2, name: 'Bob Williams', email: 'bob@campus.edu', mode: 'Recruiter', skills: ['Management', 'HR'], gigs: 3, rating: 4.5, verified: true, joinedAt: '2025-10-12' },
  { id: 3, name: 'Carol Chen', email: 'carol@campus.edu', mode: 'Both', skills: ['Python', 'ML', 'Data'], gigs: 8, rating: 4.9, verified: false, joinedAt: '2025-11-05' },
  { id: 4, name: 'David Lee', email: 'david@campus.edu', mode: 'Freelancer', skills: ['UI/UX', 'Figma'], gigs: 2, rating: 4.3, verified: true, joinedAt: '2025-12-20' },
  { id: 5, name: 'Eva Martinez', email: 'eva@campus.edu', mode: 'Recruiter', skills: ['Marketing', 'Content'], gigs: 0, rating: null, verified: false, joinedAt: '2026-01-15' },
  { id: 6, name: 'Frank Nguyen', email: 'frank@campus.edu', mode: 'Freelancer', skills: ['Java', 'Spring Boot'], gigs: 6, rating: 4.7, verified: true, joinedAt: '2025-08-28' },
];

const modeColor = { Freelancer: 'blue', Recruiter: 'purple', Both: 'cyan' };

export default function CampusStudentListPage() {
  const [search, setSearch] = useState('');
  const [showInvite, setShowInvite] = useState(false);

  const filtered = STUDENTS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <PageHeader
        title="Students"
        subtitle="Manage and monitor students in your campus."
        actions={
          <Button variant="gradient" onClick={() => setShowInvite(true)}>
            <EnvelopeIcon className="h-4 w-4 mr-2" />
            Invite Student
          </Button>
        }
      />

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        {[
          { label: 'Total', value: STUDENTS.length, cls: 'text-gray-900' },
          { label: 'Freelancers', value: STUDENTS.filter((s) => s.mode === 'Freelancer' || s.mode === 'Both').length, cls: 'text-blue-600' },
          { label: 'Recruiters', value: STUDENTS.filter((s) => s.mode === 'Recruiter' || s.mode === 'Both').length, cls: 'text-purple-600' },
          { label: 'Unverified', value: STUDENTS.filter((s) => !s.verified).length, cls: 'text-amber-600' },
        ].map((c) => (
          <Card key={c.label}>
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className={`mt-1 text-2xl font-bold ${c.cls}`}>{c.value}</p>
          </Card>
        ))}
      </div>

      <Card padding={false}>
        <div className="p-4 border-b border-gray-100">
          <SearchInput value={search} onChange={setSearch} placeholder="Search students..." />
        </div>
        <Table>
          <TableHead>
            <TableHeader>Student</TableHeader>
            <TableHeader>Mode</TableHeader>
            <TableHeader>Skills</TableHeader>
            <TableHeader>Gigs</TableHeader>
            <TableHeader>Rating</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader className="text-right">Actions</TableHeader>
          </TableHead>
          <TableBody>
            {filtered.map((s) => (
              <TableRow key={s.id}>
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
                  <div className="flex flex-wrap gap-1">
                    {s.skills.slice(0, 3).map((sk) => (
                      <span key={sk} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                        {sk}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="font-medium text-gray-700">{s.gigs}</TableCell>
                <TableCell>
                  {s.rating ? (
                    <span className="flex items-center gap-1 text-sm font-medium text-amber-600">
                      <span>★</span> {s.rating}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">N/A</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge color={s.verified ? 'green' : 'yellow'} dot size="sm">
                    {s.verified ? 'Verified' : 'Pending'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                      <PencilSquareIcon className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Invite Student Modal */}
      <Modal open={showInvite} onClose={() => setShowInvite(false)} title="Invite Student">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowInvite(false); }}>
          <Input label="Email Address" type="email" placeholder="student@campus.edu" required />
          <Select label="Suggested Mode">
            <option value="">Select mode</option>
            <option>Freelancer</option>
            <option>Recruiter</option>
            <option>Both</option>
          </Select>
          <Input label="Personal Message" placeholder="Welcome to our campus platform!" />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" type="button" onClick={() => setShowInvite(false)}>Cancel</Button>
            <Button type="submit">Send Invite</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
