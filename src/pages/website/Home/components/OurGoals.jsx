import React from 'react'
import CheckIcon from '../../../../icons/CheckIcon'

const OurGoals = ({ data, title }) => {

  const sections = [
    {
      id: 1,
      text: "Keeping up directly with the era's issues and delivering the best related solutions"
    },
    {
      id: 2,
      text: "Keeping up directly with the era's issues and delivering the best related solutions"
    },
    {
      id: 3,
      text: "Keeping up directly with the era's issues and delivering the best related solutions"
    },
    {
      id: 4,
      text: "Keeping up directly with the era's issues and delivering the best related solutions"
    },
    {
      id: 5,
      text: "Keeping up directly with the era's issues and delivering the best related solutions"
    },
  ]

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:pt-0 pt-8">
        <div className='ltr:md:pl-28 rtl:md:pr-28'>
          <h3 className='text-primary-500 md:text-[80px] text-xl font-bold md:mb-12 md:text-left text-center ltr:text-left rtl:text-right'>{title}</h3>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
            {
              data?.map((sec) => (
                <div key={sec.id} className='flex justify-center md:items-start items-center flex-col'>
                  <div className='md:w-[6.3rem] md:h-[6.3rem] w-20 h-20 rounded-full bg-secondary flex justify-center items-center mb-2'>
                    {/* <CheckIcon /> */}
                    <img src={sec.image} alt="" className='w-[60px] h-[60px]' />
                  </div>
                  <p className='md:text-xl text-base md:leading-10 md:ltr:text-left md:rtl:text-right text-center'>{sec.title}</p>
                </div>
              ) )
            }

          </div>
        </div>

        <div className='flex justify-end'>
          <img src="/images/our-goals-image.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default OurGoals