import { Image, View, StyleSheet } from 'react-native';

export const Background = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Image
        style={[styles.backgroundImage]}
        source={require('../assets/images/backgroundDay.png')}
      />
      <View style={styles.overlayContainer}>
        <Image
          style={styles.overlayImage}
          source={require('../assets/images/allBirds.png')}
          resizeMode="stretch" // Adjust this based on your needs
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  overlayContainer: {
    left: '5%',
    width: '90%',
    height: '20%', // Adjust this as needed
    position: 'absolute',
    top: '80%',
    zIndex: 100,
    overflow: 'hidden', // Ensure content is clipped if necessary
  },
  overlayImage: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
});
