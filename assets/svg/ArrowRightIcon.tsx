import { Path, Svg } from 'react-native-svg';

export type ArrowRightIconProps = {
  color: string;
};

export const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({ color }) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M4.16663 10.0001H15.8333M15.8333 10.0001L9.99996 4.16675M15.8333 10.0001L9.99996 15.8334"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
