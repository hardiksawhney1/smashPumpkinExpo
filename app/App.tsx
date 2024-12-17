import React, { useState } from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';

import { Background } from './ui/Background';
import { FontProvider } from './ui/FontProvider';
import { Button } from './ui/Button';
import { Pumpkin, pumpkinDimensions } from './ui/Pumpkin';
import { startTimer } from './utils/timer';
import { getRandomNumber } from './utils/random';

type GameState = 'initial' | 'gameInProgress' | 'gameOver';

const gameTimeLimitInSeconds = 10;

export default function App() {
  const [gameState, setGameState] = useState<GameState>('initial');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameTimeLimitInSeconds);

  const windowDimensions = useWindowDimensions();

  const getRandomPumpkinLocation = () => {
    const leftOffset = getRandomNumber(
      windowDimensions.width - pumpkinDimensions.width
    );

    const topOffset = getRandomNumber(
      (windowDimensions.height / 4) * 3 - pumpkinDimensions.height
    );

    return {
      leftOffset,
      topOffset,
    };
  };

  const [pumpkinLeftOffset, setPumpkinLeftOffset] = useState(
    getRandomPumpkinLocation().leftOffset
  );
  const [pumpkinTopOffset, setPumpkinTopOffset] = useState(
    getRandomPumpkinLocation().topOffset
  );

  const startGame = () => {
    setGameState('gameInProgress');
    setScore(0);
    setTimeLeft(gameTimeLimitInSeconds);

    startTimer({
      timeout: gameTimeLimitInSeconds,
      tickInterval: 1,
      onTick: () => setTimeLeft(timeLeft => timeLeft - 1),
      onFinish: () => setGameState('gameOver'),
    });
  };

  const handlePumpkinPress = () => {
    const newPumpkinLocation = getRandomPumpkinLocation();

    setPumpkinLeftOffset(newPumpkinLocation.leftOffset);
    setPumpkinTopOffset(newPumpkinLocation.topOffset);

    setScore(score => score + 1);
  };

  let headerTitle1;
  let headerTitle2;
  let playButtonText;

  switch (gameState) {
    case 'initial': {
      headerTitle1 = 'Kill The Birds';
      headerTitle2 = null;
      playButtonText = 'Play';
      break;
    }
    case 'gameInProgress': {
      headerTitle1 = `Score: ${score}`;
      headerTitle2 = `Time left: ${timeLeft}`;
      playButtonText = null;
      break;
    }
    case 'gameOver': {
      headerTitle1 = 'Game Over';
      headerTitle2 = `Score: ${score}`;
      playButtonText = 'Play Again';
      break;
    }
  }

  return (
    <View style={styles.container}>
      <FontProvider>
        <Background />
        <View style={styles.header}>
          {headerTitle1 && (
            <Text style={[styles.text, styles.headerText1]}>
              {headerTitle1}
            </Text>
          )}
          {headerTitle2 && (
            <Text style={[styles.text, styles.headerText2]}>
              {headerTitle2}
            </Text>
          )}
        </View>
        <View style={styles.content}>
          {playButtonText && (
            <Button text={playButtonText} onPress={startGame} />
          )}
          {gameState === 'gameInProgress' && (
            <View
              style={{
                position: 'absolute',
                left: pumpkinLeftOffset,
                top: pumpkinTopOffset,
              }}
            >
              <Pumpkin onPress={handlePumpkinPress} />
            </View>
          )}
        </View>
      </FontProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Margarine',
  },
  headerText1: {
    fontSize: 40,
  },
  headerText2: {
    fontSize: 30,
  },
});
