import { useState } from 'react';
import { PageHeader, Button, Card, CardHeader, Input, Textarea, Badge, Avatar } from '@/components/shared';
import {
  BuildingLibraryIcon,
  GlobeAltIcon,
  MapPinIcon,
  PencilSquareIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

export default function CampusProfilePage() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'California Institute of Technology',
    domain: 'caltech.edu',
    location: 'Pasadena, California',
    description: 'A world-renowned science and engineering research university. Our students and faculty are solving some of the most challenging problems facing society.',
    website: 'https://www.caltech.edu',
    contactEmail: 'admin@caltech.edu',
    contactPhone: '+1 (626) 395-6811',
    established: '1891',
  });

  const handleChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <PageHeader
        title="Campus Profile"
        subtitle="Manage your institution's public profile."
        actions={
          editing ? (
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
              <Button onClick={() => setEditing(false)}>
                <CheckIcon className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button variant="gradient" onClick={() => setEditing(true)}>
              <PencilSquareIcon className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )
        }
      />

      {/* Header Card */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <BuildingLibraryIcon className="h-10 w-10" />
          </div>
          <div className="flex-1">
            {editing ? (
              <Input value={profile.name} onChange={(e) => handleChange('name', e.target.value)} label="Institution Name" />
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <GlobeAltIcon className="h-4 w-4" /> {profile.domain}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="h-4 w-4" /> {profile.location}
                  </span>
                </div>
              </>
            )}
            <div className="mt-3 flex gap-2">
              <Badge color="green" dot>Verified</Badge>
              <Badge color="blue">Est. {profile.established}</Badge>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* About */}
        <Card>
          <CardHeader title="About" />
          {editing ? (
            <Textarea
              value={profile.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              label="Description"
            />
          ) : (
            <p className="text-gray-600 leading-relaxed">{profile.description}</p>
          )}
        </Card>

        {/* Contact Details */}
        <Card>
          <CardHeader title="Contact Information" />
          {editing ? (
            <div className="space-y-4">
              <Input label="Website" value={profile.website} onChange={(e) => handleChange('website', e.target.value)} />
              <Input label="Contact Email" value={profile.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} />
              <Input label="Phone" value={profile.contactPhone} onChange={(e) => handleChange('contactPhone', e.target.value)} />
              <Input label="Location" value={profile.location} onChange={(e) => handleChange('location', e.target.value)} />
            </div>
          ) : (
            <dl className="space-y-3">
              {[
                { label: 'Website', value: profile.website },
                { label: 'Email', value: profile.contactEmail },
                { label: 'Phone', value: profile.contactPhone },
                { label: 'Location', value: profile.location },
              ].map((d) => (
                <div key={d.label} className="flex justify-between">
                  <dt className="text-sm text-gray-500">{d.label}</dt>
                  <dd className="text-sm font-medium text-gray-900">{d.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </Card>

        {/* Platform Stats */}
        <Card className="lg:col-span-2">
          <CardHeader title="Platform Statistics" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Students', value: '820', color: 'text-indigo-600' },
              { label: 'Active Gigs', value: '34', color: 'text-emerald-600' },
              { label: 'Completed Gigs', value: '186', color: 'text-blue-600' },
              { label: 'Avg. Rating', value: '4.7', color: 'text-amber-600' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-gray-50 p-4 text-center">
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="mt-1 text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
