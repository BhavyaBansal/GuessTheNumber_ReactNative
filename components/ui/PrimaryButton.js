import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
function PrimaryButton({ children, onPressProp }) {
  return (
    <View style={styles.btnOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.pressed, styles.btnInnerContainer]
            : styles.btnInnerContainer
        }
        onPress={onPressProp}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.btntext}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;
const styles = StyleSheet.create({
  btnOuterContainer: {
    borderRadius: 30,
    margin: 4,
    overflow: "hidden",
  },
  btnInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  btntext: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
