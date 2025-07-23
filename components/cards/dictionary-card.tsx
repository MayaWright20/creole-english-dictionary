import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  MARGIN,
  PADDING,
} from '@/constants/styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';

export default function DictionaryCard({
  title,
  description,
  isFavourited,
  onPressIsFavourite,
}: {
  title: string;
  description: string;
  isFavourited: boolean;
  onPressIsFavourite: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <FontAwesome
          name={isFavourited ? 'heart' : 'heart-o'}
          size={25}
          color={'red'}
          onPress={() => onPressIsFavourite()}
        />
      </View>
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
  iconWrapper: {
    alignItems: 'flex-end',
  },
});
