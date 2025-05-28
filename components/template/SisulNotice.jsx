"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from "next/image";
import useUIState from "@/hooks/useUIState";

const SisulNotice = () => {
   const { push } = useRouter();
       const [ widths, setWidths ] = useState(false);
       const { homeCategory, setHomeCategory, setHeaderImageSrc } = useUIState();
     
    
       const onClickCategory = (item ,src) => {
        if (homeCategory === item) {
          setHeaderImageSrc("");
          setHomeCategory(item);
        } else {
          setHeaderImageSrc(src);
          setHomeCategory(item);
          push(src)
        }
      };



      
  return (
    <div>
         <section className='flex flex-col justify-center items-center'>
    
      <div className='flex flex-col'>
      <div className='flex md:flex-row flex-col md:justify-between items-start lg:w-[1100px] w-screen'>
          <div className='lg:px-0 px-3 flex flex-col h-[40px] justify-end'>
          <div className='lg:text-start font-semibold text-center text-[20px]'>시술은 이곳</div>
          <hr className="mt-1 h-0.5 md:block hidden border-t-0 bg-neutral-700 opacity-100 w-[100px] dark:opacity-50"/>
       </div>
          <div className='flex flex-col md:h-[40px] h-[20px] justify-end'>
          <div className='lg:text-end md:block hidden text-center text-[14px]' onClick={() => {onClickCategory("시술은 이곳" ,"/si")}}>더보기 &nbsp;&gt;</div>
          <hr className="mt-1 h-0.5 hidden md:block border-t-0 bg-neutral-200 opacity-100 dark:opacity-50 w-[1000px]"/>
       </div>
       </div>
       </div>
      
       <div className='md:mt-7' />
       <div className='md:w-[1100px] w-full md:px-0 px-3 flex md:flex-row flex-col justify-start items-start gap-10'>
        <div className='relative md:w-[530px] w-full h-[353px]'>
       <Image
          alt="mediaItem"
          className="object-cover rounded-md"
          // width={530}
          // height={353}
          fill
          src={"/Image/mosavaDBzK.jpeg"}
        />  
        </div>
        <div className='flex flex-col md:w-[530px] w-full'>
          <div className="area_text">
  <div className="txt_box">
    <div className="txt_component align_l ">
      <p className="text-[15px] text-[#666666]">
      <div className="area_text">
  <div className="txt_box">
    <div className="text-[20px] text-[#222222] font-semibold">
      <h4 className="">사용제품</h4>
    </div>
    <div className='mt-2'/>
  </div>
  <div className="txt_box">
    <div className="txt_component align_l color1">
      <p className="text-[15px] text-[#666666]" >
        염모제
      </p>
    </div>
  </div>
  <div className='mt-2'/>
  <div className="txt_box">
       <div className="text-[20px] text-[#222222] font-semibold">
      <h4 className="">헤어제품</h4>
    </div>
  </div>
  <div className='mt-2'/>
  <div className="txt_box">
    <div className="txt_component align_l color1">
        <p className="text-[15px] text-[#666666]" >
        모발과 두피제품
      </p>
    </div>
  </div>
</div>
      </p>
    </div>
  </div>
  <div className='mt-3'></div>
 
</div>

          <div className='md:mt-10 mt-8' />
          <div className='md:hidden block flex flex-col h-[40px] justify-end'>
          <hr className="mt-1 h-0.5 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50 w-full"/>
          <div className='md:mt-10 mt-3' />
          <div className='lg:text-end text-center text-[14px]' onClick={() => {onClickCategory("시술은 이곳" ,"/si")}}>더보기 &nbsp;&gt;</div>
       </div>
        </div>  
        </div>
       </section>
    </div>
  )
}

export default SisulNotice
