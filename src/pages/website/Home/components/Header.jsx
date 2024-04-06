import React from 'react'
import GooglePlayIcon from '../../../../icons/GooglePlayIcon';
import PlayStoreIcon from '../../../../icons/PlayStoreIcon';
import GooglePlayLogo from "../../../../icons/GooglePlayLogo";
import PlayStoreLogo from "../../../../icons/PlayStoreLogo";

const Header = ({ image, title, subtitle, stores }) => {

  console.log("stores :", stores)

  return (
    // <div className="h-screen bg-header-image relative">
    <div className="md:h-screen h-96 relative bg-cover" style={{ backgroundImage: `url(${image})` }}>
      <div className='absolute left-0 top-0 w-full md:h-screen h-96 bg-primary-920 z-10'></div>

      <div className="fixed top-1/2 ltr:left-0 rtl:right-0 z-50 p-2 py-4 flex flex-col gap-3 bg-dark-25 rounded-e-[20px]">
        {
          stores?.map((item, i) => (
            <>
              {
                item.name === "google" ? (
                  <>
                    <a href={item.subtitle} target="_blank" rel="noopener noreferrer">
                      <button key={i} type="button" className='flex flex-col justify-center gap-1 items-center text-light-500'>
                        <GooglePlayLogo />
                        <span className="text-xs md:flex hidden">Google Play</span>
                      </button>
                    </a>
                    <span className="w-full h-[1px] bg-light-500"></span>
                  </>
                ) : (
                  <>
                    <a href={item.subtitle} target="_blank" rel="noopener noreferrer">
                      <button type="button" className='flex flex-col gap-1 justify-center items-center text-light-500'>
                        <PlayStoreLogo />
                          <span className="text-xs md:flex hidden">App Store</span>
                      </button>
                    </a>
                  </>
                )
              }
            </>
          ))
        }
      </div>

      <div className="flex flex-col justify-center items-center text-center gap-6 pt-14">
        {/* <h3 className='text-4xl font-bold text-white z-30'>Discover Your Best Self: <span className='text-[#FFC47F] font-kalam-bold'>Personalized Courses</span> and <span className='text-[#FFC47F] font-kalam-bold'>Life Coaching</span></h3> */}
        <h3 className='md:text-4xl text-xl font-bold text-white z-30'>{title}</h3>
        <p className="text-light-750  z-30">{subtitle}</p>

        <div className="flex md:flex-row flex-col gap-10 z-30">
          {
            stores?.map((item, i) => (
              <a href={item.subtitle} target='_blank' rel="noreferrer">
                <button type="button" className="border-2 border-white rounded-md">
                  <img src={item?.image} alt={item.title} className='md:w-auto w-36' />
                  {/* <GooglePlayIcon /> */}
                </button>
              </a>
            ))
          }
          {/* <a href={googlePlayLink} target='_blank' rel="noreferrer">
            <button type="button" className="border-2 border-white rounded-md">
              <GooglePlayIcon />
            </button>
          </a>
          <a href={appStoreLink} target='_blank' rel="noreferrer">

          <button type="button" className="border-2 border-white rounded-md">
            <PlayStoreIcon />
          </button>
          </a> */}
        </div>

      </div>
      <div className='md:flex justify-center items-center z-30 hidden'>
        <img src="/images/mobile.png" alt="" className="z-40 w-[250px]" />
        <img src="/images/mobile-animation.gif" alt="" className="absolute w-1/3 z-30" />
      </div>
    </div>
  )
}

export default Header