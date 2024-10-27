import { ClipPath, Defs, G, Line, Path, Rect, Svg } from 'react-native-svg';

export type ScheduledIconProps = {
  width: number;
  height: number;
};

export const ScheduledIcon: React.FC<ScheduledIconProps> = ({ width, height }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_675_4608)">
        <Rect x="1.5" y="3" width="21" height="19.5" rx="3" stroke="#005AD0" strokeWidth="2" />
        <Path d="M1.5 10H22.5V8H1.5V10Z" fill="#005AD0" />
        <Path
          d="M15.6 15.2304C16 15.4613 16 16.0387 15.6 16.2696L10.65 19.1275C10.25 19.3584 9.75 19.0698 9.75 18.6079L9.75 12.8921C9.75 12.4302 10.25 12.1416 10.65 12.3725L15.6 15.2304Z"
          stroke="#005AD0"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <Line
          x1="7.75"
          y1="1"
          x2="7.75"
          y2="5"
          stroke="#005AD0"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Line
          x1="16.3"
          y1="1"
          x2="16.3"
          y2="5"
          stroke="#005AD0"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_675_4608">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
