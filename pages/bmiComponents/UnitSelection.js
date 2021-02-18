import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { BOX, ROW, CENTER, TEXT_LABEL, TEXT_VALUE } from './style';

function UnitSelection({ label, value, minValue, maxValue, setValue }) {
  const [timer, setTimer] = useState(null);

  const decreaseValue = () => {
    setValue((value) => {
      if (value > minValue) {
        return value - 1;
      }

      return minValue;
    });
  };

  const increaseValue = () => {
    setValue((value) => {
      if (value < maxValue) {
        return value + 1;
      }

      return maxValue;
    });
  };

  function fastChangeValue(isIncrease) {
    const timer = setInterval(() => {
      if (isIncrease) {
        increaseValue();
      } else {
        decreaseValue();
      }
    }, 50);

    setTimer(timer);
  }

  function clearTimer() {
    clearInterval(timer);
    setTimer(null);
  }

  return (
    <View style={styles.box}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>{value}</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.button}
          onPress={decreaseValue}
          onLongPress={() => fastChangeValue(false)}
          onPressOut={clearTimer}
        >
          <FontAwesome5 name="minus" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={increaseValue}
          onLongPress={() => fastChangeValue(true)}
          onPressOut={clearTimer}
        >
          <FontAwesome5 name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    ...CENTER,
    ...BOX,
    marginHorizontal: 10,
  },
  label: {
    ...TEXT_LABEL,
  },
  value: {
    ...TEXT_VALUE,
  },
  buttonGroup: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  button: {
    ...CENTER,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3dcd93', //lightgreen //plus/minus signs
  },
});

export default React.memo(UnitSelection);
