export default function Stats() {
  return (
    <div>
      <div className="container mx-auto max-w-[960px]">
        <div className="grid grid-cols-2 gap-12 sm:grid-cols-4">
          <div className="flex flex-col items-start gap-3 text-left">
            <div className="text-sm font-semibold text-muted-foreground">
              {/* used by */}
            </div>
            <div className="flex items-baseline gap-2">
              <div className="dark:to-brand bg-gradient-to-r from-foreground to-foreground bg-clip-text text-4xl font-medium text-transparent drop-shadow-[2px_1px_24px_hsla(var(--brand-foreground))] transition-all duration-300 sm:text-5xl md:text-6xl">
                125
              </div>
            </div>
            <div className="text-pretty text-sm font-semibold text-muted-foreground">
              Хувьцаат компаниуд
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
