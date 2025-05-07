import MyHero from './_components/Hero';
import About from './_components/Hero2';
import Udirdlaga from './_components/Hero3';
import Gishuud from './_components/Hero4';

import Medee from './_components/Hero6';
import Zuvlumj from './_components/Hero7';
import Surgalt from './_components/Hero8';
export default async function Home() {
  const urls = [
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/staticData/title/zorilgo-nuur`,
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/staticData/title/alsiin-haraa`,
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/staticData/title/title1-landing`,
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/staticData/title/title2-landing`,
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/staticData/title/subtitle1-landing`,
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/staticData/title/subtitle2-landing`
  ];

  const [zorilgo, alsiinharaa, title1, title2, sub1, sub2] = await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url, {
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' }
      });
      const jsonData = await response.json();
      return jsonData.data;
    })
  );
  console.log(zorilgo, sub1, sub2);
  return (
    <div>
      <MyHero
        zorilgo={zorilgo.description}
        alsiinharaa={alsiinharaa.description}
        title1={title1.name}
        title2={title2.name}
        sub1={sub1.name}
        sub2={sub2.name}
      />
      <About />
      <Udirdlaga />
      {/* <Zorilgo /> */}
      <Medee />
      <Zuvlumj />
      <Surgalt />
      <Gishuud />
    </div>
  );
}
