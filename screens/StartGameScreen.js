import { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
// Alert is an object not an api
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
function StartGameScreen({ onValidNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  const { width, height } = useWindowDimensions();
  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }
  function resetInputHandler() {
    setEnteredNumber("");
  }
  function confirmInputHandler() {
    const chooseNumber = parseInt(enteredNumber);
    if (isNaN(chooseNumber) || chooseNumber <= 0 || chooseNumber > 99) {
      // show alert
      Alert.alert(
        "Invalid Number!",
        "Number has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    onValidNumber(chooseNumber);
    // console.log("Valid Number!");
  }

  const marginTopDistance = height < 500 ? 30 : 100;
  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number:</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={enteredNumber}
              onChangeText={numberInputHandler}
            />
            {/*Custom BUTTONS */}
            <View style={styles.alignBtns}>
              <View style={styles.alignBtn}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.alignBtn}>
                <PrimaryButton onPressProp={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;
// const deviceHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  screen:{
    flex:1,
  },
  numberInput: {
    height: 50,
    fontSize: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: Colors.accent500,
    borderRadius: 50,
    borderWidth: 1.5,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
    width: 100,
  },
  alignBtns: {
    flexDirection: "row",
  },
  alignBtn: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    // marginTop: deviceHeight < 500 ? 30 : 100,
    alignItems: "center",
  },
});
