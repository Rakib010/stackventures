/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogCard from "@/components/modules/Blogs/BlogCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blogs | Next Blog",
  description: "New blog for teach student ",
};

const AllBlogsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`);

  const { data: blogs } = await res.json();
  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl">All Blogs</h2>
      <div>
        <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto my-8">
          {blogs?.map((blog: any) => (
            <BlogCard key={blog?.id} post={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBlogsPage;
