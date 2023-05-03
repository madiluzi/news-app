import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";
import "swiper/css";
import { Link } from '@inertiajs/react';
export default function BigHeadline({ headline }) {
    console.log('headline', headline)

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
                headline.data.map((news, index) => {
                    const imageUrl = (news.media) ? news.media.url : `https://picsum.photos/400/500?random=${index}`;
                    return (
                        <SwiperSlide key={index} className='h-full'>
                            <Link href={route('article', news.id)} className='flex h-full relative'>
                                <div className='w-10/12 self-center z-10'>
                                    <p className='font-bold text-7xl mb-6'>{news.title}</p>
                                    <p>{news.subtitle}</p>
                                </div>
                                <img src={imageUrl} className='absolute h-full w-96 object-cover top-0 right-0' />
                            </Link>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    );
}
