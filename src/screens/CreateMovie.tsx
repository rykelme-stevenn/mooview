import { Controller, useForm } from "react-hook-form";
import { View, StyleSheet, Text, Button, Image, ScrollView } from "react-native";
import { IMovie } from "../components/types/movie";
import { Input } from "../components/Input";
import RNPickerSelect from 'react-native-picker-select';
import { useEffect, useMemo, useState } from "react";
import { getOnlyCategories } from "../components/server/movie";
import Icon from "react-native-vector-icons/AntDesign";
import * as ImagePicker from 'expo-image-picker';
import { PrimaryButton } from "../components/PrimaryButton";
import { requireMovie } from '../components/server/movie';
import axios from 'axios';

export const CreateMovie = () => {
  const { control, register, handleSubmit, formState: { errors }, setError, getValues } = useForm<IMovie>();
  const [genres, setGenres] = useState<Array<any>>([]);
  const [image, setImage] = useState<any>(null);

  useMemo(() => {
    getGenres();
  }, []);

  useEffect(() => {
    const formData = getValues();
    console.log(errors, formData);
  }, [errors]);

  async function getGenres() {
    let response: Array<any> = await getOnlyCategories();
    setGenres(response);
  }

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true
    });

    console.log(result);
    if (!result.cancelled) {
      setImage(result.assets[0]);
    }
  };

  const uploadImageToCloudinary = async (uri: any) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'image/jpeg', // ou 'image/png'
      name: 'upload.jpg',
    });
    formData.append('upload_preset', 'None'); // substitua pelo seu upload preset
    formData.append('cloud_name', 'ddnk5aamu'); // substitua pelo seu cloud name

    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/ddnk5aamu/image/upload`, formData);
      console.log(response)
      return response.data.secure_url; // link da imagem
    } catch (error) {
      console.error('Erro ao fazer upload da imagem para o Cloudinary:', error);
      return null;
    }
  };

  const saveMovie = async () => {
    const formData = getValues();

    let imageUrl = null;
    console.log('a',image)
    if (image) {
      imageUrl = await uploadImageToCloudinary(image.uri);
    }

    const movieData = {
      title: formData.title,
      description: formData.description,
      director: formData.director,
      link: await extractYouTubeID(formData.link),
      production: formData.production,
      genre: formData.genre,
      image: imageUrl,
      poster: 'abcd',
      year: formData.year
    };

    // let response = await requireMovie(movieData);
    console.log('X', imageUrl, formData, movieData);
  };

  const extractYouTubeID = (url: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|(?:youtu\.be\/))([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    console.log('match', match);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <ScrollView className="bg-black h-full">
      <Controller
        control={control}
        name="title"
        rules={{
          required: 'Informe o título do filme',
          maxLength: 50
        }}
        render={({ field: { onChange, value } }) => <Input placeholder="Insira o título do filme"
          label="Título"
          onChangeText={onChange}
          value={value}
          error={errors?.title?.message} />}
      />

      <Controller
        control={control}
        name="description"
        rules={{
          required: 'Informe a descrição/sinópse',
          maxLength: 200
        }}
        render={({ field: { onChange, value } }) => <Input placeholder="Insira a descrição/sinópse do filme"
          label="Descrição"
          onChangeText={onChange}
          value={value}
          error={errors?.description?.message} />}
      />

      <Controller
        control={control}
        name="year"
        rules={{
          required: 'Informe o ano de lançamento do filme',
          min: 1880
        }}
        render={({ field: { onChange, value } }) => <Input placeholder="Insira o ano de lançamento do filme"
          label="Ano"
          onChangeText={onChange}
          value={value}
          error={errors?.year?.message} />}
      />

      <Controller
        control={control}
        name="director"
        rules={{
          required: 'Informe o diretor(a) do filme',
          maxLength: 100
        }}
        render={({ field: { onChange, value } }) => <Input placeholder="Insira o nome do diretor(a) do filme"
          label="Diretor(a)"
          onChangeText={onChange}
          value={value}
          error={errors?.director?.message} />}
      />

      <Controller
        control={control}
        name="link"
        rules={{
          required: 'Informe o link do vídeo',
          maxLength: 80
        }}
        render={({ field: { onChange, value } }) => <Input placeholder="Insira o link do youtube do filme"
          label="Link"
          onChangeText={onChange}
          value={value}
          error={errors?.link?.message} />}
      />

      <Controller
        control={control}
        name="production"
        rules={{
          required: 'Informe o país de origem do filme',
          maxLength: 20
        }}
        render={({ field: { onChange, value } }) => <Input placeholder="Insira o país de origem do filme"
          label="País de origem"
          onChangeText={onChange}
          value={value}
          error={errors?.production?.message} />}
      />

      <Text className="self-start text-white text-base py-2 mt-6">Gênero</Text>
      <Controller
        control={control}
        name="genre"
        rules={{
          required: 'Informe o gênero do filme',
          maxLength: 20
        }}
        render={({ field: { onChange, value } }) => <RNPickerSelect
          Icon={() => <Icon name='down' color={'white'} size={24} />}
          useNativeAndroidPickerStyle={false}
          onValueChange={(value) => onChange(value)}
          items={genres.map(item => ({
            label: item.name,
            value: item.id
          }))}
          style={{
            inputIOS: styles.inputIOS,
            inputAndroid: styles.inputAndroid,
            iconContainer: styles.iconContainer,
          }}
          value={value}
          placeholder={{ label: 'Selecione o gênero', value: null }}
        />}
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button className="h-12 rounded-lg mt-4" title="Escolher da galeria" onPress={pickImage} />
        {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
      </View>
      <View>
        <PrimaryButton text="Salvar" click={handleSubmit(saveMovie)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 8,
    color: '#C0C0C0',
    paddingRight: 30,
    backgroundColor: '#374657',
  },
  inputAndroid: {
    fontSize: 18,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 8,
    color: '#C0C0C0',
    paddingRight: 30,
    backgroundColor: '#374657',
  },
  iconContainer: {
    top: '50%',
    transform: [{ translateY: -12 }],
    right: 15,
  }
});
