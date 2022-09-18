import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./Participant.styles";

interface ParticipantPropsInterface {
  name: string;
  onRemove: VoidFunction;
}

export function Participant ({ name, onRemove }: ParticipantPropsInterface) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>

      <TouchableOpacity style={styles.button} onPress={onRemove}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  );
}
