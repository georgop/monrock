// ProgressCircle.tsx

import { EyeIcon } from 'assets/svg/EyeIcon';
import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface ProgressCircleProps {
  totalViews: number;
  femalePercentage: number; // Percentage for the pink section
}

export const PercentageCircle: React.FC<ProgressCircleProps> = ({
  totalViews,
  femalePercentage,
}) => {
  const strokeWidth = 10;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  // Calculate the stroke dashoffset for the pink section only
  const pinkStrokeDashoffset = circumference * (1 - femalePercentage / 100);

  return (
    <View className="flex items-center justify-center">
      <Svg height="170" width="170" viewBox="0 0 120 120">
        <Circle stroke="#60a5fa" fill="none" cx="60" cy="60" r={radius} strokeWidth={strokeWidth} />

        <Circle
          stroke="#e879f9"
          fill="none"
          cx="60"
          cy="60"
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={pinkStrokeDashoffset}
          transform="rotate(-90, 60, 60)"
        />
      </Svg>
      <View className="absolute">
        <View className="flex flex-row items-center gap-1">
          <EyeIcon color={'#02326F'} />
          <Text className="text-center font-[500] text-[#02326F]">VIEWS</Text>
        </View>
        <Text className="text-center text-[36px] font-[600]">{totalViews}</Text>
      </View>
    </View>
  );
};
