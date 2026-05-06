"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Book, SoundTrigger } from "@/lib/types";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  XIcon,
  SparkleIcon,
  SpeakerIcon,
  BookOpenIcon,
  StarIcon,
  CheckIcon,
  RefreshIcon,
  SkipIcon,
  GamepadIcon,
} from "@/components/icons";
import { Progress } from "@/components/ui/progress";

type ReaderState = "reading" | "game" | "completed";

export default function SlideReader({ book, recommended }: { book: Book; recommended: Book[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [readerState, setReaderState] = useState<ReaderState>("reading");
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
  const [activeSoundId, setActiveSoundId] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameResult, setGameResult] = useState<"correct" | "wrong" | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = book.slides.length;
  const progress = ((currentSlide + 1) / totalSlides) * 100;
  const currentSlideData = book.slides[currentSlide];

  // Navigate slides
  const goToSlide = useCallback(
    (direction: "next" | "prev") => {
      if (direction === "next") {
        if (currentSlide >= totalSlides - 1) {
          // End of slides → go to game or completed
          if (book.game) {
            setReaderState("game");
          } else {
            setReaderState("completed");
          }
          return;
        }
        setSlideDirection("left");
        setCurrentSlide((prev) => prev + 1);
      } else {
        if (currentSlide <= 0) return;
        setSlideDirection("right");
        setCurrentSlide((prev) => prev - 1);
      }

      // Clear direction after animation
      setTimeout(() => setSlideDirection(null), 400);
    },
    [currentSlide, totalSlides, book.game]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (readerState !== "reading") return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goToSlide("next");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToSlide("prev");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToSlide, readerState]);

  // Touch/Swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) goToSlide("next");
      else goToSlide("prev");
    }
    touchStartX.current = null;
  };

  // Sound trigger handler
  const playSound = (trigger: SoundTrigger) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setActiveSoundId(trigger.id);

    audioRef.current = new Audio(trigger.audioUrl);
    audioRef.current.play().catch(() => setTimeout(() => setActiveSoundId(null), 1500));
    audioRef.current.addEventListener("ended", () => setActiveSoundId(null));
  };

  // Game answer handler
  const handleGameAnswer = (optionId: string) => {
    if (selectedAnswer) return; // Prevent re-answering
    setSelectedAnswer(optionId);

    const selectedOption = book.game?.options.find((o) => o.id === optionId);
    if (selectedOption?.isCorrect) {
      setGameResult("correct");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setGameResult("wrong");
    }
  };

  const resetGame = () => {
    setSelectedAnswer(null);
    setGameResult(null);
  };



  // ===== READING STATE =====
  if (readerState === "reading") {
    return (
      <div
        ref={containerRef}
        className="fixed inset-0 bg-[#2D1B69] flex flex-col select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-3 sm:px-6 py-3 bg-gradient-to-b from-black/40 to-transparent">
          <Link
            href={`/book/${book.id}`}
            className="clay-button flex items-center gap-2 px-3 py-2 bg-white/90 text-[#2D1B69] text-xs sm:text-sm font-bold rounded-xl"
            id="exit-reader"
          >
            <XIcon size={16} />
            <span className="hidden sm:inline">Keluar</span>
          </Link>

          <h2 className="font-heading text-white text-xs sm:text-sm font-bold truncate max-w-[40%] text-center">
            {book.title}
          </h2>

          <div className="text-white text-xs sm:text-sm font-bold bg-white/20 rounded-full px-3 py-1.5 backdrop-blur-sm">
            {currentSlide + 1} / {totalSlides}
          </div>
        </div>

        {/* Slide Display */}
        <div className="flex-1 flex items-center justify-center relative">
          <div
            className={`relative w-full h-full max-w-[1200px] max-h-[675px] mx-auto ${
              slideDirection === "left"
                ? "animate-slide-in-right"
                : slideDirection === "right"
                ? "animate-slide-in-left"
                : ""
            }`}
            style={{ aspectRatio: "16/9" }}
          >
            <Image
              src={currentSlideData.imageUrl}
              alt={`${book.title} - Halaman ${currentSlide + 1}`}
              fill
              className="object-contain"
              priority
              sizes="100vw"
              unoptimized
            />

            {/* Sound Triggers */}
            {currentSlideData.soundTriggers.map((trigger) => (
              <button
                key={trigger.id}
                className={`absolute z-20 group cursor-pointer ${
                  activeSoundId === trigger.id ? "animate-pop-in" : ""
                }`}
                style={{
                  left: `${trigger.x}%`,
                  top: `${trigger.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  playSound(trigger);
                }}
                aria-label={trigger.label}
                title={trigger.label}
              >
                {/* Pulse ring — only on hover or active */}
                <div
                  className={`absolute inset-0 rounded-full sound-trigger-pulse ${
                    activeSoundId === trigger.id
                      ? "bg-[#4ECDC4]/40 block"
                      : "bg-[#FFE66D]/40 hidden group-hover:block"
                  }`}
                  style={{ width: "52px", height: "52px", margin: "-10px" }}
                />
                {/* Icon button */}
                <div
                  className={`relative rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                    activeSoundId === trigger.id
                      ? "w-10 h-10 bg-[#4ECDC4] scale-125"
                      : "w-5 h-5 bg-white/20 group-hover:w-9 group-hover:h-9 group-hover:bg-[#FFE66D] group-hover:scale-110"
                  }`}
                  style={{
                    boxShadow: activeSoundId === trigger.id
                      ? "0 4px 12px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.4)"
                      : undefined,
                    border: "1.5px solid rgba(255,255,255,0.4)",
                  }}
                >
                  {activeSoundId === trigger.id ? (
                    <SpeakerIcon size={18} className="text-white" />
                  ) : (
                    <SparkleIcon size={12} className="text-white/60 group-hover:text-[#2D1B69] group-hover:w-[18px] group-hover:h-[18px] transition-all duration-300" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            className={`absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 clay-button w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl transition-all ${
              currentSlide <= 0
                ? "opacity-30 cursor-not-allowed bg-white/20"
                : "bg-white/90 hover:bg-white text-[#2D1B69]"
            }`}
            onClick={() => goToSlide("prev")}
            disabled={currentSlide <= 0}
            aria-label="Halaman sebelumnya"
            id="prev-slide"
          >
            <ChevronLeftIcon size={28} />
          </button>

          <button
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 clay-button w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl bg-white/90 hover:bg-white text-[#2D1B69] transition-all"
            onClick={() => goToSlide("next")}
            aria-label="Halaman selanjutnya"
            id="next-slide"
          >
            <ChevronRightIcon size={28} />
          </button>
        </div>

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-30 px-4 sm:px-8 pb-4 pt-8 bg-gradient-to-t from-black/40 to-transparent">
          <Progress
            value={progress}
            className="h-2.5 sm:h-3 rounded-full bg-white/20"
          />
        </div>
      </div>
    );
  }

  // ===== GAME STATE =====
  if (readerState === "game" && book.game) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#2D1B69] via-[#4A2D8B] to-[#2D1B69] flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto">
        {/* Confetti */}
        {showConfetti && (
          <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden" aria-hidden="true">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  background: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A78BFA", "#60A5FA", "#F472B6"][
                    i % 6
                  ],
                  animation: `confetti-fall ${1.5 + Math.random() * 2}s linear forwards`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Skip button */}
        {!selectedAnswer && (
          <button
            onClick={() => setReaderState("completed")}
            className="absolute top-4 right-4 z-40 clay-button flex items-center gap-2 px-4 py-2 bg-white/20 text-white/80 text-sm font-bold rounded-xl hover:bg-white/30 transition-colors"
            id="skip-game"
          >
            <SkipIcon size={16} />
            Skip
          </button>
        )}

        <div className="max-w-2xl w-full text-center">
          {/* Game header */}
          <div className="mb-6 sm:mb-8 animate-pop-in">
            <div className="inline-flex items-center gap-2 bg-[#FFE66D] text-[#2D1B69] px-5 py-2 rounded-full font-bold text-sm mb-4 clay-button">
              <GamepadIcon size={18} />
              Mini Game
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2">
              {book.game.question}
            </h2>
            <p className="text-white/60 text-sm">
              Pilih jawaban yang benar!
            </p>
          </div>

          {/* Answer Options Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
            {book.game.options.map((option, index) => {
              const isSelected = selectedAnswer === option.id;
              const showCorrect = selectedAnswer && option.isCorrect;
              const showWrong = isSelected && !option.isCorrect;

              return (
                <button
                  key={option.id}
                  onClick={() => handleGameAnswer(option.id)}
                  disabled={!!selectedAnswer}
                  className={`clay-card p-3 sm:p-4 flex flex-col items-center gap-2 sm:gap-3 transition-all cursor-pointer ${
                    showCorrect
                      ? "ring-4 ring-[#4ECDC4] bg-[#4ECDC4]/20 animate-pop-in"
                      : showWrong
                      ? "ring-4 ring-[#FF4757] animate-shake bg-[#FF4757]/20"
                      : selectedAnswer
                      ? "opacity-50"
                      : "hover:scale-105"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  id={`game-option-${option.id}`}
                  aria-label={option.label}
                >
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white">
                    <Image
                      src={option.imageUrl}
                      alt={option.label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 40vw, 200px"
                      unoptimized
                    />
                    {/* Result indicator */}
                    {showCorrect && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#4ECDC4]/40">
                        <div className="w-14 h-14 rounded-full bg-[#4ECDC4] flex items-center justify-center animate-star-burst">
                          <CheckIcon size={32} className="text-white" />
                        </div>
                      </div>
                    )}
                    {showWrong && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#FF4757]/40">
                        <div className="w-14 h-14 rounded-full bg-[#FF4757] flex items-center justify-center animate-shake">
                          <XIcon size={32} className="text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="font-heading font-bold text-[#2D1B69] text-sm sm:text-base">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Game Result Actions */}
          {gameResult && (
            <div className="animate-pop-in space-y-4">
              {gameResult === "correct" ? (
                <div className="flex items-center justify-center gap-2 text-[#4ECDC4] mb-4">
                  <StarIcon size={28} className="animate-star-burst" />
                  <span className="font-heading text-xl sm:text-2xl font-extrabold">
                    Benar! Hebat sekali! 🎉
                  </span>
                  <StarIcon size={28} className="animate-star-burst" style={{ animationDelay: "0.2s" }} />
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-[#FF6B6B] mb-4">
                  <span className="font-heading text-xl sm:text-2xl font-extrabold">
                    Oops! Coba lagi ya!
                  </span>
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-3">
                {gameResult === "wrong" && (
                  <button
                    onClick={resetGame}
                    className="clay-button flex items-center gap-2 px-6 py-3 bg-[#FFE66D] text-[#2D1B69] font-bold rounded-xl"
                    id="retry-game"
                  >
                    <RefreshIcon size={18} />
                    Coba Lagi
                  </button>
                )}
                <button
                  onClick={() => setReaderState("completed")}
                  className="clay-button flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white font-bold rounded-xl"
                  id="finish-game"
                >
                  <ChevronRightIcon size={18} />
                  {gameResult === "correct" ? "Lanjut" : "Selesai"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ===== COMPLETED STATE =====
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#2D1B69] via-[#4A2D8B] to-[#2D1B69] flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto">
      <div className="max-w-2xl w-full text-center">
        {/* Celebration */}
        <div className="mb-8 animate-pop-in">
          <div className="flex justify-center gap-2 mb-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon
                key={i}
                size={32}
                className="text-[#FFE66D] animate-star-burst"
                style={{ animationDelay: `${i * 0.15}s` } as React.CSSProperties}
              />
            ))}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3">
            Selamat!
          </h2>
          <p className="text-white/70 text-base sm:text-lg">
            Kamu sudah selesai membaca <span className="text-[#FFE66D] font-bold">{book.title}</span>!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Link
            href={`/book/${book.id}/read`}
            onClick={() => {
              setCurrentSlide(0);
              setReaderState("reading");
              setSelectedAnswer(null);
              setGameResult(null);
            }}
            className="clay-button flex items-center gap-2 px-6 py-3 bg-[#FFE66D] text-[#2D1B69] font-bold rounded-xl"
            id="read-again"
          >
            <RefreshIcon size={18} />
            Baca Lagi
          </Link>
          <Link
            href="/"
            className="clay-button flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white font-bold rounded-xl"
            id="go-home"
          >
            <HomeIcon size={18} />
            Beranda
          </Link>
        </div>

        {/* Recommended Books */}
        {recommended.length > 0 && (
          <div className="animate-pop-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpenIcon className="text-[#4ECDC4]" size={20} />
              <h3 className="font-heading text-lg font-bold text-white">
                Baca Cerita Lainnya
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommended.map((rec) => (
                <Link
                  key={rec.id}
                  href={`/book/${rec.id}`}
                  className="block group"
                  id={`completed-rec-${rec.id}`}
                >
                  <div className="clay-card overflow-hidden cursor-pointer">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={rec.coverUrl}
                        alt={`Cover buku ${rec.title}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, 33vw"
                        unoptimized
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-heading text-sm font-bold text-[#2D1B69] line-clamp-1 group-hover:text-[#FF6B6B] transition-colors">
                        {rec.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
