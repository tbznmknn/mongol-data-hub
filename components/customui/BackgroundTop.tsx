export default function BackgroundTop({
  title,
  image,
  description
}: {
  title: string;
  image?: string;
  description?: string;
}) {
  return (
    <div className="bg-[#0D355D]">
      <p className="md:text-4x px-8 pb-8 pt-16 text-3xl text-[#f5f5f5] md:p-16 lg:p-32 lg:text-5xl">
        {title}
      </p>
    </div>
  );
}
