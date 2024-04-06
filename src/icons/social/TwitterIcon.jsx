import React from 'react'

const TwitterIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={20}
      fill="none"
      {...props}
    >
      <g clipPath="url(#a)">
        <mask
          id="b"
          width={21}
          height={20}
          x={0}
          y={0}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: "luminance",
          }}
        >
          <path fill="#fff" d="M20.477 0h-20v20h20V0Z" />
        </mask>
        <g mask="url(#b)">
          <path
            fill="#FEFEFE"
            d="M18.133 0H2.821A2.344 2.344 0 0 0 .477 2.344v15.312A2.344 2.344 0 0 0 2.821 20h15.312a2.344 2.344 0 0 0 2.344-2.344V2.344A2.344 2.344 0 0 0 18.133 0Z"
          />
          <path
            fill="#1C355E"
            d="M14.38 3.906h2.067L11.93 9.07l5.314 7.025h-4.16l-3.26-4.26-3.728 4.26H4.027l4.831-5.522-5.097-6.666h4.266l2.946 3.895 3.406-3.895Zm-.726 10.95H14.8L7.405 5.08h-1.23l7.479 9.777Z"
          />
        </g>
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M.477 0h20v20h-20z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default TwitterIcon