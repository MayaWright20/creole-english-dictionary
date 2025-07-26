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
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Home() {
  const WORDS = usePersistStore((state: any) => state.words);
  const toggleFavourite = usePersistStore(
    (state: any) => state.toggleFavourite
  );

  const testByEnglish = usePersistStore((state: any) => state.testByEnglish);

  const [randomInt, setRandomInt] = useState(
    Math.floor(Math.random() * WORDS.length)
  );
  const [randomIntAnswerPosition, setRandomAnswerPosition] = useState(
    Math.floor(Math.random() * 4)
  );

  const [isRevealAnswer, setIsRevealAnswer] = useState(false);

  const revealAnswerHandler = (item: number) => {
    setIsRevealAnswer(true);
  };

  const [setArray, setSetArray] = useState(
    new Set([
      Math.floor(Math.random() * WORDS.length),
      Math.floor(Math.random() * WORDS.length),
      Math.floor(Math.random() * WORDS.length),
      Math.floor(Math.random() * WORDS.length),
    ])
  );

  const nextQuestionHandler = () => {
    setIsRevealAnswer(false);
    setSetArray(
      new Set([
        Math.floor(Math.random() * WORDS.length),
        Math.floor(Math.random() * WORDS.length),
        Math.floor(Math.random() * WORDS.length),
        Math.floor(Math.random() * WORDS.length),
      ])
    );
    setRandomInt(Math.floor(Math.random() * WORDS.length));
    setRandomAnswerPosition(Math.floor(Math.random() * 4));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconWrapper}>
        <FontAwesome
          name={WORDS[randomInt].isFavourited ? 'heart' : 'heart-o'}
          size={25}
          color={'red'}
          onPress={() => toggleFavourite(WORDS[randomInt])}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {testByEnglish ? WORDS[randomInt].english : WORDS[randomInt].creole}
          </Text>
          {isRevealAnswer && (
            <Text style={styles.titleAnswer}>
              {testByEnglish
                ? WORDS[randomInt].creole
                : WORDS[randomInt].english}
            </Text>
          )}

          <View style={styles.answerContainer}>
            <View>
              {[...setArray].map((item, index) => {
                if (randomIntAnswerPosition === index) {
                  return (
                    <TouchableOpacity
                      onPress={() => revealAnswerHandler(index)}
                      key={index}
                      style={styles.answerWrapper}
                    >
                      <Text
                        style={[
                          styles.answer,
                          {
                            color: isRevealAnswer ? COLORS.GREEN : 'black',
                          },
                        ]}
                      >
                        {testByEnglish
                          ? WORDS[randomInt].creole
                          : WORDS[randomInt].english}
                      </Text>
                    </TouchableOpacity>
                  );
                } else if (
                  testByEnglish
                    ? WORDS[Array.from(setArray)[index]].creole !==
                      WORDS[randomInt].creole
                    : WORDS[Array.from(setArray)[index]].creole !==
                      WORDS[randomInt].english
                ) {
                  return (
                    <TouchableOpacity
                      onPress={() => revealAnswerHandler(index)}
                      key={index}
                      style={styles.answerWrapper}
                    >
                      <Text
                        style={[
                          styles.answer,
                          {
                            color: isRevealAnswer ? COLORS.RED : 'black',
                          },
                        ]}
                      >
                        {testByEnglish
                          ? WORDS[Array.from(setArray)[index]].creole
                          : WORDS[Array.from(setArray)[index]].english}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              })}
            </View>

            {isRevealAnswer && (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => nextQuestionHandler()}
              >
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 12,
    padding: PADDING.XLARGE,
    paddingBottom: '50%',
  },
  iconWrapper: {
    alignItems: 'flex-end',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '10%',
    width: '100%',
    height: '94%',
  },
  title: {
    fontSize: FONT_SIZE.XLARGE,
    fontWeight: FONT_WEIGHT.MEDIUM,
    color: COLORS.BLUE,
  },
  titleAnswer: {
    fontSize: FONT_SIZE.XLARGE,
    fontWeight: FONT_WEIGHT.MEDIUM,
    marginTop: 5,
  },
  answerContainer: {
    marginTop: '13%',
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  answerWrapper: {
    marginVertical: MARGIN.SMALL,
    borderRadius: BORDER_RADIUS.MEDIUM,
    backgroundColor: COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 12,
    padding: PADDING.XLARGE,
  },
  answer: {
    fontSize: FONT_SIZE.MEDIUM,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
  nextButton: {
    backgroundColor: 'black',
    textAlign: 'center',
    padding: 20,
    borderRadius: BORDER_RADIUS.XLARGE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 12,
    width: '90%',
    alignSelf: 'center',
    marginTop: '13%',
  },
  nextButtonText: {
    color: 'white',
    fontSize: FONT_SIZE.MEDIUM,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
});
