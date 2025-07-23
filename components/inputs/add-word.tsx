import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZE,
  MARGIN,
  PADDING,
} from '@/constants/styles';
import { usePersistStore } from '@/store/store';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AddWord() {
  const [english, setEnglish] = useState('');
  const [creole, setCreole] = useState('');

  const words = usePersistStore((state: any) => state.words);
  const setWords = usePersistStore((state: any) => state.setWords);
  const reset = usePersistStore((state: any) => state.reset);

  const addWord = () => {
    setWords({ id: words.length, english: english, creole: creole });
    setEnglish('');
    setCreole('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.wordWrapper}>
        <TextInput
          onChangeText={setEnglish}
          value={english}
          placeholder="English"
          style={styles.textInput}
          autoComplete="off"
          autoCorrect={false}
        />
      </View>
      <View style={styles.wordWrapper}>
        <TextInput
          onChangeText={setCreole}
          value={creole}
          placeholder="Creole"
          style={styles.textInput}
          autoComplete="off"
          autoCorrect={false}
        />
      </View>
      <TouchableOpacity
        onPress={() => addWord()}
        disabled={creole.trim() === '' || english.trim() === ''}
        style={[
          styles.buttonWrapper,
          {
            backgroundColor:
              creole.trim() === '' || english.trim() === ''
                ? COLORS.GREY
                : COLORS.BLUE,
          },
        ]}
      >
        <Text style={styles.buttonText}>Add to Dictionary</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => reset()}
        style={[styles.buttonWrapper, { backgroundColor: 'pink' }]}
      >
        <Text style={styles.buttonText}>reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LIGHT_GREY,
    width: '95%',
    margin: MARGIN.SMALL,
    paddingVertical: PADDING.XLARGE,
    borderRadius: BORDER_RADIUS.LARGE,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1.5,
    // Shadow for iOS
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 12,
  },
  wordWrapper: {
    width: '100%',
    margin: MARGIN.SMALL,
    paddingHorizontal: PADDING.XLARGE,
  },
  textInput: {
    marginTop: MARGIN.SMALL,
    backgroundColor: COLORS.WHITE,
    padding: PADDING.LARGE,
    width: '100%',
    textAlign: 'left',
    borderRadius: BORDER_RADIUS.MEDIUM,
    // borderWidth: 1.5,
    // Shadow for iOS
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 12,
    fontWeight: '600',
    fontSize: FONT_SIZE.MEDIUM,
    color: 'black',
    marginVertical: MARGIN.LARGE,
  },
  text: {
    width: '100%',
    fontWeight: '600',
    fontSize: FONT_SIZE.LARGE,
    color: 'black',
  },
  buttonWrapper: {
    padding: PADDING.LARGE,
    borderRadius: BORDER_RADIUS.XLARGE,
    // Shadow for iOS
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 12,
    marginVertical: MARGIN.MEDIUM,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: FONT_SIZE.SMALL,
    color: 'black',
  },
});
