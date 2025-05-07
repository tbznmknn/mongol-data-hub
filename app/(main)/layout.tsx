// Since we have a root `not-found.tsx` page, a layout file
// is required, even if it's just passing children through.
import Navbar from '@/components/Controls/NavBar';
import FooterSection from '@/components/sections/footer/default';
import MyFoot from '@/components/Controls/SeFooter';

import NewFoot from '@/components/Controls/SeNewFooter';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="">{children}</main> {/* Render the page content */}
      {/*<MyFoot />*/}
      <NewFoot />
    </div>
  );
}
