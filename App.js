/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import store from './store';

import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchUsers, fetchFromLocal } from './reducers/apiReducer'
import { useDispatch } from 'react-redux'

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};

const Component = () => {
  const dispatch = useDispatch()

  const [search, setSearch] = useState(0);

  const fetchMore = () => {
    dispatch(fetchFromLocal())
  }

  const setAnimeValue = (anime) => {
    setSearch(anime)
    searchAnime()
  }


  const searchAnime = () => {
    dispatch(fetchUsers(search))
  }

  const createList = ({ item }) => {
    return (
      <View style={styles.cardView}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'cover',
          }}
          source={{
            uri: item.image_url,
          }}
        />
        <Text style={{ width: 100, textAlign: 'center' }}>{item.title}</Text>
      </View>
    )
  }
  const animeData = useSelector(state => state.data)
  return (
    <View style={styles.body}>
      <SafeAreaView >
        <View style={styles.searchBar}>
          <TextInput style={styles.input} placeholderTextColor={Colors.lighter} placeholder="Type Anime Name" onChangeText={text => setAnimeValue(text)} />
          <TouchableOpacity style={styles.button} onPress={() => searchAnime()}>
            <View >
              <Text style={{ padding: 5, fontSize: 16, color: 'white' }}>
                Go
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{
          height: '85%',
          marginVertical: 10,
          padding: 5
        }}>
          {animeData.scrollList.length == 0 && <Text style={{ padding: 5, fontSize: 16, color: 'white' }}>
            {animeData.error}</Text>}
          {animeData.scrollList.length != 0 &&
            <SafeAreaView style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
              <FlatList
                numColumns={3}
                data={animeData.scrollList}
                renderItem={createList}
                keyExtractor={item => item.mal_id.toString()}
              />
            </SafeAreaView>
          }
        </View>
        {animeData.loadMore && <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.loadButton} onPress={() => fetchMore()}>
            <View >
              <Text style={{ padding: 5, fontSize: 16, color: 'white' }}>
                More
              </Text>
            </View>
          </TouchableOpacity>
        </View>}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#1b77c1",
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 25
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  input: {
    borderColor: Colors.lighter,
    borderRadius: 5,
    borderWidth: 1,
    color: Colors.lighter,
    width: '80%'
  },
  searchBar: {
    flexDirection: 'row',
  },
  button: {
    width: '20%',
    borderColor: Colors.lighter,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 10
  },
  loadMore: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b77c1',
    paddingVertical: 10,
    borderRadius: 5,
  },
  loadButton: {
    width: '20%',
    alignItems: "center",
    paddingVertical: 10,
    alignSelf: 'center'
  },
  cardView: {
    flexDirection: 'column', margin: 5,
    backgroundColor: Colors.lighter,
    borderColor: Colors.lighter,
    borderRadius: 10,
    borderWidth: 1,
    color: Colors.lighter,
  }
});

export default App;