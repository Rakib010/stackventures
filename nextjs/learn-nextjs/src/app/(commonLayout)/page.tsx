"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h1 className="text-4xl mb-6">Learn Next.js</h1>
      <Button onClick={handleNavigate}>Dashboard</Button>
    </div>
  );
}
