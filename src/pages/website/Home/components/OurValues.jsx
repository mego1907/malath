import React from 'react';
import ValuesVector1 from "../../../../icons/ValuesVector1";
import ValuesVector2 from "../../../../icons/ValuesVector2";
import ValuesVector3 from "../../../../icons/ValuesVector3";
import ValuesVector4 from "../../../../icons/ValuesVector4";
import ValuesVector5 from "../../../../icons/ValuesVector5";
import ValuesVector6 from "../../../../icons/ValuesVector6";

import ScheduleIcon from '../../../../icons/ScheduleIcon';
import OnlineSessionsIcon from '../../../../icons/OnlineSessionsIcon';
import ExpertiseConsultantsIcon from '../../../../icons/ExpertiseConsultantsIcon';
import TherabySessions from '../../../../icons/TherabySessions';
import PrivacyAndSecurity from '../../../../icons/PrivacyAndSecurity';
import SupportIcon from '../../../../icons/SupportIcon';


const OurValues = ({ data, title, subtitle }) => {

  const shapes = [<ValuesVector1 />, <ValuesVector2 />, <ValuesVector3 />, <ValuesVector4 />, <ValuesVector5 />, <ValuesVector6 />]

  const valuesData = [
    {
      icon: <ScheduleIcon />,
      shape: <ValuesVector1 />,
      text: "Scheduled Sessions"
    },
    {
      icon: <OnlineSessionsIcon />,
      shape: <ValuesVector2 />,
      text: "Online Sessions"
    },
    {
      icon: <ExpertiseConsultantsIcon />,
      shape: <ValuesVector3 />,
      text: "Expertise Consultants"
    },
    {
      icon: <TherabySessions />,
      shape: <ValuesVector4 />,
      text: "Theraby Sessions"
    },
    {
      icon: <PrivacyAndSecurity />,
      shape: <ValuesVector5 />,
      text: "Privacy & Security"
    },
    {
      icon: <SupportIcon />,
      shape: <ValuesVector6 />,
      text: "24/7 Support"
    }
  ]

  return (
    <div className="py-8">
      <div className="home-container">
        {/* Header */}
        <div className='text-center'>
          <h2 className='text-[2rem] font-bold text-primary-500 rtl:mb-12'>{title}</h2>
          <p className='text-dark-50'>{subtitle}</p>
        </div>

        <div className='grid md:grid-cols-3 grid-cols-1 md:gap-y-44 gap-y-20 md:py-24 py-20'>
          {
            data?.map((item, i) => (
              <div className='flex items-center justify-center' key={i}>
                <div className='absolute animate-spin-slow'>{shapes[i]}</div>

                <div className='flex flex-col gap-3 items-center w-[233px] h-[197px] justify-center bg-white rounded-md shadow-md  z-10'>
                  <div>
                    <img src={item.image} alt={item.title} className='w-[100px] object-cover' />
                  </div>
                  <h4 className='font-bold text-xl'>{item.title}</h4>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default OurValues