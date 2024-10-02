import { TouchableOpacity, Text } from "react-native"

interface IProp{
    text: string;
    disabled: boolean;
    click?: () => void;
}

export const SecondaryButton: React.FC<IProp> = ({text, disabled = false, click}) => {
    return(
        <TouchableOpacity className="border-2 border-primary h-14 w-full rounded-md justify-center items-center" disabled={false} onPress={() => { if (click) { click() } }}>
            <Text className="text-white text-lg">{text}</Text>
        </TouchableOpacity>
    )
}