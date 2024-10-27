import { Path, Svg } from 'react-native-svg';

export type MediaLibraryIconProps = {
  width: number;
  height: number;
};

export const MediaLibraryIcon: React.FC<MediaLibraryIconProps> = ({ width, height }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 16" fill="none">
      <Path
        d="M23 3L16 8L23 13V3Z"
        stroke="#005AD0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 1H3C1.89543 1 1 1.89543 1 3V13C1 14.1046 1.89543 15 3 15H14C15.1046 15 16 14.1046 16 13V3C16 1.89543 15.1046 1 14 1Z"
        stroke="#005AD0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
