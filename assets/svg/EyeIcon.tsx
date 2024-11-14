import { Path, Svg } from 'react-native-svg';

export type EyeIconProps = {
  color: string;
};

export const EyeIcon: React.FC<EyeIconProps> = ({ color }) => {
  return (
    <Svg width="16" height="14" viewBox="0 0 16 14" fill="none">
      <Path
        d="M0.666748 7.00008C0.666748 7.00008 3.33341 1.66675 8.00008 1.66675C12.6667 1.66675 15.3334 7.00008 15.3334 7.00008C15.3334 7.00008 12.6667 12.3334 8.00008 12.3334C3.33341 12.3334 0.666748 7.00008 0.666748 7.00008Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.00008 9.00008C9.10465 9.00008 10.0001 8.10465 10.0001 7.00008C10.0001 5.89551 9.10465 5.00008 8.00008 5.00008C6.89551 5.00008 6.00008 5.89551 6.00008 7.00008C6.00008 8.10465 6.89551 9.00008 8.00008 9.00008Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
