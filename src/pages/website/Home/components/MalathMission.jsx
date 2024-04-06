import React from 'react'

const MalathMission = ({ data }) => {
  return (
    <div className='bg-white'>
      <div className="container">
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div>
            <img src={data?.image} alt="" />
          </div>

          <div className='flex flex-col justify-center'>
            <h3 className='md:text-[4.2rem] text-lg font-bold text-primary-500 rtl:mb-12'>{data?.title}</h3>
            <p className='md:text-2xl text-base md:leading-10 md:w-9/12'>{data?.subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MalathMission