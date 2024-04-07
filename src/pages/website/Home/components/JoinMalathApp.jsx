import React from 'react'
import JoinMalathShape from '../../../../icons/JoinMalathShape'
import PlayStoreIcon from '../../../../icons/PlayStoreIcon'
import GooglePlayLogo from '../../../../icons/GooglePlayLogo'
import GooglePlayIcon from '../../../../icons/GooglePlayIcon'
import GooglePlayBlackIcon from '../../../../icons/GooglePlayBlackIcon'
import AppStoreBlackIcon from '../../../../icons/AppStoreBlackIcon'

const JoinMalathApp = ({ data, title, subtitle }) => {
  const stores = [
    {
      id: 1,
      btn: <AppStoreBlackIcon />
    },
    {
      id: 2,
      btn: <GooglePlayBlackIcon /> 
    }
  ]

  return (
    <div id="join-us">
      <img src="/images/jsoinMalathShape.png" alt="" className='w-[700px] absolute z-20' />
      <div className="home-container grid md:grid-cols-2 grid-cols-1 justify-center items-center">
        <div className='py-20 pt-28 relative'>
          <img src="/images/Ornament1.png" alt="" className='absolute top-1/3 right-36 z-10 w-72' />
          <img src="/images/Join-malath-mobile.png" alt="" className='z-30 relative md:w-[500px] w-80' />
        </div>

        <div className='text-center relative z-20'>
          <h3 className='md:text-[2rem] text-xl font-bold text-primary-500 rtl:mb-12'>{title}</h3>
          <p className='md:text-2xl text-base'>{subtitle}</p>
          <div className="flex justify-center md:flex-row flex-col md:gap-6 gap-2 mt-5">
            {
              data?.map(({ id, image, subtitle: link }) => (
                <a href={link} key={id} target='_blank' rel="noreferrer">
                  <button type="button" className="border border-[#1E1E1E] rounded-md" >
                    <img src={image} alt="" />
                  </button>
                </a>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default JoinMalathApp