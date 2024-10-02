import { useEffect } from "react";
import { Text, View, Image } from "react-native";
interface IProp {
    image: string
}

export const Movie: React.FC<IProp> = ({ image }) => {

    return (
        <View className="py-2">
            <Image
                source={{uri: image}}
                style={{ width: 120, height: 168 }}
                className="rounded-lg mr-4"
            />
        </View>
    )
}