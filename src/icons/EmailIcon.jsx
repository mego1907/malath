import React from 'react'

const EmailIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={24}
      fill="none"
      {...props}
    >
      <path
        stroke="#523F94"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.2}
        d="M10.473 18.947H3.526A2.526 2.526 0 0 1 1 16.421V3.79m0 0a2.526 2.526 0 0 1 2.526-2.527H21.21a2.526 2.526 0 0 1 2.526 2.527M1 3.79l11.368 7.578L23.736 3.79m0 0v5.052m-3.79 13.894 4.232-4.148a2.706 2.706 0 0 0 .006-3.879 2.832 2.832 0 0 0-3.952-.007l-.283.278-.281-.278a2.832 2.832 0 0 0-3.951-.008 2.706 2.706 0 0 0-.008 3.88l4.238 4.162Z"
      />
    </svg>  )
}

export default EmailIcon