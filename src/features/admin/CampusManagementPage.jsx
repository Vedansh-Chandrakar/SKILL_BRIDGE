import { useState } from 'react';
import {
  PageHeader, Button, Badge, Avatar, SearchInput, Card, Modal, Input,
  Table, TableHead, TableHeader, TableBody, TableRow, TableCell,
} from '@/components/shared';
import { PlusIcon, PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

const CAMPUSES = [
  { id: 'c-1', name: 'MIT', domain: 'mit.edu', students: 820, gigs: 145, status: 'active', joinedAt: '2025-01-15' },
  { id: 'c-2', name: 'Stanford University', domain: 'stanford.edu', students: 650, gigs: 120, status: 'active', joinedAt: '2025-02-20' },
  { id: 'c-3', name: 'Harvard University', domain: 'harvard.edu', students: 480, gigs: 89, status: 'active', joinedAt: '2025-03-10' },
  { id: 'c-4', name: 'Caltech', domain: 'caltech.edu', students: 320, gigs: 67, status: 'pending', joinedAt: '2025-06-01' },
  { id: 'c-5', name: 'UC Berkeley', domain: 'berkeley.edu', students: 0, gigs: 0, status: 'inactive', joinedAt: '2025-08-15' },
];

export default function CampusManagementPage() {
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = CAMPUSES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  const statusColor = { active: 'green', pending: 'yellow', inactive: 'gray' };

  return (
    <div>
      <PageHeader
        title="Campus Management"
        subtitle="Manage all registered campuses on the platform"
        actions={
          <Button onClick={() => setShowAddModal(true)}>
            <PlusIcon className="h-4 w-4" /> Add Campus
          </Button>
        }
      />

      <Card padding={false}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search campuses..."
            className="w-64"
          />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{filtered.length} campuses</span>
          </div>
        </div>

        <Table>
          <TableHead>
            <TableHeader>Campus</TableHeader>
            <TableHeader>Domain</TableHeader>
            <TableHeader>Students</TableHeader>
            <TableHeader>Gigs</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Joined</TableHeader>
            <TableHeader className="text-right">Actions</TableHeader>
          </TableHead>
          <TableBody>
            {filtered.map((campus) => (
              <TableRow key={campus.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar name={campus.name} size="sm" color="blue" />
                    <span className="font-semibold text-gray-900">{campus.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-500">{campus.domain}</TableCell>
                <TableCell>{campus.students.toLocaleString()}</TableCell>
                <TableCell>{campus.gigs}</TableCell>
                <TableCell>
                  <Badge color={statusColor[campus.status]} dot>{campus.status}</Badge>
                </TableCell>
                <TableCell className="text-gray-500">
                  {new Date(campus.joinedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors" aria-label="View">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors" aria-label="Edit">
                      <PencilSquareIcon className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors" aria-label="Delete">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Add Campus Modal */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Campus">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddModal(false); }}>
          <Input label="Campus Name" placeholder="e.g. MIT" required />
          <Input label="Domain" placeholder="e.g. mit.edu" required />
          <Input label="Admin Email" type="email" placeholder="admin@mit.edu" required />
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="secondary" type="button" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button type="submit">Add Campus</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
