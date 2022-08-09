import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

//This is your unique id
export default function idGenerator() {
  return uuidv4();
}
