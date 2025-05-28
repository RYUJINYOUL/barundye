"use client";
import { useEffect, useState, useMemo } from "react";
import { Phone, MapPin, Share2, MessageCircle, MessageSquare } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "./ui/carousel";
import Image from "next/image";

interface GalleryProps {
  images: string[];
}

const Gallery3 = () => {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);


 

  return (
      <div className="w-full sm:w-auto">
      <div className='relative w-full h-[400px]'>
       <Image
          alt="mediaItem"
          className="object-cover"
          // width={530}
          // height={353}
          fill
          src={"/Image/mosa0ID74R.jpeg"}
        /> 
        <div className='absolute h-[400px] top-0 bg-black md:opacity-40 opacity-60 w-full'></div>

          <div className="absolute top-3/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4">
              <img
                src="/Image/mosayGkZ9W.jpeg"
                alt="바른염색"
                className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] rounded-full mx-auto mb-4"
              />
              <div className="text-[22px] md:text-[20px] md:w-screen w-[300px] font-bold text-[#fff] whitespace-pre-line">
                바른염색
              </div>
              <p className="text-[15px] md:text-base text-[#ffffff99]">
                염색전문점.염색교육.염색방창업.염색교육
              </p>
              <div className="mt-2"></div>

               <div className="md:hidden block grid grid-cols-3 p-4 text-center">
                  <a href="tel:01074964899" className="flex flex-col items-center hover:text-blue-400">
                     <button className="bg-[#888888] mb-1 flex items-center justify-center w-[44px] h-[44px] xs:w-11 xs:h-11 text-white rounded-full shadow-lg transition-transform hover:scale-110" 
                    >
                    <Phone className="w-4 h-4 text-white" />
                    </button>
                    <span className="text-[13px] text-[rgba(255,255,255,.7)]">전화문의</span>
                  </a>
                  <a href="/map" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center hover:text-blue-400">
                     <button className="bg-[#888] mb-1 flex items-center justify-center w-[44px] h-[44px] xs:w-11 xs:h-11 text-white rounded-full shadow-lg transition-transform hover:scale-110" 
                    >
                    <MapPin className="w-4 h-4 text-white" />
                    </button>
                    <span className="text-[13px] text-[rgba(255,255,255,.7)]">오시는길</span>
                  </a>
                  {/* <a target="_blank" rel="noopener noreferrer" className="flex flex-col items-center hover:text-blue-400">
                    <button className="bg-[#888888] mb-1 flex items-center justify-center w-[44px] h-[44px] xs:w-11 xs:h-11 text-white rounded-full shadow-lg transition-transform hover:scale-110" 
                    onClick={()=>{
                    navigator.share({
                      title: "도어락 비밀번호 분실 해제",
                      url: "https://opiopi76.vercel.app"
                    })
                  }}>
                    <Share2 className="w-4 h-4" />
                  </button>
                    <span className="text-[13px] text-[rgba(255,255,255,.7)]">공유</span>
                  </a> */}





                  <a href="https://pf.kakao.com/_example" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center hover:text-blue-400">
                    <button className="bg-[#888888] mb-1 flex items-center justify-center w-[44px] h-[44px] xs:w-11 xs:h-11 text-white rounded-full shadow-lg transition-transform hover:scale-110" 
                    >
                    <MessageCircle className="w-4 h-4 text-white" />
                    </button>
                    <span className="text-[13px] text-[rgba(255,255,255,.7)]">카톡문의</span>
                  </a>
                </div>
            </div>
        </div>
    </div>
  );
};


export default Gallery3;