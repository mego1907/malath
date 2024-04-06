import React from 'react'

const LanguageIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={26}
      fill="none"
      {...props}
    >
      <path
        stroke="#523F94"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1.8 9h22.4M1.8 17h22.4M12.333 1a22.667 22.667 0 0 0 0 24m1.334-24a22.667 22.667 0 0 1 0 24M1 13a12 12 0 1 0 24 0 12 12 0 0 0-24 0Z"
      />
    </svg>  )
}

export default LanguageIcon