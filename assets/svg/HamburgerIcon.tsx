import { Path, Svg } from 'react-native-svg';

export const HamburgerIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 12H21M3 6H21M3 18H21"
        stroke="#293037"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
