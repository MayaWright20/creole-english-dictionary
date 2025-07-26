import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  MARGIN,
  PADDING,
} from '@/constants/styles';
import { usePersistStore } from '@/store/store';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

export default function Home() {
  const { height } = useWindowDimensions();
  const WORDS = usePersistStore((state: any) => state.words);
  const toggleFavourite = usePersistStore(
    (state: any) => state.toggleFavourite
  );

  const randomInt = Math.floor(Math.random() * (WORDS.length - 1 - 0 + 1)) + 0;

  return (
    <View style={[styles.container]}>
      <View style={styles.iconWrapper}>
        <FontAwesome
          name={WORDS[randomInt].isFavourited ? 'heart' : 'heart-o'}
          size={25}
          color={'red'}
          onPress={() => toggleFavourite(WORDS[randomInt])}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{WORDS[randomInt].english}</Text>
          <View style={styles.answerContainer}>
            <TouchableOpacity style={styles.answerWrapper}>
              <Text style={styles.answer}>{WORDS[randomInt].creole}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.answerWrapper}>
              <Text style={styles.answer}>{WORDS[randomInt].creole}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.answerWrapper}>
              <Text style={styles.answer}>{WORDS[randomInt].creole}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.answerWrapper}>
              <Text style={styles.answer}>{WORDS[randomInt].creole}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '95%',
    // margin: MARGIN.SMALL,
    // borderRadius: BORDER_RADIUS.LARGE,
    backgroundColor: COLORS.WHITE,
    // borderWidth: 1.5,
    // Shadow for iOS
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 12,
    padding: PADDING.XLARGE,
  },
  iconWrapper: {
    alignItems: 'flex-end',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '25%',
    // justifyContent: 'center',
    width: '100%',
    height: '94%',
  },
  title: {
    fontSize: FONT_SIZE.XLARGE,
    fontWeight: FONT_WEIGHT.MEDIUM,
    color: COLORS.BLUE,
    textTransform: 'capitalize',
  },
  answerContainer: {
    // backgroundColor: 'pink',
    marginTop: '25%',
    width: '100%',
    flex: 1,
    padding: PADDING.MEDIUM,
  },
  answerWrapper: {
    marginVertical: MARGIN.SMALL,
    borderRadius: BORDER_RADIUS.MEDIUM,
    backgroundColor: COLORS.WHITE,
    // borderWidth: 1.5,
    // Shadow for iOS
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 12,
    padding: PADDING.XLARGE,
  },
  answer: {
    fontSize: FONT_SIZE.MEDIUM,
    fontWeight: FONT_WEIGHT.MEDIUM,
    textTransform: 'capitalize',
  },
});
