import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getNote, setNotes, updateNotes } from "../../reducers/notesSlice";

const EditScreen = ({ route, navigation }) => {
  const { noteId } = route.params;
  const { note } = useSelector((state) => state.notes.value);
  const [editNote, setEditNote] = useState({
    title: "",
    content: "",
  });

  const onHomeClick = () => {
    navigation.navigate("Home");
  };

  const [saveChangesVisible, setSaveChangesVisible] = useState(false);
  const [discardChangesVisible, setDiscardChangesVisible] = useState(false);
  const dispatch = useDispatch();

  const onCloseSave = () => {
    setSaveChangesVisible(false);
    setDiscardChangesVisible(true);
  };

  const onDiscardHandler = () => {
    setDiscardChangesVisible(false);
    navigation.navigate("Home");
  };

  const onSaveHandler = () => {
    setSaveChangesVisible(false);
    const data = {
      ...editNote,
    };
    dispatch(updateNotes(data));
    navigation.navigate("Home");
  };

  const onChangeHandler = (name, val) => {
    setEditNote((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  const loadNote = () => {
    dispatch(getNote(noteId));
    console.log(noteId);
    console.log(note);
    setEditNote(note);
  };

  useEffect(() => {
    loadNote();
  }, []);

  return (
    <View
      style={
        saveChangesVisible || discardChangesVisible
          ? styles.containerOpacity
          : styles.container
      }
    >
      <View style={styles.topNav}>
        <TouchableOpacity
          onPress={onHomeClick}
          style={styles.utils__icon__search}
        >
          <Image source={require("../../../assets/back.png")} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSaveChangesVisible(true)}
          style={styles.utils__icon__info}
        >
          <Image source={require("../../../assets/save.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        {editNote.title.length > 0 && editNote.content.length > 0 ? (
          <>
            <TextInput
              style={styles.input__title}
              multiline={true}
              placeholderTextColor="#9A9A9A"
              placeholder="Title"
              value={editNote.title}
              name="Title"
              onChangeText={(e) => onChangeHandler("title", e)}
            />
            <TextInput
              style={styles.input__body}
              multiline={true}
              placeholderTextColor="#9A9A9A"
              placeholder="Type something..."
              value={editNote.content}
              onChangeText={(e) => onChangeHandler("content", e)}
            />
          </>
        ) : null}
        <Modal
          animationType="slide"
          transparent={true}
          visible={saveChangesVisible}
        >
          <View style={styles.alertContainer}>
            <View style={styles.alertWrapper}>
              <View style={{ marginBottom: 15 }}>
                <Image source={require("../../../assets/info.png")} />
              </View>
              <Text
                style={{ fontSize: 26, color: "#CFCFCF", marginBottom: 30 }}
              >
                Save changes ?
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 112,
                    height: 39,
                    backgroundColor: "#FF0000",
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                  onPress={onCloseSave}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#fff",
                    }}
                  >
                    Discard
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 112,
                    height: 39,
                    backgroundColor: "#30BE71",
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 10,
                  }}
                  onPress={onSaveHandler}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#fff",
                    }}
                  >
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={discardChangesVisible}
        >
          <View style={styles.alertContainer}>
            <View style={styles.alertWrapper}>
              <View style={{ marginBottom: 15 }}>
                <Image source={require("../../../assets/info.png")} />
              </View>
              <Text
                style={{ fontSize: 25, color: "#CFCFCF", marginBottom: 30 }}
              >
                Are your sure you want discard your changes ?
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 112,
                    height: 39,
                    backgroundColor: "#FF0000",
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                  onPress={onDiscardHandler}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#fff",
                    }}
                  >
                    Discard
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 112,
                    height: 39,
                    backgroundColor: "#30BE71",
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 10,
                  }}
                  onPress={() => setDiscardChangesVisible(false)}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#fff",
                    }}
                  >
                    Keep
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252525",
    borderRadius: 5,
    height: "100%",
    paddingLeft: 20,
    paddingRight: 20,
  },
  containerOpacity: {
    flex: 1,
    backgroundColor: "#252525",
    borderRadius: 5,
    height: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    opacity: 0.7,
  },
  topNav: {
    marginTop: 50,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  utils__icon__search: {
    width: 50,
    height: 50,
    backgroundColor: "#3B3B3B",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  utils__icon__info: {
    width: 50,
    height: 50,
    backgroundColor: "#3B3B3B",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flex: 8,
  },
  input__title: {
    fontSize: 40,
    marginTop: 10,
    color: "#9A9A9A",
  },
  input__body: {
    marginTop: 15,
    fontSize: 23,
    color: "#9A9A9A",
  },
  alertContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
    borderRadius: 20,
  },
  alertWrapper: {
    width: 300,
    height: 236,
    backgroundColor: "#252525",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
export default EditScreen;
