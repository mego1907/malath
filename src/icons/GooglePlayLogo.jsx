import React from 'react'

const GooglePlayLogo = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={35}
      fill="none"
      {...props}
    >
      <path
        fill="url(#a3)"
        fillRule="evenodd"
        d="M1.378.522C.996.935.776 1.566.776 2.392v29.29c0 .826.22 1.457.615 1.853l.102.09 16.343-16.411v-.367L1.48.433l-.102.09Z"
        clipRule="evenodd"
      />
      <path
        fill="url(#b)"
        fillRule="evenodd"
        d="m23.274 22.7-5.451-5.473v-.384l5.45-5.473.12.073 6.447 3.68c1.846 1.043 1.846 2.768 0 3.825l-6.448 3.68-.118.072Z"
        clipRule="evenodd"
      />
      <path
        fill="url(#c)"
        fillRule="evenodd"
        d="m23.392 22.628-5.57-5.593L1.379 33.548c.602.648 1.612.72 2.74.09l19.274-11.01Z"
        clipRule="evenodd"
      />
      <path
        fill="url(#d)"
        fillRule="evenodd"
        d="M23.392 11.442 4.118.45C2.989-.2 1.976-.11 1.378.538l16.445 16.497 5.57-5.593Z"
        clipRule="evenodd"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M23.274 22.508 4.131 33.428c-1.069.619-2.023.576-2.638.014l-.102.102.102.09c.615.558 1.569.604 2.638-.014l19.275-10.993-.132-.119Z"
        clipRule="evenodd"
        opacity={0.2}
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="m29.84 18.756-6.582 3.753.118.119 6.448-3.68c.924-.529 1.378-1.222 1.378-1.913-.056.634-.526 1.236-1.362 1.721Z"
        clipRule="evenodd"
        opacity={0.12}
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M4.118.64 29.84 15.315c.836.472 1.306 1.09 1.379 1.72 0-.69-.454-1.383-1.379-1.912L4.118.45C2.272-.61.776.274.776 2.391v.192c0-2.12 1.496-2.99 3.342-1.942Z"
        clipRule="evenodd"
        opacity={0.25}
      />
      <defs>
        <linearGradient
          id="a3"
          x1={16.37}
          x2={-9.823}
          y1={2.076}
          y2={9.027}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00A0FF" />
          <stop offset={0.007} stopColor="#00A1FF" />
          <stop offset={0.26} stopColor="#00BEFF" />
          <stop offset={0.512} stopColor="#00D2FF" />
          <stop offset={0.76} stopColor="#00DFFF" />
          <stop offset={1} stopColor="#00E3FF" />
        </linearGradient>
        <linearGradient
          id="b"
          x1={32.247}
          x2={0.327}
          y1={17.035}
          y2={17.035}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE000" />
          <stop offset={0.409} stopColor="#FFBD00" />
          <stop offset={0.775} stopColor="orange" />
          <stop offset={1} stopColor="#FF9C00" />
        </linearGradient>
        <linearGradient
          id="c"
          x1={20.364}
          x2={-0.781}
          y1={20.078}
          y2={55.52}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF3A44" />
          <stop offset={1} stopColor="#C31162" />
        </linearGradient>
        <linearGradient
          id="d"
          x1={-2.764}
          x2={6.67}
          y1={-9.221}
          y2={6.608}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#32A071" />
          <stop offset={0.069} stopColor="#2DA771" />
          <stop offset={0.476} stopColor="#15CF74" />
          <stop offset={0.801} stopColor="#06E775" />
          <stop offset={1} stopColor="#00F076" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default GooglePlayLogo
