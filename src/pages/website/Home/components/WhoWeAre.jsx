import React from 'react'

const WhoWeAre = ({ data }) => {
  return (
    <div className='px-8 py-8 bg-gradient-to-b from-primary-920 to-white'>
      <div className="home-container flex md:flex-row flex-col items-center gap-20">
        <div className='md:w-1/2'>
          <h2 className='lg:text-[80px] font-bold text-lg text-white md:max-w-[7ch] rtl:mb-12'>{data?.title}</h2>
          <p className='text-white md:text-2xl text-base md:max-w-[40ch]'>{data?.subtitle}</p>
        </div>

        <div className='md:flex-1'>
          <img src={data?.image} alt="" />

          <div className="grid grid-cols-2 gap-5 mt-5">
            <div className='flex flex-col justify-center text-dark-75 items-center bg-light-50 rounded-2xl py-4'>
              <h3 className="md:text-5xl font-bold">+ 40</h3>
              <p className='md:text-2xl font-bold'>Consultants</p>
            </div>
            <div className='flex flex-col justify-center text-dark-75 items-center bg-light-50 rounded-2xl py-4'>
              <h3 className="md:text-5xl font-bold">+ 40</h3>
              <p className='md:text-2xl font-bold'>Consultants</p>
            </div>
            <div className='flex flex-col justify-center text-dark-75 items-center bg-light-50 rounded-2xl py-4'>
              <h3 className="md:text-5xl font-bold">+ 40</h3>
              <p className='md:text-2xl font-bold'>Consultants</p>
            </div>
            <div className='flex flex-col justify-center text-dark-75 items-center bg-light-50 rounded-2xl py-4'>
              <h3 className="md:text-5xl font-bold">+ 40</h3>
              <p className='md:text-2xl font-bold'>Consultants</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhoWeAre