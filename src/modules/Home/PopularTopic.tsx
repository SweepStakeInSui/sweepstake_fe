'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SwiperSlide } from 'swiper/react';

import SwiperCustom from '@/components/common/SwipperCustom';
import { Button } from '@/components/ui/button';

// Define the type for the topic
interface TopicType {
  id: number; // Ensure you have a unique id for each topic
  title: string;
  link: string;
  img: string;
  des?: string;
}

// Define the props type for the Topic component
interface TopicProps {
  content: TopicType;
}
const Topic: React.FC<TopicProps> = ({ content }) => {
  return (
    <div className="h-40 rounded-lg overflow-hidden">
      <Link href={content.link} className="relative ">
        <Image
          src={content.img}
          alt="img_popular"
          width={300}
          height={300}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute p-4 top-0 w-full h-full left-0 flex flex-col justify-between text-white bg-card">
          <div>
            <h5 className=" font-semibold text-lg">{content.title}</h5>
            <p className="text-white text-sm font-medium">{content.des}</p>
          </div>
          <Button variant="secondary_dark" className="">
            View
          </Button>
        </div>
      </Link>
    </div>
  );
};
const PopularTopic: React.FC = () => {
  const listTopic: TopicType[] = [
    {
      id: 1,
      title: '2024 Election Forecast',
      link: '/',
      img: '/home.png',
      des: 'DM us on Twitter for a free $5 bet',
    },
    {
      id: 2,
      title: '2024 Presidential Election',
      link: '/',
      img: '/home.png',
    },
    {
      id: 3,
      title: 'Democratic Nominee 2024',
      link: '/',
      img: '/home.png',
      des: 'DM us on Twitter for a free $5 bet',
    },
    {
      id: 4,
      title: 'Trade Elections',
      link: '/',
      img: '/home.png',
      des: 'DM us on Twitter for a free $5 bet',
    },
    {
      id: 5,
      title: 'Democratic Nominee 2024',
      link: '/',
      img: '/home.png',
      des: 'DM us on Twitter for a free $5 bet',
    },
    {
      id: 6,
      title: 'Trade Elections',
      link: '/',
      img: '/home.png',
      des: 'DM us on Twitter for a free $5 bet',
    },
  ];

  return (
    <div className="w-full h-40 mt-4">
      <SwiperCustom slidesPerView={1} spaceBetween={16}>
        {listTopic.map((item) => (
          <SwiperSlide key={item.id}>
            <Topic content={item} />
          </SwiperSlide>
        ))}
      </SwiperCustom>
    </div>
  );
};

export default PopularTopic;
