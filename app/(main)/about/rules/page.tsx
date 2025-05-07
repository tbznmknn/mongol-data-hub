import PageAboutLayout from '@/components/Controls/PageAboutLayout';

export default async function RulesPDF() {
  const urls = [
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/staticData/title/file-rules`
  ];

  const [file] = await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url, {
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' }
      });
      const jsonData = await response.json();
      return jsonData.data;
    })
  );
  const fileId = file?.name || '';
  const pdfUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

  return (
    <PageAboutLayout
      title="Дүрэм"
      subtitle="Монголын дата хабын Дүрэм"
      backgroundUrl="https://cdn.pixabay.com/photo/2017/06/28/22/42/downtown-new-york-2452459_1280.jpg"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg border bg-white shadow-lg">
          <div className="h-[800px] w-full overflow-hidden rounded-lg">
            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(
                pdfUrl
              )}&embedded=true`}
              width="100%"
              height="100%"
              title="Google Docs PDF Viewer"
              className="border-0"
            />
          </div>
        </div>
      </div>
    </PageAboutLayout>
  );
}
