'use client';

import { motion } from 'framer-motion';
import { LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function Durem() {
  return (
    <div>
      <Link href="/about/rules">
        <motion.div
          whileHover={{
            scale: 1.03,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            borderBottomWidth: '6px'
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex w-full cursor-pointer items-center gap-3 border border-b-4 border-gray-300 border-b-primary px-2 py-4 font-bold"
        >
          Дүрэм <LinkIcon className="size-4 text-primary" />
        </motion.div>
      </Link>
    </div>
  );
}
