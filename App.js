import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import color from './constants/color';
import choices from './data/mockData';

export default function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');

  const handleUserChoice = choice => {
    setUserChoice(choice);
    randomComputerChoice(choice);
  };

  const randomComputerChoice = choice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerRandomChoice = choices[randomIndex];
    setComputerChoice(computerRandomChoice);
    determineWinner(choice, computerRandomChoice);
  };

  const determineWinner = (user, computerRandomChoice) => {
    if (user?.name === computerRandomChoice?.name) {
      setResult('DRAW!');
    } else if (
      (user?.name === 'Rock' && computerRandomChoice?.name === 'Scissors') ||
      (user?.name === 'Paper' && computerRandomChoice?.name === 'Rock') ||
      (user?.name === 'Scissors' && computerRandomChoice?.name === 'Paper')
    ) {
      setResult('YOU WIN!');
    } else {
      setResult('YOU LOST!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={color.backgroundColor}
        barStyle={'light-content'}
      />
      <View style={styles.container}>
        <Text style={styles.title}>ROCK PAPER SCISSORS</Text>
        <Text style={styles.computerChoiceText}>User's Choice:</Text>
        <View style={styles.choices}>
          {choices?.map((choice, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.5}
              onPress={() => handleUserChoice(choice)}
              style={
                choice?.name === userChoice?.name
                  ? [styles.button, styles.buttonActive]
                  : styles.button
              }>
              <Image source={choice?.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.resultText}>{result}</Text>
        {computerChoice && (
          <>
            <Text style={styles.computerChoiceText}>Computer's Choice:</Text>

            <View style={styles.button}>
              <Image source={computerChoice?.image} style={styles.image} />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.backgroundColor,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.white,
    marginBottom: 20,
  },
  computerChoiceText: {marginVertical: 20, fontSize: 20, color: color.white},
  choice: {},
  button: {padding: 10, borderRadius: 10, backgroundColor: color.white},
  buttonActive: {
    borderWidth: 2,
  },
  choices: {flexDirection: 'row', justifyContent: 'space-around', gap: 10},
  image: {width: 90, height: 90},
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: color.white,
  },
});
