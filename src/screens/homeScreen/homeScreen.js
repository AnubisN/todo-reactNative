import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import Notes from "../../components/notes/notes";
import { todoTask } from "../../utils/data";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase-config";
import { setNotes } from "../../reducers/notesSlice";
import { useDispatch } from "react-redux";
import { deleteAuth } from "../../reducers/authSlice";
import { useIsFocused } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { notes } = useSelector((state) => state.notes.value);
  const { auth } = useSelector((state) => state.auth.value);
  const [modalVisible, setModelVisible] = useState(false);
  const notesCollectionRef = query(
    collection(db, "notes"),
    where("userId", "==", auth.id)
  );

  const getNotes = async () => {
    const notesCol = await getDocs(notesCollectionRef);
    const notesResponse = notesCol.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch(setNotes([...notesResponse]));
  };

  const onSearchClick = () => {
    navigation.navigate("Search");
  };

  const onAddClick = () => {
    navigation.navigate("Add");
  };

  const onLogout = () => {
    dispatch(deleteAuth());
    navigation.navigate("Login");
  };

  useEffect(() => {
    getNotes();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {/* Top nav section */}
      <View style={styles.topNav}>
        <View style={styles.title__section}>
          <Text style={styles.topNavText}>Notes</Text>
        </View>
        <View style={styles.utils__icon}>
          <TouchableOpacity
            onPress={onSearchClick}
            style={styles.utils__icon__search}
          >
            <Image source={require("../../../assets/search.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModelVisible(!modalVisible)}
            style={styles.utils__icon__info}
          >
            <Image source={require("../../../assets/info_outline.png")} />
          </TouchableOpacity>
        </View>
      </View>
      {/* body section */}
      {notes.length > 0 ? (
        <View
          style={{
            flex: 8,
          }}
        >
          <FlatList
            data={notes}
            ListHeaderComponent={() => (
              <View
                style={{
                  width: "100%",
                }}
              />
            )}
            renderItem={({ item, index }) => <Notes todoTask={item} />}
          />
        </View>
      ) : (
        <View style={styles.notFoundBody}>
          <Image source={require("../../../assets/homeScreenBG.png")} />
          <Text style={styles.notFoundBody__text}>
            Create your first note !
          </Text>
        </View>
      )}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.alertContainer}>
          <View style={styles.alertWrapper}>
            <View style={{ marginBottom: 15 }}>
              <Image source={require("../../../assets/info.png")} />
            </View>
            <Text style={{ fontSize: 26, color: "#CFCFCF", marginBottom: 30 }}>
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
      <View style={styles.addSection}>
        <TouchableOpacity
          onPress={onAddClick}
          // onPress={() => setModelVisible(!modalVisible)}
          style={[styles.addSection__btn, styles.shadow]}
        >
          <Image source={require("../../../assets/add.png")} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          // flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: 100,
          height: 50,
          borderRadius: 20,
          backgroundColor: "#30BE71",
        }}
        onPress={onLogout}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252525",
    borderRadius: 5,
    height: "100%",
    paddingLeft: 20,
    paddingRight: 20,
  },
  wrapper: {
    padding: 20,
  },
  topNav: {
    marginTop: 40,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },
  topNavText: {
    fontSize: 40,
    color: "white",
    fontWeight: "600",
    position: "absolute",
  },
  utils__icon: {
    flexDirection: "row",
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
  notFoundBody: {
    flex: 2,
    alignItems: "center",
    // justifyContent: "center",
  },
  notFoundBody__text: {
    color: "#fff",
    fontSize: 20,
  },
  addSection: {
    // flex: 1,
    // zIndex: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  addSection__btn: {
    position: "absolute",
    bottom: 50,
    right: 25,
    width: 70,
    height: 70,
    backgroundColor: "#252525",
    borderRadius: 70 / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: -5,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    zIndex: 20000,
    elevation: 10,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
  },
  scrollViewContainer: {
    marginTop: 60,
  },
});
