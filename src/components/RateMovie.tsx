import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { getRating, postRating, putRating } from "./server/rate";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface Props {
  value: number,
  movieId: number
}

export const RateMovie: React.FC<Props> = ({ value, movieId }) => {
  const user = useSelector((state: RootState) => state.user.user)
  const [rating, setRating] = useState<number | undefined>(value)
  const [loading, setLoading] = useState(false)
  const starsValue = [1, 2, 3, 4, 5]

  useEffect(() => {
    getRatingvalue()
  }, [])

  async function saveRating(ratingValue: number) {
    if (user?.id) {
      let data = {
        rating: ratingValue,
        user: user?.id,
        movie: movieId
      }
      const req = await postRating(data)
    } else { setRating(undefined) }
  }

  async function editRating(ratingValue: number) {
    if (user?.id) {
      let data = {
        rating: ratingValue
      }
      const req = await putRating(data, movieId, user.id)
    } else { setRating(undefined) }
  }

  function rate(index: number) {
    if (rating === undefined) {
      setRating(index + 1)
      saveRating(index + 1)
    } else {
      console.log('edit')
      setRating(index + 1)
      editRating(index + 1)
    }
  }

  async function getRatingvalue() {
    setLoading(true)
    const rating = await getRating(movieId, user?.id).finally(() => {
      setLoading(false)
    })
    console.log('value api', rating)
    setRating(rating.rating)
  }



  return (
    <View className="items-center mb-6 bg-subgrey py-4 rounded-lg">
      {
        !loading ? (
          <>
            <Text className="text-white mb-4 font-medium">Avalie o filme <Text className="text-white font-bold">{user?.username}</Text></Text>
            <View className="flex-row">
              {
                starsValue.map(function (nome, i) {
                  return (
                    <View>
                      {
                        (rating && rating >= (i + 1)) ? (
                          <Icon name='star' color={'white'} size={45} onPress={() => rate(i)} />
                        ) :
                          (
                            <Icon name='staro' color={'white'} size={45} onPress={() => rate(i)} />
                          )
                      }
                    </View>
                  )
                })
              }
            </View>
          </>
        ) : (
          <ActivityIndicator size="large" color="white" />
        )
      }
    </View>
  )
}