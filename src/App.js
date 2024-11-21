import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-web";

const Box = ({ id, selectedBoxes, onBoxClick }) => {
  return (
    <TouchableOpacity
      style={[
        styles.box,
        {
          backgroundColor: selectedBoxes.includes(id) ? "green" : "yellow",
        },
      ]}
      onPress={() => onBoxClick(id)}
    >
      <Text>{id}</Text>
    </TouchableOpacity>
  );
};

function App() {
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const totalNumberOfbox = 9;
  let intervalId = null;

  useEffect(() => {
    if (selectedBoxes.length == totalNumberOfbox) {
      setAllSelected(true);
    }
    if (allSelected) {
      intervalId = setInterval(() => {
        const selectedBoxesTemp = selectedBoxes.slice(1);
        console.log("selectedBoxesTemp", selectedBoxesTemp);
        if (selectedBoxesTemp.length == 0) {
          setAllSelected(false);
        }
        setSelectedBoxes(selectedBoxesTemp);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [selectedBoxes, allSelected]);

  const onBoxClick = (id) => {
    setSelectedBoxes((prevState) => [...prevState, id]);
  };

  const commonPeops = {
    selectedBoxes,
    onBoxClick,
  };

  return (
    <>
      <View style={styles.wrapper}>
        <Box id={1} {...commonPeops} />
        <Box id={2} {...commonPeops} />
        <Box id={3} {...commonPeops} />
        <Box id={4} {...commonPeops} />
      </View>
      <View style={styles.middleWrapper}>
        <Box id={5} {...commonPeops} />
      </View>
      <View style={styles.wrapper}>
        <Box id={6} {...commonPeops} />
        <Box id={7} {...commonPeops} />
        <Box id={8} {...commonPeops} />
        <Box id={9} {...commonPeops} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500,
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  middleWrapper: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

export default App;
