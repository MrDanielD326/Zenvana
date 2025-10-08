import { useState, useEffect } from "react";
import AuthLayout from "@/components/customUI/AuthLayout";
import FormLayout from "@/components/customUI/FormLayout";
import ImageBadge from "@/components/customUI/ImageBadge";

const images = [
  "backgroundA.svg", "backgroundB.svg", "backgroundC.svg",
];

const texts = [
  "More Members, More Revenue. Smarter Gym Management.",
  "Automate Payments, Retain Members Effortlessly",
  "Experience Seamless Gym Operations with Our Platform",
];

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-change carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const ImageCarousel = images.map((_, index) => (
    <ImageBadge key={index} isActive={currentIndex === index} onClick={() => setCurrentIndex(index)} />
  ));

  return <AuthLayout image={images[currentIndex]} text={texts[currentIndex]} form={<FormLayout />} carousel={ImageCarousel} />
};

export default LandingPage;
