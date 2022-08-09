import React, { useState } from "react";
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
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import Notes from "../../components/notes/notes";

export default function SearchScreen({ navigation }) {
  const { notes } = useSelector((state) => state.notes.value);
  const [searchedNotes, setSearchedNotes] = useState([...notes]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const onCancelClick = () => {
    navigation.navigate("Home");
  };

  const onSearchHandler = (keyword) => {
    if (keyword.length != 0) {
      setSearchKeyword(keyword);
      const filteredList = searchedNotes.filter((el) =>
        el.title.includes(keyword)
      );
      setSearchedNotes([...filteredList]);
    } else {
      setSearchKeyword(keyword);
      setSearchedNotes([...notes]);
    }
  };

  const [modalVisible, setModelVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.searchBar__clicked}>
        <TextInput
          style={styles.search__input}
          value={searchKeyword}
          onChangeText={(e) => onSearchHandler(e)}
          placeholderTextColor="#9A9A9A"
          placeholder="Search by the keyword..."
        />
        <TouchableOpacity onPress={onCancelClick} style={styles.cancel__btn}>
          <Image source={require("../../../assets/cancel.png")} />
        </TouchableOpacity>
      </View>

      {searchedNotes.length > 0 ? (
        <FlatList
          data={searchedNotes}
          style={{ paddingBottom: 20 }}
          ListHeaderComponent={() => (
            <View
              style={{
                height: 20,
                width: "100%",
              }}
            />
          )}
          renderItem={({ item, index }) => <Notes todoTask={item} />}
        />
      ) : (
        <View style={styles.notFoundBody}>
          <Image source={require("../../../assets/notFound.png")} />
          <Text style={styles.notFoundBody__text}>
            File not found. Try searching again.
          </Text>
        </View>
      )}
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
  body: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
  },
  search__input: {
    fontSize: 18,
    marginLeft: 10,
  },
  searchBar__clicked: {
    marginTop: 70,
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#3B3B3B",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  cancel__btn: {
    marginRight: 10,
  },
  notFoundBody: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundBody__text: {
    color: "#fff",
    fontSize: 20,
  },
});
