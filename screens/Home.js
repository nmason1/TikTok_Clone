import React, { useRef, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
  Text
} from "react-native";
import { Video } from "expo-av";
import { Ionicons, Fontisto } from "@expo/vector-icons";

const data = [
  {
    source: require("../videos/punch.mp4")
  },
  {
    source: require("../videos/looking.mp4")
  },
  {
    source: require("../videos/posing.mp4")
  },
  {
    source: require("../videos/tour.mp4")
  }
];

const { width, height } = Dimensions.get("window");

function Home(props) {
  const [visibleIndex, setVisibleIndex] = useState("");
  const [text, setText] = useState("");
  const [visible, setIsVisible] = useState(false);
  const onViewRef = useRef(({ viewableItems, changed }) => {
    viewableItems.forEach(item => {
      if (item.isViewable) {
        setVisibleIndex(item.index);
      }
    }); // setVisibleIndex(viewableItems.index);
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={{ flex: 1 }}>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View
          style={{
            height: "60%",
            backgroundColor: "white",
            marginTop: height / 3,
            flexDirection: "column"
          }}
        >
          <View style={{ position: "absolute", left: "88%", top: "5%" }}>
            <TouchableOpacity onPress={() => setIsVisible(!visible)}>
              <Ionicons
                name="md-close"
                size={35}
                color="black"
                style={{
                  position: "absolute"
                }}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={props.comments}
            style={{ marginBottom: "15%" }}
            keyExtractor={(item, index) => {
              index.toString() + item;
            }}
            pagingEnabled
            renderItem={({ item, index }) => (
              <View
                style={{
                  height: 40,
                  alignItems: "center",
                  marginTop: 5,
                  marginHorizontal: "10%"
                }}
              >
                <Text>Comment {index + 1}</Text>
                <Text style={{ color: "black" }}>{item.comment}</Text>
              </View>
            )}
          />
          <View
            style={{
              position: "absolute",
              top: "87%",
              width: "100%"
            }}
          >
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "grey",
                borderRadius: 5,
                width: "100%",
                height: height / 13
              }}
              onChangeText={text => setText(text)}
              placeholder="Add Comment..."
              returnKeyType="done"
              onSubmitEditing={() => {
                let arr = [...props.comments];
                arr.push({ comment: text });
                props.setComments(arr);
                console.log(props.comments);
              }}
            ></TextInput>
          </View>
        </View>
      </Modal>
      <FlatList
        data={data}
        keyExtractor={(item, index) => "key" + index}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        renderItem={({ item, index }) => (
          <View style={{ height: height }}>
            <Video
              style={{ flex: 1 }}
              source={item.source}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay={true ? visibleIndex == index : false}
              isLooping
            />
          </View>
        )}
      />
      <View
        style={{
          position: "absolute",
          height: "40%",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          left: "87%",
          top: "48%"
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setIsVisible(!visible);
          }}
        >
          <Fontisto name="commenting" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Fontisto name="heart-alt" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Fontisto name="share-a" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", height: height }
});

export default Home;
