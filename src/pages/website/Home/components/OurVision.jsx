import React from 'react'

const OurVision = ({ data }) => {
  return (
    <div className="bg-gradient-to-t from-primary-920 to-white px-8 md:pb-20 md:pt-0 pt-10">
      <div className="home-container">
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div className='flex flex-col justify-center'>
            <h3 className='md:text-[5rem] text-lg font-bold text-white mb-12'>{data?.title}</h3>
            <p className="md:text-2xl md:leading-10 text-base text-white md:w-9/12">{data?.subtitle}</p>
          </div>
          <div>
            <img src={data?.image} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurVision