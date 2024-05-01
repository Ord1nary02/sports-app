import React from "react";
import { Modal, View, ActivityIndicator, Text } from "react-native";

interface LoaderProps {
  isVisible: boolean;
  message: string;
}
export const Loader = ({ isVisible, message = "Loading" }: LoaderProps) => {
  return (
    <Modal transparent={true} visible={isVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "50%",
            justifyContent: "center",
            flexDirection: "row",
            borderRadius: 10,
            minHeight: 40,
          }}
        >
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
              }}
            >
              {message}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              marginLeft: 15,
            }}
          >
            <ActivityIndicator size="small" color="#000000" />
          </View>
        </View>
      </View>
    </Modal>
  );
};
