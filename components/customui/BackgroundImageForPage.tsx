import Image from 'next/image';
export default function BackgroundImageForPage({
  title,
  description,
  url,
  alt
}: {
  title: string;
  url: string;
  alt: string;
  description?: string;
}) {
  return (
    <div className="relative h-[30vh] w-full sm:h-[50vh] ">
      <Image fill className="h-full w-full object-cover" src={url} alt={alt} />
      {/* Optional Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
    </div>
  );
}
