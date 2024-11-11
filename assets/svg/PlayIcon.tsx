import { Defs, G, Path, Svg } from 'react-native-svg';

export const PlayIcon = () => {
  return (
    <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <G filter="url(#filter0_d_1200_247)">
        <Path
          d="M20 36C28.8366 36 36 28.8366 36 20C36 11.1634 28.8366 4 20 4C11.1634 4 4 11.1634 4 20C4 28.8366 11.1634 36 20 36Z"
          stroke="white"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M16.8 13.6L26.4 20L16.8 26.4V13.6Z"
          stroke="white"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      {/* <Defs>
        <filter
          id="filter0_d_1200_247"
          x="-5.5"
          y="-5.5"
          width="51"
          height="51"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1200_247" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1200_247"
            result="shape"
          />
        </filter>
      </Defs> */}
    </Svg>
  );
};
