import EmailIcon from "../../../../icons/EmailIcon";
import { Pagination } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';


const OurConsultants = ({ data, title, subtitle, advisers }) => {

  function chunks(array, n) {
    return array ? Array(Math.ceil(array?.length / n)).fill().map((_, i) => array?.slice(i * n, i * n + n)) : null;
  }

  const slideOfConsultants = chunks(advisers, 4)

  return (
    <div className='md:py-12 py-8 px-2 md:px-8 bg-our-consultants-image relative bg-cover bg-center' id="our-consultants">
      <div className='absolute left-0 top-0 w-full h-full bg-primary-920 z-10'></div>
      {/* Header */}
      <div className='text-center relative z-30'>
        <h2 className='md:text-[2rem] text-lg font-bold text-white mb-6'>{title}</h2>
        <p className='text-light-50 md:text-xl text-base max-w-[80ch] m-auto'>{subtitle}</p>
      </div>


      <div className="home-container">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="z-20 py-20"
        >
          {
            slideOfConsultants?.map((consultants, i) => (
              <SwiperSlide key={i}>
                <div className="grid md:grid-cols-2 grid-cols-1 relative z-10 gap-y-20">

                  {
                    consultants?.map((item, i) => (
                      <div className="flex justify-center items-center" key={i}>

                        <div className="flex flex-col bg-white rounded-3xl p-4 gap-3 py-6 w-3/5 ">
                          <h4 className="md:text-2xl text-base font-medium">{item.full_name}</h4>
                          <p className="text-dark-75">Consultant OF....</p>
                          
                          <a href={`mailto:${item.email}`}>
                            <button type="button" className="flex items-center gap-2 md:text-xl text-sm text-primary-500">
                              <EmailIcon />
                              <span className="underline font-medium">Send E-Mail</span>
                            </button>
                          </a>
                        </div>

                        <div className="ltr:-translate-x-1/2 rtl:translate-x-1/2 md:w-[200px] md:h-[200px] md:min-w-[200px] min-w-[150px] w-[150px] h-[150px] border-4 border-white rounded-full">
                          <img src={item.avatar} alt="" className="object-cover object-center w-full h-full rounded-full" />
                        </div>

                      </div>
                    ))
                  }

                  
{/* 
                  <div className="flex justify-center items-center">

                    <div className="flex flex-col bg-white rounded-3xl p-4 gap-3 py-6 w-3/5">
                      <h4 className="text-2xl font-medium">Consultant Name</h4>
                      <p className="text-dark-75">Consultant OF....</p>
                      <button type="button" className="flex items-center gap-2 text-xl text-primary-500">
                        <EmailIcon />
                        <span className="underline font-medium">Send E-Mail</span>
                      </button>
                    </div>

                    <div className="ltr:-translate-x-1/2 rtl:translate-x-1/2">
                      <img src="/images/PIC.png" alt="" />
                    </div>

                  </div>

                  <div className="flex justify-center items-center">


                    <div className="flex flex-col bg-white rounded-3xl p-4 gap-3 py-6 w-3/5">
                      <h4 className="text-2xl font-medium">Consultant Name</h4>
                      <p className="text-dark-75">Consultant OF....</p>
                      <button type="button" className="flex items-center gap-2 text-xl text-primary-500">
                        <EmailIcon />
                        <span className="underline font-medium">Send E-Mail</span>
                      </button>
                    </div>


                    <div className="ltr:-translate-x-1/2 rtl:translate-x-1/2">
                      <img src="/images/PIC.png" alt="" />
                    </div>

                  </div>

                  <div className="flex justify-center items-center">

                    <div className="flex flex-col bg-white rounded-3xl p-4 gap-3 py-6 w-3/5">
                      <h4 className="text-2xl font-medium">Consultant Name</h4>
                      <p className="text-dark-75">Consultant OF....</p>
                      <button type="button" className="flex items-center gap-2 text-xl text-primary-500">
                        <EmailIcon />
                        <span className="underline font-medium">Send E-Mail</span>
                      </button>
                    </div>

                    <div className="ltr:-translate-x-1/2 rtl:translate-x-1/2">
                      <img src="/images/PIC.png" alt="" />
                    </div>

                  </div> */}

                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
        {/* Slider */}

      </div>

    </div>
  )
}

export default OurConsultants