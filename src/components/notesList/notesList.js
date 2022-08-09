import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import Notes from "../notes/notes";

export default function NotesList({ todoTask }) {
  return (
    <View>
      {todoTask.map((el) => {
        <Notes todoTask={el} />;
      })}
    </View>
  );
}
