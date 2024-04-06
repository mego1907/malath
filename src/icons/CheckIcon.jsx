import React from 'react'

const CheckIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={60}
      height={60}
      fill="none"
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          fill="#523F94"
          fillOpacity={0.5}
          fillRule="evenodd"
          d="M30.005 0C13.449 0 0 13.44 0 29.995 0 46.551 13.45 60 30.005 60S60 46.55 60 29.995 46.56 0 30.005 0Zm0 2.308a27.669 27.669 0 0 1 27.687 27.687c0 15.307-12.38 27.693-27.687 27.693S2.308 45.302 2.308 29.995c0-15.307 12.39-27.687 27.697-27.687Zm12.697 19.209c-.26.001-.513.09-.716.254L24.482 35.273l-6.253-7.738a1.155 1.155 0 1 0-1.796 1.447l7.67 9.501 19.298-14.887a1.155 1.155 0 0 0-.7-2.08Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h60v60H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default CheckIcon