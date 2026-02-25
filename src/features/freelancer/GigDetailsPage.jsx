import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  PageHeader, Card, CardHeader, Badge, Avatar, Button, Modal, Input, Textarea,
} from '@/components/shared';
import {
  CurrencyDollarIcon,
  ClockIcon,
  MapPinIcon,
  CalendarDaysIcon,
  UserIcon,
  TagIcon,
  BookmarkIcon,
  ShareIcon,
  FlagIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
  EyeIcon,
  BriefcaseIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';

/* ── Mock gig data ───────────────────────── */
const GIGS_DB = {
  'g-10': {
    id: 'g-10', title: 'Build a Portfolio Website',
    description: 'Looking for a skilled developer to build a responsive portfolio site with React and Tailwind CSS. The site should be mobile-friendly, performant, and include the following features:\n\n- Hero section with animated elements\n- Project showcase grid with filtering\n- Blog section with markdown support\n- Contact form with email integration\n- Dark mode toggle\n- SEO optimization\n\nThe developer should have experience with React 18+, Tailwind CSS v4, and deployment to Vercel or Netlify.',
    budget: 150, tags: ['React', 'Tailwind CSS', 'Frontend', 'Responsive', 'Vercel'],
    status: 'open', campus: 'MIT', category: 'Web Development',
    postedBy: { name: 'Sarah Kim', avatar: null, rating: 4.7, gigsPosted: 8 },
    deadline: '2026-03-15', createdAt: '2026-02-24',
    applicants: 5, views: 42,
    deliverables: ['Fully responsive website', 'Source code on GitHub', 'Deployment to Vercel', 'Documentation'],
    requirements: ['2+ years React experience', 'Portfolio with similar projects', 'Available for 2-week timeline'],
  },
  'g-11': {
    id: 'g-11', title: 'Tutoring — Calculus II',
    description: 'Need a tutor for Calculus II, 3 sessions per week for 4 weeks. Must be available evenings after 6 PM EST. Topics include integration techniques, series convergence, and parametric equations.',
    budget: 300, tags: ['Tutoring', 'Math', 'Calculus'],
    status: 'open', campus: 'MIT', category: 'Tutoring & Education',
    postedBy: { name: 'Mike Torres', avatar: null, rating: 4.5, gigsPosted: 3 },
    deadline: '2026-03-20', createdAt: '2026-02-24',
    applicants: 3, views: 28,
    deliverables: ['12 tutoring sessions', 'Practice problem sets', 'Exam preparation notes'],
    requirements: ['Strong Calculus background', 'Previous tutoring experience', 'Available evenings'],
  },
  'g-12': {
    id: 'g-12', title: 'Video Editing — Campus Event',
    description: 'Edit a 15-minute highlight video from our annual tech fest footage. We have over 3 hours of raw footage that needs to be condensed into an engaging highlight reel with music, transitions, and captions.',
    budget: 100, tags: ['Video Editing', 'Premiere Pro', 'After Effects'],
    status: 'open', campus: 'Stanford', category: 'Video & Animation',
    postedBy: { name: 'Li Wei', avatar: null, rating: 4.9, gigsPosted: 12 },
    deadline: '2026-03-05', createdAt: '2026-02-22',
    applicants: 7, views: 55,
    deliverables: ['15-min highlight video', 'Short 60s social media cut', 'Project files'],
    requirements: ['Premiere Pro proficiency', 'Motion graphics experience', 'Quick turnaround'],
  },
};

/* Fallback for any gig not in DB */
const DEFAULT_GIG = {
  id: 'g-10', title: 'Build a Portfolio Website',
  description: 'Looking for a skilled developer to build a responsive portfolio site with React and Tailwind CSS.',
  budget: 150, tags: ['React', 'Tailwind CSS', 'Frontend'],
  status: 'open', campus: 'MIT', category: 'Web Development',
  postedBy: { name: 'Sarah Kim', avatar: null, rating: 4.7, gigsPosted: 8 },
  deadline: '2026-03-15', createdAt: '2026-02-24',
  applicants: 5, views: 42,
  deliverables: ['Fully responsive website', 'Source code on GitHub', 'Deployment'],
  requirements: ['2+ years React experience', 'Portfolio', 'Available 2 weeks'],
};

const similarGigs = [
  { id: 'g-20', title: 'React Admin Panel', budget: 200, campus: 'Stanford', tags: ['React', 'Dashboard'] },
  { id: 'g-21', title: 'Landing Page Design', budget: 80, campus: 'MIT', tags: ['HTML', 'CSS'] },
  { id: 'g-22', title: 'E-commerce Frontend', budget: 300, campus: 'Caltech', tags: ['React', 'Stripe'] },
];

export default function GigDetailsPage() {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const gig = GIGS_DB[gigId] || DEFAULT_GIG;

  const [saved, setSaved] = useState(false);
  const [showApply, setShowApply] = useState(false);
  const [applied, setApplied] = useState(false);
  const [applyForm, setApplyForm] = useState({ budget: '', coverLetter: '', timeline: '' });
  const [applyLoading, setApplyLoading] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    setApplyLoading(true);
    setTimeout(() => {
      setApplyLoading(false);
      setShowApply(false);
      setApplied(true);
    }, 1200);
  };

  const daysLeft = Math.max(0, Math.ceil((new Date(gig.deadline) - new Date()) / 86400000));

  return (
    <div>
      {/* Back nav */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeftIcon className="h-4 w-4" /> Back to Gigs
      </button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Main Content ────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <Card>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Badge color="green" dot>{gig.status}</Badge>
                <Badge color="blue" size="sm">{gig.category}</Badge>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSaved(!saved)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  title={saved ? 'Unsave' : 'Save gig'}
                >
                  {saved ? <BookmarkSolid className="h-5 w-5 text-indigo-500" /> : <BookmarkIcon className="h-5 w-5" />}
                </button>
                <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors" title="Share">
                  <ShareIcon className="h-5 w-5" />
                </button>
                <button className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Report">
                  <FlagIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900">{gig.title}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <CurrencyDollarIcon className="h-4 w-4 text-emerald-500" />
                <span className="text-lg font-bold text-emerald-600">${gig.budget}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPinIcon className="h-4 w-4" /> {gig.campus}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDaysIcon className="h-4 w-4" /> Due {gig.deadline}
              </span>
              <span className="flex items-center gap-1.5">
                <ClockIcon className="h-4 w-4" />
                <span className={daysLeft <= 3 ? 'text-red-600 font-medium' : ''}>{daysLeft} days left</span>
              </span>
              <span className="flex items-center gap-1.5">
                <EyeIcon className="h-4 w-4" /> {gig.views} views
              </span>
              <span className="flex items-center gap-1.5">
                <UserIcon className="h-4 w-4" /> {gig.applicants} applicants
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {gig.tags.map((t) => (
                <span key={t} className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-200/50">
                  {t}
                </span>
              ))}
            </div>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader title="Description" />
            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
              {gig.description}
            </div>
          </Card>

          {/* Deliverables */}
          {gig.deliverables && (
            <Card>
              <CardHeader title="Deliverables" />
              <ul className="space-y-2">
                {gig.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-700">{d}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Requirements */}
          {gig.requirements && (
            <Card>
              <CardHeader title="Requirements" />
              <ul className="space-y-2">
                {gig.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                    <span className="text-sm text-gray-700">{r}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Similar Gigs */}
          <Card>
            <CardHeader title="Similar Gigs" />
            <div className="grid gap-3 sm:grid-cols-3">
              {similarGigs.map((sg) => (
                <Link
                  key={sg.id}
                  to={`/student/gigs/${sg.id}`}
                  className="rounded-xl border border-gray-100 p-4 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
                >
                  <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors text-sm">{sg.title}</h4>
                  <p className="text-sm text-emerald-600 font-medium mt-1">${sg.budget}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {sg.tags.map((t) => (
                      <span key={t} className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500">{t}</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{sg.campus}</p>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* ── Sidebar ────────────────── */}
        <div className="space-y-6">
          {/* Apply Card */}
          <Card className="sticky top-6">
            {applied ? (
              <div className="text-center py-4">
                <div className="mx-auto h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                  <CheckCircleIcon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Application Submitted!</h3>
                <p className="text-sm text-gray-500 mt-1">The recruiter will review your application.</p>
                <Link to="/student/applications">
                  <Button variant="secondary" size="sm" className="mt-3">View My Applications</Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-gray-900">${gig.budget}</p>
                  <p className="text-sm text-gray-500">Fixed Price</p>
                </div>
                <Button
                  variant="gradient"
                  className="w-full"
                  size="lg"
                  onClick={() => setShowApply(true)}
                >
                  Apply Now
                </Button>
                <Button variant="secondary" className="w-full mt-2">
                  <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                  Message Recruiter
                </Button>
                <div className="mt-4 space-y-2 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <span>Applicants</span>
                    <span className="font-medium text-gray-900">{gig.applicants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Posted</span>
                    <span className="font-medium text-gray-900">{new Date(gig.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deadline</span>
                    <span className={`font-medium ${daysLeft <= 3 ? 'text-red-600' : 'text-gray-900'}`}>{gig.deadline}</span>
                  </div>
                </div>
              </>
            )}
          </Card>

          {/* Recruiter Card */}
          <Card>
            <CardHeader title="Posted By" />
            <div className="flex items-center gap-3 mb-3">
              <Avatar name={gig.postedBy.name} size="md" color="indigo" />
              <div>
                <p className="font-semibold text-gray-900">{gig.postedBy.name}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1 text-amber-600">
                    <StarIcon className="h-3.5 w-3.5" /> {gig.postedBy.rating}
                  </span>
                  <span>•</span>
                  <span>{gig.postedBy.gigsPosted} gigs</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full">View Profile</Button>
          </Card>

          {/* Safety Tips */}
          <Card className="bg-amber-50/50 ring-amber-200/50">
            <h4 className="text-sm font-semibold text-amber-800 mb-2">Safety Tips</h4>
            <ul className="space-y-1.5 text-xs text-amber-700">
              <li>• Never share personal financial information.</li>
              <li>• Use the platform's payment system.</li>
              <li>• Report suspicious activity immediately.</li>
              <li>• Verify the recruiter's campus affiliation.</li>
            </ul>
          </Card>
        </div>
      </div>

      {/* ── Apply Modal ───────────── */}
      <Modal open={showApply} onClose={() => setShowApply(false)} title="Apply for Gig" size="lg">
        <form onSubmit={handleApply} className="space-y-5">
          <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
            <h4 className="font-semibold text-gray-900">{gig.title}</h4>
            <p className="text-sm text-gray-500 mt-1">Budget: <span className="text-emerald-600 font-medium">${gig.budget}</span></p>
          </div>

          <Input
            label="Your Proposed Budget (USD)"
            type="number"
            min="1"
            required
            value={applyForm.budget}
            onChange={(e) => setApplyForm((p) => ({ ...p, budget: e.target.value }))}
            placeholder={`Suggested: $${gig.budget}`}
            hint="You can propose a different amount"
          />

          <Input
            label="Estimated Timeline"
            required
            value={applyForm.timeline}
            onChange={(e) => setApplyForm((p) => ({ ...p, timeline: e.target.value }))}
            placeholder="e.g. 2 weeks"
          />

          <Textarea
            label="Cover Letter"
            rows={5}
            required
            value={applyForm.coverLetter}
            onChange={(e) => setApplyForm((p) => ({ ...p, coverLetter: e.target.value }))}
            placeholder="Explain why you're the best fit for this gig. Mention relevant experience, skills, and your approach..."
            hint="A strong cover letter increases your chances of being accepted"
          />

          <div className="rounded-xl bg-indigo-50 p-3 text-xs text-indigo-700">
            <strong>Tip:</strong> Include links to your portfolio or relevant work samples to stand out!
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            <Button variant="secondary" type="button" onClick={() => setShowApply(false)}>Cancel</Button>
            <Button type="submit" variant="gradient" loading={applyLoading}>
              Submit Application
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
