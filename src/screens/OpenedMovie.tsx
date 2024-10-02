import { useCallback, useEffect, useRef, useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import YoutubeIframe, { YoutubeIframeRef } from "react-native-youtube-iframe"
import * as ScreenOrientation from 'expo-screen-orientation'
import Icon from 'react-native-vector-icons/AntDesign';
import { PrimaryButton } from "../components/PrimaryButton"
import axios from 'axios';
import Merchants from "../serverUtils/merchants"
import { IMovie } from "../components/types/movie"
import { useRoute } from "@react-navigation/native"
import { HeaderBack } from "../components/HeaderBack"
import { RateMovie } from "../components/RateMovie"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { getRating } from "../components/server/rate"

export const OpenedMovie = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const route = useRoute();
  const { movieSelected } = route.params

  const [videoReady, setVideoReady] = useState(false);
  const [duration, setDuration] = useState<string>();
  const [playing, setPlaying] = useState(true);
  const [rating, setRating] = useState(undefined)
  const playerRef = useRef<YoutubeIframeRef | null>(null);

  useEffect(() => {
    if (videoReady) {
      playerRef.current?.getDuration().then(
        getDuration => {
          let formatedTime = hourDuration(getDuration)
          setDuration(formatedTime)
        }
      );
    }
  }, [videoReady])

  const onFullScreenChange = useCallback((isFullScreen: boolean) => {
    if (isFullScreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, [])

  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  function hourDuration(segundos: number) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);

    const formatarNumero = (num: number) => (num < 10 ? `${num}` : `${num}`);

    return `${formatarNumero(horas)}h ${formatarNumero(minutos)}m`;
  }

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
    onFullScreenChange(true)
  }, []);


  return (
    <SafeAreaView>
      <ScrollView>
        <HeaderBack />
        <View className="w-full mb-6">
          <YoutubeIframe
            videoId={movieSelected?.link}
            height={240}
            onReady={() => setVideoReady(true)}
            play={playing}
            initialPlayerParams={{ color: 'white', rel: false }}
            onFullScreenChange={onFullScreenChange}
            ref={playerRef}
            onChangeState={onStateChange}
          />

          <View className="px-4">
            <Text className="text-white text-2xl font-bold">{movieSelected?.title}</Text>

            <View className="flex-row items-end mt-4 mb-6">
              <Text className="text-white text-sm opacity-70">{movieSelected?.year}</Text>
              <Text className="text-white text-sm ml-4 opacity-70">{duration}</Text>
              <Text className="text-white text-sm ml-4 opacity-70">{movieSelected?.production}</Text>
            </View>

            <Text className="text-white text-base mt-2 font-semibold">Sinopse: </Text>

            <Text className="text-white text-base mt-2">
              {movieSelected?.description}
            </Text>

            <View className="flex-row items-end mt-4 mb-8">
              <Icon name='videocamera' color={'white'} size={22} />
              <Text className="text-white text-base ml-2">Diretor(a): {movieSelected?.director}</Text>
            </View>
            {
              user?.id && (
                <RateMovie value={rating} movieId={movieSelected?.id}/>
              )
            }

            {/* <PrimaryButton text={playing ? "Pausar" : "Assistir"} click={togglePlaying} /> */}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}