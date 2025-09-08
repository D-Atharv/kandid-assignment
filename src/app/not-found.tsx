"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Rocket } from "lucide-react";
import Link from "next/link";

interface Star {
  top: string;
  left: string;
  delay: string;
}

export default function NotFoundPage() {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    let direction = 1;
    const interval = setInterval(() => {
      setOffset((prev) => {
        if (prev >= 10) direction = -1;
        if (prev <= -10) direction = 1;
        return prev + direction;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const generatedStars: Star[] = Array.from({ length: 8 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 4}s`,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center bg-gray-900 overflow-hidden px-4">
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-800/20 rounded-xl rotate-45 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-800/20 rounded-xl rotate-12 animate-pulse delay-2000"></div>
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-blue-800/20 rounded-xl rotate-[-30deg] animate-pulse delay-1000"></div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center text-center shadow-lg w-full max-w-lg">
          <h1 className="text-[6rem] font-extrabold text-white drop-shadow-md animate-bounce">
            404
          </h1>
          <p className="text-lg text-gray-300 mt-2">
            Sorry, the page you&apos;re looking for doesn&apos;t exist.
          </p>

          <div className="my-6 flex justify-center">
            <Rocket
              className="h-16 w-16 text-white"
              style={{ transform: `translateY(${offset}px)` }}
            />
          </div>

          <Button
            onClick={() => router.push("/login")}
            className="bg-purple-600 hover:bg-purple-700 text-white w-full"
          >
            Go Back Home
          </Button>
        </div>

        <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 w-full max-w-md text-center shadow-md">
          <p className="text-gray-400">
            Meanwhile, you can check our{" "}
            <Link href="/login" className="text-purple-500 underline">
              homepage
            </Link>{" "}
            or explore other sections.
          </p>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute h-0.5 w-20 bg-white/30 rounded-full animate-[shooting_4s_linear_infinite]"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes shooting {
          0% {
            transform: translateX(0) translateY(0) rotate(45deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(500px) translateY(500px) rotate(45deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
