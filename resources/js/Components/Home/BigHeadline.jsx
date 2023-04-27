import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";
import "swiper/css";
export default function BigHeadline({ headline }) {
    return (
        <Swiper
            slidesPerView={1}
            // spaceBetween={30}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className='h-[32rem] px-4'
        >
            {
                headline.data.map((news, index) =>
                    <SwiperSlide key={index} className='h-full'>
                        <div className='flex h-full relative'>
                            <div className='w-10/12 self-center z-10'>
                                <p className='font-bold text-7xl mb-6'>{news.title}</p>
                                <p>{news.content}</p>
                            </div>
                            <img src={`https://picsum.photos/400/500?random=${index}`} className='h-full w-auto absolute top-0 right-0' />
                        </div>
                    </SwiperSlide>
                )
            }
        </Swiper>
    );
}
