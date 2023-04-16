import { useState } from 'react';
import { StyleSheet,ImageBackground,SafeAreaView } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen'
import Colors from './constants/colors';
import { StatusBar } from 'expo-status-bar';
import {useFonts} from 'expo-font';//It is a Hook
// import AppLoading from 'expo-app-loading';
export default function App() {
  const [userNumber,setUserNumber] = useState();
  const [gameIsOver,setGameIsOver] = useState(true);
  const [guessRounds,setGuessRounds] = useState(0);
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
  if(!fontsLoaded){
    // return <AppLoading />
  }
  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }
  function gameOverHandler(numberOfRounds){
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }
  function startNewGameHandler(){
    setUserNumber(null);
    setGameIsOver(true);
    setGuessRounds(0);
  }
  let screen = <StartGameScreen onValidNumber={pickedNumberHandler}/>;
  if(userNumber){
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>
  }
  if(gameIsOver && userNumber){
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler}/>
  }
  return (
    <>
      <StatusBar style='light'/>
      <LinearGradient
        colors={[Colors.primary800, Colors.accent500]}
        style={styles.rootBack}
      >
        <ImageBackground
          source={require("./assets/images/back.jpg")}
          resizeMode="cover"
          style={styles.rootBack}
          imageStyle={styles.backImg}
        >
          <SafeAreaView style={styles.rootBack}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootBack:{
    flex:1,  
    // backgroundColor:'#ddb52f'
  },
  backImg:{
    opacity: 0.25
  }
});
 