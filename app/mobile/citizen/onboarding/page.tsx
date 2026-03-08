"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile-frame";
import Link from "next/link";
import { FileText, Wallet, AlertCircle } from "lucide-react";

const slides = [
  {
    icon: FileText,
    title: "সব সনদ এখন ডিজিটাল",
    description: "জন্ম, মৃত্যু, নাগরিক সনদ — সব অনলাইনে আবেদন করুন",
  },
  {
    icon: Wallet,
    title: "ঘরে বসেই পেমেন্ট",
    description: "ট্যাক্স, পানির বিল — bKash, Nagad দিয়ে মুহূর্তেই পরিশোধ",
  },
  {
    icon: AlertCircle,
    title: "সমস্যা জানান, সমাধান পান",
    description: "রাস্তার গর্ত থেকে পানির সমস্যা — সরাসরি পৌরসভায় জানান",
  },
];

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isLast = currentSlide === slides.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  return (
    <MobileFrame>
      <div className="relative h-full flex flex-col bg-[#F0F7FF] dark:bg-[#0F172A]">
        {/* Skip Button */}
        <div className="flex justify-end px-6 pt-4">
          <Link
            href="/mobile/citizen/login"
            className="text-gray-500 dark:text-gray-400 text-sm font-bangla hover:text-light-blue transition-colors"
          >
            Skip
          </Link>
        </div>

        {/* Slide Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          {slides.map((slide, index) => {
            const Icon = slide.icon;
            return (
              <div
                key={index}
                className={`flex flex-col items-center text-center gap-6 transition-all duration-500 ${
                  index === currentSlide
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 absolute pointer-events-none translate-x-8"
                }`}
              >
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-electric-blue/20 to-sky-blue/10 flex items-center justify-center border border-electric-blue/30">
                  <Icon className="w-14 h-14 text-sky-blue" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-bangla">
                  {slide.title}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 font-bangla text-sm leading-relaxed">
                  {slide.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 h-2 bg-electric-blue"
                  : "w-2 h-2 bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <div className="px-8 pb-10">
          {isLast ? (
            <Link href="/mobile/citizen/login">
              <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-electric-blue to-sky-blue text-white font-bangla font-semibold text-lg transition-all hover:opacity-90 active:scale-95">
                শুরু করুন
              </button>
            </Link>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-electric-blue to-sky-blue text-white font-bangla font-semibold text-lg transition-all hover:opacity-90 active:scale-95"
            >
              পরবর্তী
            </button>
          )}
        </div>
      </div>
    </MobileFrame>
  );
}
