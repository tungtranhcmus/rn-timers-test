import React, {useCallback, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {images, textSizes, colors, metrics} from '../../ultils/contants';

const TimerItem = props => {
  const {minusItem, index} = props;
  const [isInputText, setIsInputText] = useState(true);
  const [isStart, setIsStart] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [time, setTime] = useState(0);
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');
  const refTitle = useRef('');
  const refProject = useRef('');
  const refInterval = useRef(null);

  const createAndUpdate = useCallback(() => {
    refTitle.current = title;
    refProject.current = project;
    if (isEdit) {
      setIsInputText(false);
      if (isStart) {
        startCount();
      }
    } else {
      setIsInputText(false);
      setIsEdit(true);
    }
  }, [isEdit, isStart, project, startCount, title]);

  const cancelItem = useCallback(() => {
    if (isEdit) {
      setTitle(refTitle.current);
      setProject(refProject.current);
      setIsInputText(false);
    } else {
      minusItem && minusItem(index);
    }
  }, [index, isEdit, minusItem]);

  const deleteItem = useCallback(() => {
    stopCount();
    minusItem && minusItem(index);
  }, [index, minusItem, stopCount]);

  const editItem = useCallback(() => {
    setIsInputText(true);
    if (isStart) {
      stopCount();
    }
  }, [isStart, stopCount]);

  const startCount = useCallback(() => {
    refInterval.current = setInterval(() => {
      setTime(timeCurrent => timeCurrent + 1);
    }, 1000);
  }, []);
  const stopCount = useCallback(() => {
    if (refInterval.current) {
      clearInterval(refInterval.current);
    }
  }, []);

  const startTimer = useCallback(() => {
    if (isStart) {
      setIsStart(false);
      stopCount();
    } else {
      setIsStart(true);
      startCount();
    }
  }, [isStart, startCount, stopCount]);

  if (isInputText) {
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>Title</Text>
        <View style={styles.viewInput}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
        </View>
        <View style={styles.viewSpace} />
        <Text style={styles.textTitle}>Project</Text>
        <View style={styles.viewInput}>
          <TextInput
            value={project}
            onChangeText={setProject}
            style={styles.input}
          />
        </View>
        <View style={styles.viewSpace} />
        <View style={styles.viewRow}>
          <TouchableOpacity onPress={createAndUpdate} style={styles.viewButton}>
            <Text style={styles.textTitle}>{isEdit ? 'Update' : 'Create'}</Text>
          </TouchableOpacity>
          <View style={styles.viewSpace} />
          <TouchableOpacity onPress={cancelItem} style={styles.viewButton}>
            <Text style={styles.textTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>{title}</Text>
        <View style={styles.viewSpace} />
        <Text style={styles.textTitle}>{project}</Text>
        <View style={styles.viewSpace} />
        <Text style={styles.textTime}>
          {new Date(time * 1000).toISOString().substr(11, 8)}
        </Text>
        <View style={styles.viewSpace} />
        <View style={styles.viewSpace} />
        <View style={styles.viewIcons}>
          <TouchableOpacity onPress={deleteItem}>
            <Image source={images.trash} style={styles.iconSmall} />
          </TouchableOpacity>
          <View style={styles.viewSpace} />
          <TouchableOpacity onPress={editItem}>
            <Image source={images.edit} style={styles.iconSmall} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewSpace} />
        <TouchableOpacity onPress={startTimer} style={styles.viewButton}>
          <Text style={styles.textTitle}>{isStart ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: metrics.spaceHorizontal,
    marginHorizontal: metrics.spaceHorizontal,
    paddingVertical: metrics.spaceVertical,
    marginVertical: metrics.spaceVertical,
    borderWidth: 1,
    borderColor: colors.orangeLight,
  },
  textTitle: {
    fontSize: textSizes.normal,
    color: colors.gray,
  },
  textTime: {
    fontSize: textSizes.large,
    color: colors.gray,
    alignSelf: 'center',
  },
  viewInput: {
    height: metrics.heightButton,
    borderWidth: 1,
    borderColor: colors.orangeLight,
    marginTop: metrics.smallSpace,
  },
  input: {
    flex: 1,
    fontSize: textSizes.normal,
    color: colors.gray,
    paddingHorizontal: metrics.spaceVertical,
    paddingVertical: 0,
  },
  viewSpace: {
    height: metrics.spaceVertical,
    width: metrics.spaceVertical,
  },
  viewButton: {
    height: metrics.heightButton,
    borderWidth: 1,
    borderColor: colors.orangeLight,
    marginTop: metrics.smallSpace,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  viewRow: {
    flexDirection: 'row',
  },
  viewIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconSmall: {
    width: metrics.smallIcon,
    height: metrics.smallIcon,
  },
});

export default TimerItem;
