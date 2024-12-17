import React, { useState, useRef } from 'react';
import { TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';

type PumpkinProps = {
  onPress: () => void;
};

export const Pumpkin = ({ onPress }: PumpkinProps) => {
  const [isDestroyed, setIsDestroyed] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (isDestroyed) return; // Prevent interaction if destroyed

    // Start burst animation
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5, // Scale up
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1, // Scale down
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Once animation is complete, switch image
      setIsDestroyed(true);
      // Call parent onPress handler after animation
      setTimeout(() => {
        onPress();
        setIsDestroyed(false);
      }, 300); // Timing should match animation duration
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.touchable, isDestroyed && styles.disabled]} // Disable press if destroyed
      activeOpacity={1} // Prevent visual feedback on press
    >
      <Animated.Image
        style={[styles.birdStyle, { transform: [{ scale: scaleValue }] }]}
        source={isDestroyed
          ? require('../assets/images/destroyedGreenBird.png')
          : require('../assets/images/normalGreenBird.png')}
      />
    </TouchableOpacity>
  );
};

export const pumpkinDimensions = {
  width: 150,
  height: 150,
};

const styles = StyleSheet.create({
  birdStyle: {
    width: pumpkinDimensions.width,
    height: pumpkinDimensions.height,
  },
  touchable: {
    // Default TouchableOpacity styles
  },
  disabled: {
    // Disable interaction and appearance changes if needed
    opacity: 0.8, // Optional: Adjust opacity to indicate disabled state
    pointerEvents: 'none', // Prevent clicks
  },
});
