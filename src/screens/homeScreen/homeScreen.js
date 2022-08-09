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

export default function HomeScreen({ navigation }) {
  const { notes } = useSelector((state) => state.notes.value);
  const [modalVisible, setModelVisible] = useState(false);

  const onSearchClick = () => {
    navigation.navigate("Search");
  };

  const onInfoClick = () => {
    navigation.navigate("Add");
  };

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
            onPress={onInfoClick}
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

      {/* <Notes todoTask={todoTask} /> */}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onShow={() => alert("Showing")}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModelVisible(!modalVisible);
        }}
      >
        <View>
          <Text>Hrlo</Text>
        </View>
      </Modal> */}
      <View style={styles.addSection}>
        <TouchableOpacity
          onPress={() => setModelVisible(!modalVisible)}
          style={[styles.addSection__btn, styles.shadow]}
        >
          <Image source={require("../../../assets/add.png")} />
        </TouchableOpacity>
      </View>
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
