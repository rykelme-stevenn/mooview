import { TouchableOpacity, Text, ActivityIndicator } from "react-native"
import { View } from "react-native";

interface IProp {
    text: string;
    loading?: boolean;
    disabled?: boolean;
    click?: () => void;
}

export const PrimaryButton: React.FC<IProp> = ({ text, loading, disabled = false, click }) => {
    return (
        <TouchableOpacity className="bg-primary h-14 w-full rounded-md justify-center items-center" onPress={() => { if (click) { click() } }} disabled={disabled}>
            {
                loading ? (
                    <ActivityIndicator size="large" color="white" />
                ) : (
                    <Text className="text-white text-lg">{text}</Text>
                )
            }

        </TouchableOpacity>
    )
}