import {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  MARGIN,
  PADDING,
} from '@/constants/styles';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchBar({
  input,
  setSearchInput,
}: {
  input: string;
  setSearchInput: (input: string) => void;
}) {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(input) => setSearchInput(input)}
        style={styles.textInput}
        placeholder="Search"
        value={input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  textInput: {
    paddingVertical: PADDING.LARGE,
    borderRadius: 100,
    paddingHorizontal: PADDING.XLARGE,
    backgroundColor: COLORS.WHITE,
    // borderWidth: 1.5,
    // Shadow for iOS
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 12,
    margin: MARGIN.MEDIUM,
    fontSize: FONT_SIZE.XLARGE,
    fontWeight: FONT_WEIGHT.MEDIUM,
    color: COLORS.GREY,
    textTransform: 'capitalize',
  },
});
