import { Image } from "react-native"
import React from "react"

const Logo = () => {
    return (
        <Image
            source={require("./../../assets/LogoPrimary.png")}
            //  className="w-32"
            //  width={20}
            //  height={20}
            style={{ width: '100%', height: '15%' }}
        />
    )
}

const LogoMini = () => {
    return (
        <Image
            source={require("./../../assets/LogoMiniWhite.png")}
            //  className="w-32"
            //  width={20}
            //  height={20}
            style={{ width: 60, height: 60 }}
        />
    )
}

export { Logo, LogoMini }