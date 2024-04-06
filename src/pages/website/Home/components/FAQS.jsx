import React, { useState } from 'react'

const FAQS = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState(1);

  // const data = [
  //   {
  //     id: 1,
  //     number: "01",
  //     header: "How can one understand the emotional and behavioral changes that teenagers go through?",
  //     body: "Teenagers go through natural emotional and behavioral changes during adolescence. This may include mood swings, challenges in expressing emotions, and dealing with social pressures. Understanding these transformations can help you interact with your teenager with understanding and flexibility. We recommend booking a consultation within the application for further assistance and customized solutions."
  //   },
  //   {
  //     id: 2,
  //     number: "02",
  //     header: "How can I improve my relationship with my teenager?",
  //     body: "Teenagers go through natural emotional and behavioral changes during adolescence. This may include mood swings, challenges in expressing emotions, and dealing with social pressures. Understanding these transformations can help you interact with your teenager with understanding and flexibility. We recommend booking a consultation within the application for further assistance and customized solutions."
  //   },
  //   {
  //     id: 3,
  //     number: "03",
  //     header: "How to protect your information and maintain your privacy?",
  //     body: "Teenagers go through natural emotional and behavioral changes during adolescence. This may include mood swings, challenges in expressing emotions, and dealing with social pressures. Understanding these transformations can help you interact with your teenager with understanding and flexibility. We recommend booking a consultation within the application for further assistance and customized solutions."
  //   },
  //   {
  //     id: 4,
  //     number: "04",
  //     header: "What is the duration of the session?",
  //     body: "Teenagers go through natural emotional and behavioral changes during adolescence. This may include mood swings, challenges in expressing emotions, and dealing with social pressures. Understanding these transformations can help you interact with your teenager with understanding and flexibility. We recommend booking a consultation within the application for further assistance and customized solutions."
  //   },
  // ];

  return (
    <div>
      <div className="home-container">
        <h2 className='font-bold text-[4rem] text-center text-primary-500 py-4'>FAQs</h2>

        <div className="flex flex-col mb-8">
          {
            data?.map((item, i) => (
              <div className={`flex flex-col items-center border-b-2 border-dark-50 last-of-type:border-none ${selectedTab === item.id ? "bg-faqs-active" : "bg-faqs-inactive"}`} key={item.id} onClick={() => setSelectedTab(item.id)}>
                <div className='flex gap-5 p-[2rem] w-full cursor-pointer'>
                  <div className="py-2">
                    <span className='text-dark-25 font-bold text-5xl md:ltr:pr-10 md:rtl:pl-10'>{i + 1}</span>
                  </div>
                  <div className='w-full'>
                    <div className="flex justify-between w-full">
                      <h3 className=',md:text-[2rem] text-xl font-bold md:leading-10'>{item.title}</h3>
                      <button type='button' className={`flex justify-center items-center h-12 w-12 max-w-12 min-w-12 max-h-12 min-h-12 rounded-full text-2xl ${selectedTab === item.id ? "rotate-45 bg-black text-white" : ""}`}> + </button>
                    </div>
                    <div className={`md:text-xl text-base md:leading-7 ${selectedTab === item.id ? "text-primary-50 h-full py-2" : "h-0 overflow-hidden py-0 text-dark-25"} transition-all duration-200`}>
                      <p>{item.body}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
          
        </div>
      </div>
    </div>
  )
}

export default FAQS