import { Image,StyleSheet, Text, View,ScrollView, useWindowDimensions } from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";
function GameOverScreen({roundsNumber,userNumber,onStartNewGame}){
  const {width,height} = useWindowDimensions();
  let imageSize = 300;
  if(width < 380){
    imageSize = 150;
  }
  if(height < 400){
    imageSize = 100;
  }
  const imageStyle = {
    width : imageSize,
    height : imageSize,
    borderRadius : imageSize/2
  }
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer,imageStyle]}>
          <Image style={styles.image} source={require("../assets/images/success.png")} />
        </View>
        <Text style={styles.summaryText}>
            <Text>Your Phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.</Text>
        </Text>
        <PrimaryButton onPressProp={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
      </ScrollView>
    );
}
export default GameOverScreen;
// const deviceWidth = Dimensions.get('window').width; 
const styles = StyleSheet.create({
  screen:{
    flex:1,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 200 : 300,
    // height: deviceWidth < 380 ? 200 : 300,
    // borderRadius: deviceWidth < 380 ? 100 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});