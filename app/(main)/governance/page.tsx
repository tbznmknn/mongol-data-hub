import PageAboutLayout from '@/components/Controls/PageAboutLayout';
// Import the layout component
import VisionContent from './RulesContent';

export default function VisionPage() {
  return (
    <PageAboutLayout
      title="Засаглал"
      subtitle=""
      backgroundUrl="https://cdn.pixabay.com/photo/2017/06/28/22/42/downtown-new-york-2452459_1280.jpg"
      isGovernance={true}
    >
      <VisionContent />
    </PageAboutLayout>
  );
}
