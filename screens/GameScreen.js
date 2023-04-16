import { Text, View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native";
import Title from "../components/ui/Title";
import { useState, useEffect } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";
function generateRandombetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum == exclude) {
    return generateRandombetween(min, max, exclude);
  } else {
    return rndNum;
  }
}
let minBoundary = 1;
let maxBoundary = 100;
function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandombetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const {width,height} = useWindowDimensions();
  useEffect(() => {
    if (currentGuess === userNumber) {
      // Show different GameOver Screen on App.js
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]); //All variables we use is passed  as dependencies
  // useEffect runs after the component function gets executed
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);
  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    console.log(minBoundary, maxBoundary);
    const newRandNumber = generateRandombetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRandNumber);
    setGuessRounds((prevGuessRounds) => [...prevGuessRounds, newRandNumber]);
  }
  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        {/* Overridden Styles example */}
        <InstructionText style={styles.instructText}>
          Higher or Lower?
        </InstructionText>
        {/* + */}
        {/* - */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPressProp={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPressProp={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );
  if(width > 500){
    content = (
      <>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPressProp={nextGuessHandler.bind(this, "lower")}>
                <Ionicons name="md-remove" size={24} />
              </PrimaryButton>
            </View>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View style={styles.buttonContainer}>
              <PrimaryButton
                onPressProp={nextGuessHandler.bind(this, "greater")}
              >
                <Ionicons name="md-add" size={24} />
              </PrimaryButton>
            </View>
          </View>
        </View>
      </>
    );
  }
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map(guess => <Text key={guess}>{guess}</Text>)} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => 
            <GuessLogItem 
            roundNumber={itemData.index+1} guess={itemData.item}/>
          }
          keyExtractor={(item)=>item}
        />
      </View>
    </View>
  );
}
export default GameScreen;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  instructText: {
    marginBottom: 12,
  },
  listContainer:{
    flex:1,
    padding:0,
  },
  buttonsContainerWide:{
    flexDirection:'row',
    alignItems:'center',
  }
});
