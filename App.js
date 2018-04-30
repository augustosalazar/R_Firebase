import React from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDbykhy44Gzio9gL39-4Lkxt9g-lDbvGCg",
  authDomain: "itemlister-a54b2.firebaseapp.com",
  databaseURL: "https://itemlister-a54b2.firebaseio.com",
  projectId: "itemlister-a54b2",
  storageBucket: "itemlister-a54b2.appspot.com",
  messagingSenderId: "228135842817"
} 

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {

    }
    this.itemRef = this.getRef().child('items');
  }

  getRef(){
    return firebaseApp.database().ref();
  }

  componentDidMount(){
    this.getItems(this.itemRef); 
  }

  getItems(itemRef){
    itemRef.on('value', (snap) => {
      let items = [];
      let count = 0;
      snap.forEach((child) => {
        items.push({
          key: count,
          title: child.val().title,
          _key: child.key
        })
        count++;
      });
      this.setState({
        itemDataSource: items
      })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Hello </Text>
        <FlatList
          data={this.state.itemDataSource}
          renderItem={({item}) =>
            <Text style={{margin:10}}> {item._key} {item.title}</Text>
          }
          keyExtractor={(item, index) =>String(item.key)}
          />
          <Text> Good Bye </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
