import { useState } from 'react';
import {
  PageHeader, Card, Badge, Avatar, Button, Select,
} from '@/components/shared';
import {
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

const PIPELINE_STAGES = ['Applied', 'Reviewing', 'Shortlisted', 'Interviewing', 'Hired', 'Rejected'];

const stageColor = {
  Applied: 'bg-blue-50 border-blue-200 text-blue-700',
  Reviewing: 'bg-amber-50 border-amber-200 text-amber-700',
  Shortlisted: 'bg-purple-50 border-purple-200 text-purple-700',
  Interviewing: 'bg-cyan-50 border-cyan-200 text-cyan-700',
  Hired: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  Rejected: 'bg-red-50 border-red-200 text-red-700',
};
const stageDotColor = {
  Applied: 'bg-blue-500',
  Reviewing: 'bg-amber-500',
  Shortlisted: 'bg-purple-500',
  Interviewing: 'bg-cyan-500',
  Hired: 'bg-emerald-500',
  Rejected: 'bg-red-500',
};

const CANDIDATES = [
  { id: 'c-1', name: 'Alex Rivera', campus: 'MIT', rating: 4.8, skills: ['Figma', 'UI/UX'], gig: 'Mobile App UI Mockups', stage: 'Applied', appliedAt: 'Feb 23' },
  { id: 'c-2', name: 'Sam Chen', campus: 'MIT', rating: 4.5, skills: ['Figma', 'Mobile'], gig: 'Mobile App UI Mockups', stage: 'Reviewing', appliedAt: 'Feb 23' },
  { id: 'c-3', name: 'Jordan Park', campus: 'Stanford', rating: 4.9, skills: ['React', 'Tailwind'], gig: 'React Dashboard UI', stage: 'Hired', appliedAt: 'Feb 20' },
  { id: 'c-4', name: 'Maria Gonzalez', campus: 'Caltech', rating: 4.3, skills: ['React', 'Node.js'], gig: 'React Dashboard UI', stage: 'Rejected', appliedAt: 'Feb 19' },
  { id: 'c-5', name: 'Li Wei', campus: 'MIT', rating: 4.7, skills: ['Python', 'Data'], gig: 'Python Data Pipeline', stage: 'Shortlisted', appliedAt: 'Feb 22' },
  { id: 'c-6', name: 'Priya Sharma', campus: 'Stanford', rating: 4.6, skills: ['Node.js', 'MongoDB'], gig: 'React Dashboard UI', stage: 'Interviewing', appliedAt: 'Feb 21' },
  { id: 'c-7', name: 'Ethan Brown', campus: 'Caltech', rating: 4.4, skills: ['Python', 'ML'], gig: 'Python Data Pipeline', stage: 'Applied', appliedAt: 'Feb 24' },
  { id: 'c-8', name: 'Nina Patel', campus: 'MIT', rating: 4.8, skills: ['UI/UX', 'Sketch'], gig: 'Mobile App UI Mockups', stage: 'Shortlisted', appliedAt: 'Feb 22' },
];

export default function RecruitmentStatusPage() {
  const [candidates, setCandidates] = useState(CANDIDATES);
  const [gigFilter, setGigFilter] = useState('all');
  const [viewMode, setViewMode] = useState('pipeline'); // pipeline | list

  const gigs = [...new Set(CANDIDATES.map((c) => c.gig))];
  const filtered = gigFilter === 'all' ? candidates : candidates.filter((c) => c.gig === gigFilter);

  const moveCandidate = (id, newStage) => {
    setCandidates((prev) => prev.map((c) => c.id === id ? { ...c, stage: newStage } : c));
  };

  const getNextStage = (current) => {
    const idx = PIPELINE_STAGES.indexOf(current);
    if (idx < PIPELINE_STAGES.length - 2) return PIPELINE_STAGES[idx + 1]; // Skip 'Rejected'
    return null;
  };

  return (
    <div>
      <PageHeader
        title="Recruitment Pipeline"
        subtitle="Track candidates through your hiring stages."
        actions={
          <div className="flex items-center gap-3">
            <Select value={gigFilter} onChange={(e) => setGigFilter(e.target.value)}>
              <option value="all">All Gigs</option>
              {gigs.map((g) => <option key={g} value={g}>{g}</option>)}
            </Select>
            <div className="flex rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setViewMode('pipeline')}
                className={`px-3 py-2 text-xs font-medium transition-colors ${viewMode === 'pipeline' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
              >Pipeline</button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-xs font-medium transition-colors ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
              >List</button>
            </div>
          </div>
        }
      />

      {/* Pipeline Summary */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
        {PIPELINE_STAGES.map((stage) => {
          const count = filtered.filter((c) => c.stage === stage).length;
          return (
            <div key={stage} className={`rounded-xl border p-3 text-center ${stageColor[stage]}`}>
              <p className="text-lg font-bold">{count}</p>
              <p className="text-xs font-medium">{stage}</p>
            </div>
          );
        })}
      </div>

      {viewMode === 'pipeline' ? (
        /* ── Kanban Pipeline View ── */
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto">
          {PIPELINE_STAGES.map((stage) => {
            const cards = filtered.filter((c) => c.stage === stage);
            return (
              <div key={stage} className="min-w-[220px]">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${stageDotColor[stage]}`} />
                  <h3 className="text-sm font-semibold text-gray-700">{stage}</h3>
                  <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">{cards.length}</span>
                </div>
                <div className="space-y-3">
                  {cards.map((c) => (
                    <Card key={c.id} className="!p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar name={c.name} size="xs" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{c.name}</p>
                          <p className="text-xs text-gray-400">{c.campus}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 truncate mb-2">{c.gig}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {c.skills.map((s) => (
                          <span key={s} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600">{s}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-400">{c.appliedAt}</span>
                        {getNextStage(c.stage) && c.stage !== 'Hired' && (
                          <button
                            onClick={() => moveCandidate(c.id, getNextStage(c.stage))}
                            className="flex items-center gap-0.5 rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-600 hover:bg-indigo-100 transition-colors"
                            title={`Move to ${getNextStage(c.stage)}`}
                          >
                            Next <ChevronRightIcon className="h-2.5 w-2.5" />
                          </button>
                        )}
                        {c.stage !== 'Rejected' && c.stage !== 'Hired' && (
                          <button
                            onClick={() => moveCandidate(c.id, 'Rejected')}
                            className="rounded-md p-1 text-gray-300 hover:bg-red-50 hover:text-red-500 transition-colors"
                            title="Reject"
                          >
                            <XCircleIcon className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </Card>
                  ))}
                  {cards.length === 0 && (
                    <div className="rounded-xl border-2 border-dashed border-gray-200 p-6 text-center">
                      <p className="text-xs text-gray-400">No candidates</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ── List View ── */
        <Card padding={false}>
          <div className="divide-y divide-gray-100">
            {filtered.map((c) => (
              <div key={c.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                <Avatar name={c.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.campus} • {c.gig}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {c.skills.map((s) => <span key={s} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{s}</span>)}
                </div>
                <Badge color={stageColor[c.stage].includes('blue') ? 'blue' : stageColor[c.stage].includes('amber') ? 'yellow' : stageColor[c.stage].includes('purple') ? 'purple' : stageColor[c.stage].includes('cyan') ? 'blue' : stageColor[c.stage].includes('emerald') ? 'green' : 'red'}>
                  {c.stage}
                </Badge>
                <div className="flex gap-1">
                  {getNextStage(c.stage) && c.stage !== 'Hired' && (
                    <button onClick={() => moveCandidate(c.id, getNextStage(c.stage))} className="rounded-lg p-1.5 text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors" title={`Move to ${getNextStage(c.stage)}`}>
                      <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  )}
                  {c.stage !== 'Rejected' && c.stage !== 'Hired' && (
                    <button onClick={() => moveCandidate(c.id, 'Rejected')} className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Reject">
                      <XCircleIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
