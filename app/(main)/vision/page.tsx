import PageAboutLayout from '@/components/Controls/PageAboutLayout';
import VisionContent from './VisionContent';

export default function VisionPage() {
  return (
    <PageAboutLayout
      title="Алсын хараа, Эрхэм зорилго"
      subtitle="Тунгалаг засаглал, бизнесийн өсөлт"
      backgroundUrl="https://cdn.pixabay.com/photo/2017/06/28/22/42/downtown-new-york-2452459_1280.jpg"
    >
      <VisionContent />
    </PageAboutLayout>
  );
}
