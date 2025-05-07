'use client';

import { z } from 'zod';
import { Hero } from '@/components/custom/hero';
import { BentoMinimalTiptap } from '@/components/custom/types';

export default function App() {
  return (
    <div className="px-4 py-12 sm:py-24">
      <main className="mx-auto w-full max-w-4xl">
        <Hero />
        <div className="mt-12 flex flex-col gap-12 sm:mt-20">
          <BentoMinimalTiptap />
          {/* <ExampleForm /> */}
        </div>
      </main>
    </div>
  );
}

const formSchema = z.object({
  description: z
    .string({
      required_error: 'Description is required'
    })
    .min(1, 'Description is required')
});
