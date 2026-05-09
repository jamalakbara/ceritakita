"use client";

import { useEffect, useRef, useState, useCallback, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function NavigationProgressInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completingRef = useRef(false);

  const startProgress = useCallback(() => {
    if (completingRef.current) return;
    setVisible(true);
    setProgress(10);
  }, []);

  const completeProgress = useCallback(() => {
    completingRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(100);
    setTimeout(() => {
      setVisible(false);
      setProgress(0);
      completingRef.current = false;
    }, 300);
  }, []);

  useEffect(() => {
    completeProgress();
  }, [pathname, searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!visible || progress >= 85) return;
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 85) {
          clearInterval(timerRef.current!);
          return 85;
        }
        return Math.min(85, p + Math.random() * 12);
      });
    }, 350);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      const destPath = href.split("?")[0];
      if (destPath !== pathname) startProgress();
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, startProgress]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1 pointer-events-none">
      <div
        className="h-full bg-[#FF6B6B] transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function NavigationProgress() {
  return (
    <Suspense>
      <NavigationProgressInner />
    </Suspense>
  );
}
