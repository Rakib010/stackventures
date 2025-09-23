import Image from "next/image";

export default function GalleryPage() {
  return (
    <div className="">
      <h1>Next.js Image Component</h1>
      <Image
        src="https://searchengineland.com/figz/wp-content/seloads/2020/03/code-SS_634574354-1920x1080-1.jpg"
        alt="Next.js architecture"
        width={300}
        height={300}
      />
    </div>
  );
}
