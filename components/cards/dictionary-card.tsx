import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  MARGIN,
  PADDING,
} from '@/constants/styles';
import { StyleSheet, Text, View } from 'react-native';

export default function DictionaryCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    margin: MARGIN.SMALL,
    borderRadius: BORDER_RADIUS.LARGE,
    padding: PADDING.LARGE,
    // borderWidth: 1.5,
    // Shadow for iOS
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 12,
  },
  title: {
    fontSize: FONT_SIZE.MEDIUM,
    fontWeight: FONT_WEIGHT.MEDIUM,
    color: COLORS.BLUE,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: FONT_SIZE.SMALL,
    fontWeight: FONT_WEIGHT.SMALL,
    textTransform: 'capitalize',
  },
});
