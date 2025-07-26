import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  MARGIN,
  PADDING,
} from '@/constants/styles';
import { DATA } from '@/data';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function TestSet({
  title,
  setTestSetMin,
  setTestSetMax,
  testSetMin,
  testSetMax,
  setAllTestSet,
}: {
  title: string;
  setTestSetMin: (value: number) => void;
  setTestSetMax: (value: number) => void;
  testSetMin: number;
  testSetMax: number;
  setAllTestSet: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.itemContainer}>
        <TextInput
          onChangeText={(value) => setTestSetMin(Number(value))}
          placeholder="MIN"
          style={styles.item}
        />
        <TextInput
          onChangeText={(value) => setTestSetMax(Number(value))}
          placeholder="MAX"
          style={styles.item}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.subtitle}>{testSetMin}</Text>
        <Text style={styles.subtitle}>{testSetMax}</Text>
      </View>
      <TouchableOpacity
        onPress={() => setAllTestSet()}
        disabled={testSetMax === DATA.length}
        style={[
          styles.buttonWrapper,
          {
            backgroundColor:
              testSetMax === DATA.length ? COLORS.GREY : COLORS.BLUE,
          },
        ]}
      >
        <Text style={styles.buttonText}>Show all words</Text>
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
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 12,
    paddingHorizontal: PADDING.XLARGE,
  },
  title: {
    fontSize: FONT_SIZE.XLARGE,
    fontWeight: FONT_WEIGHT.MEDIUM,
    color: COLORS.BLUE,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  item: {
    backgroundColor: COLORS.LIGHT_GREY,
    margin: MARGIN.SMALL,
    paddingVertical: PADDING.XLARGE,
    borderRadius: BORDER_RADIUS.LARGE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 12,
    paddingHorizontal: PADDING.XLARGE,
    fontSize: FONT_SIZE.XLARGE,
    fontWeight: FONT_WEIGHT.MEDIUM,
    width: '45%',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZE.MEDIUM,
    fontWeight: FONT_WEIGHT.MEDIUM,
    color: COLORS.BLUE,
    marginBottom: 10,
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
