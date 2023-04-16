import { Text,StyleSheet } from "react-native";
import Colors from "../../constants/colors";
function InstructionText({children,style}){
    // Overridden Style example
    return <Text style={[styles.instructText,style]}>{children}</Text>
}
export default InstructionText;
const styles = StyleSheet.create({
  instructText: {
    fontFamily:'open-sans-bold',
    color: Colors.accent500,
    fontSize: 20,
    letterSpacing: 1,
  },
});