import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { deleteNotes } from "../../reducers/notesSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase/firebase-config";

const Notes = ({ todoTask }) => {
  const navigation = useNavigation();
  const [longPressed, setLongPressed] = useState(false);
  const dispatch = useDispatch();
  const docRef = doc(db, "notes", `${todoTask.id}`);

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const onNoteClick = () => {
    navigation.navigate("Edit", {
      noteId: todoTask.id,
    });
  };

  const onNoteDelete = async (id) => {
    await deleteDoc(doc(db, "notes", `${id}`))
      .then((res) => {
        dispatch(deleteNotes(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let color = getRandomColor();
  return (
    <>
      {longPressed ? (
        <View
          style={{
            width: "100%",
            backgroundColor: `${color.slice(0, 4)}`,
            marginTop: 10,
            marginBottom: 10,
            padding: 30,
            borderRadius: 10,
            alignItems: "center",
          }}
          key={todoTask.title}
        >
          <TouchableOpacity
            onLongPress={() => setLongPressed(!longPressed)}
            onPress={() => onNoteDelete(todoTask.id)}
          >
            <Image source={require("../../../assets/delete.png")} />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            width: "100%",
            backgroundColor: `${color.slice(0, 4)}`,
            marginTop: 10,
            marginBottom: 10,
            padding: 30,
            borderRadius: 10,
          }}
          key={todoTask.title}
        >
          <TouchableOpacity
            onLongPress={() => setLongPressed(!longPressed)}
            onPress={onNoteClick}
          >
            <Text style={styles.text}>{todoTask.title}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 21,
  },
});

export default Notes;
