import { useState } from "react";
import AuthLayout from "@/components/customUI/AuthLayout";
import FormLayout from "@/components/customUI/FormLayout";
import ImageBadge from "@/components/customUI/ImageBadge";

const images = [
  "backgroundA.svg", "backgroundB.svg", "backgroundC.svg"
];

const texts = [
  "More Members, More Revenue. Smarter Gym Management.",
  "Automate Payments, Retain Members Effortlessly",
  "Join Thousands of Gyms Streamlining Their Operations",
];

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const ImageCarousel = images.map((_, index) => (
    <ImageBadge key={index} isActive={currentIndex === index} onClick={() => setCurrentIndex(index)} />
  ));

  return <AuthLayout image={images[currentIndex]} text={texts[currentIndex]} form={<FormLayout />} carousel={ImageCarousel} />
};

export default LandingPage;
