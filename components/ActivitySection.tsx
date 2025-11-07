import { Divider } from './Divider';
import { ActivityData } from '@/lib/types/content';

interface ActivitySectionProps {
  data: ActivityData;
}

export function ActivitySection({ data }: ActivitySectionProps) {
  return (
    <div className="flex flex-col gap-spacing-6 px-spacing-8 py-spacing-8">
      {/* Recent Activity */}
      <div className="flex flex-col gap-spacing-6">
        <h2 className="text-body text-text">{data.recentTitle}</h2>
        <p className="text-body text-text-secondary">{data.recentActivity}</p>
      </div>

      <Divider />

      {/* What's New */}
      <div className="flex flex-col gap-spacing-6">
        <h2 className="text-body text-text">{data.whatsNewTitle}</h2>
        <ul className="flex flex-col gap-spacing-6">
          {data.updates.map((update, index) => (
            <li key={index} className="text-body text-text-secondary">
              {update}
            </li>
          ))}
          <li className="text-body text-text-secondary">{data.moreLink}</li>
        </ul>
      </div>
    </div>
  );
}
