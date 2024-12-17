import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonProps = {
  text: string;
  onPress: () => void;
};

export const Button = ({ text, onPress }: ButtonProps) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 70,
  },
  button: {
    flex: 1,
    backgroundColor: 'hsla(36, 100%, 41%, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowOpacity: 1,
    shadowColor: 'rgba(55, 33, 0, 0.79)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 8,
  },
  text: {
    fontFamily: 'Margarine',
    fontSize: 35,
    color: 'white',
  },
});
