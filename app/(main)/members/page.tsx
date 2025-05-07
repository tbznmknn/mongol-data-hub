import Members1 from '@/components/customui/main/Members1';

export default function Members() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-[#1478bf]">
        <p className="md:text-4x p-8 text-3xl text-[#f5f5f5] md:p-14 lg:p-32 lg:text-5xl">
          Бидний удирдлага
        </p>
      </div>
      <div className="mx-auto flex w-full max-w-7xl grow gap-5 lg:p-5">
        <main className="flex w-full min-w-0 gap-5">
          <div className="w-full min-w-0 space-y-5">
            <Members1 />
          </div>
        </main>
      </div>
    </div>
  );
}
