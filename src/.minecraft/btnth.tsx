import { Pressable, Text } from "react-native";
import { useThemedStyles } from "../style/style";

type BtnTHProps = {
  icon?: React.ReactNode;
  label?: string;
  onPress: () => void;
};

export default function BtnTH({ label, onPress, icon }: BtnTHProps) {
  const styles = useThemedStyles();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#b0dca8" : "green",
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 8,
          alignItems: "center",
          marginTop: 10,
        },
      ]}
    >
        {icon}
        {label && <Text style={styles.txt}>{label}</Text>}
    </Pressable>
  );
}
