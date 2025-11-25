import CareTips from "@/components/Home/CareTips";
import HeroSlide from "@/components/Home/HeroSlide";
import MeetTeem from "@/components/Home/MeetTeem";
import OurCareServices from "@/components/Home/OurCareServices";
import StatsSection from "@/components/Home/StatsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSlide />
      <OurCareServices />
      <CareTips />
      <MeetTeem />
      <StatsSection />
    </div>
  );
}
