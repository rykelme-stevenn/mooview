import React, { useEffect, useMemo, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { IGenre, IMovie } from "./types/movie";
import { Movie } from "./Movie";
import { useNavigation } from "@react-navigation/native";
import { Heading } from "./Heading";
import { getCategories } from "./server/movie";
import { Loading } from "./Loading";
import { LoginCard } from "./LoginCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const Category = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const [refreshing, setRefreshingControl] = useState(false);
  const [progress, setProgress] = useState(0);
  const [categories, setCategories] = useState<Array<IGenre>>()
  const [loading, setLoading] = useState(false)
  const [userConfig, setUserConfig] = useState() 
  const navigation = useNavigation<any>();
  let lastScroll = 0

  useEffect(() => {
    console.log(user)
  }, [user])
  useMemo(() => {
    console.log(user)
    getCategoriesList()
  }, [])

  async function getCategoriesList() {
    console.log('x')
    setLoading(true)
    let response = await getCategories().finally(() => {
      setLoading(false)
    })
    setCategories(response.data)
  }

  const pullMe = () => {
    setRefreshingControl(true)
    getCategoriesList()
    setRefreshingControl(false)
  }

  function renderItem(item: any) {
    if(!item?.accept){return} 
    else if (item?.image) return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Movie', {
            movieSelected: item
          })
        }}
      >
        <Movie
          image={`${item.image.replace('image/upload/', '')}`}
        />
      </TouchableOpacity>
    )
    return <View></View>
  };

  function Movies(category: any) {
    return (
      <View className="mb-4">
        {category?.movies?.length > 0 && (
          <>
            <Text className="text-white text-xl font-bold">{category?.name}</Text>
            <FlatList
              data={category.movies}
              renderItem={(movie) => renderItem(movie.item)}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
            />
          </>
        )
        }
      </View>
    )
  }

  return (
    <View>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }}>
        <Heading progress={progress} />
      </View>
      {

        !loading ? (
          <View className="px-4">
            {/* <View className="h-24 bg-opacity-100"></View> */}
            {categories && (
              <FlatList
                data={categories}
                ListHeaderComponent={<View className="h-28"></View>}
                ListFooterComponent={!user?.id ? <View className="h-20"></View> : <></>}
                renderItem={(category: any) => Movies(category.item)}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                  <RefreshControl
                    style={{ position: 'absolute', top: 100, zIndex: 2 }}
                    refreshing={refreshing}
                    onRefresh={() => pullMe()}
                  />
                }

                onScroll={
                  (event) => {
                    const offsetY = event.nativeEvent.contentOffset.y;
                    let scroll = offsetY
                    if (offsetY < 20) {
                      setProgress(0)
                    }
                    else {
                      setProgress(progress + (scroll > lastScroll ? (offsetY / 2000) : (-offsetY / 1000)))
                    }
                    lastScroll = offsetY
                  }
                }
              />
            )}
            {
              !user?.id && (
              <LoginCard/>
              )
            }
          </View>
        ) : (
          <View className=" h-full w-full items-center justify-center px-6">
            <Loading />
          </View>
        )
      }
    </View>
  );
};
