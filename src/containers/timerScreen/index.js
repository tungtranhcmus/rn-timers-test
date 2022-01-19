import React, {memo, useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {images, textSizes, colors, metrics} from '../../ultils/contants';
import TimerItem from './timerItem';

const TimerScreen = () => {
  const [timers, setTimers] = useState([]);

  const addItem = useCallback(() => {
    setTimers(timersState => [...timersState, {key: new Date().toISOString()}]);
  }, []);

  const minusItem = useCallback(indexItem => {
    setTimers(timersState => {
      return timersState.filter((item, index) => index !== indexItem);
    });
  }, []);

  const timerItem = useCallback(
    ({item, index}) => {
      return <TimerItem minusItem={minusItem} index={index} />;
    },
    [minusItem],
  );

  const footerAddItem = useCallback(() => {
    return (
      <TouchableOpacity onPress={addItem} style={styles.viewAddItem}>
        <Image source={images.plus} style={styles.iconPlus} />
      </TouchableOpacity>
    );
  }, [addItem]);

  const headerList = useCallback(() => {
    return <View style={styles.viewHeaderList} />;
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.viewTitle}>
          <Text style={styles.textTitle}>Timers</Text>
        </View>
        <View style={styles.viewList}>
          <FlatList
            data={timers}
            renderItem={timerItem}
            keyExtractor={item => item.key}
            ListFooterComponent={footerAddItem}
            ListHeaderComponent={headerList}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  viewTitle: {
    height: metrics.heightHeader,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.orangeLight,
    backgroundColor: colors.white,
  },
  textTitle: {
    fontSize: textSizes.large,
    color: colors.gray,
  },
  viewList: {
    flex: 1,
    backgroundColor: colors.light,
  },
  viewAddItem: {
    height: metrics.heightButton,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.orangeLight,
    marginVertical: metrics.spaceVertical,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: metrics.spaceHorizontal,
  },
  iconPlus: {
    width: metrics.smallIcon,
    height: metrics.smallIcon,
  },
  viewHeaderList: {
    marginTop: metrics.spaceVertical,
  },
});

export default memo(TimerScreen);
