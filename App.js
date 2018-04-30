import React from 'react';
import { StyleSheet, Text, View,FlatList,Card,CardItem , Button, Modal,TouchableHighlight, Alert,TextInput} from 'react-native';

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
      text:'',
      modalVisible: false,
    }
    this.itemRef = this.getRef().child('items');
  }

  _onPress = (key) => {
    this.itemRef.child(key).remove();
    
};

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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

     <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({text:''})
          }}>
          <View style={styles.container}>
            <View>
              <Text>New Item</Text>
              <TextInput
                value={this.state.text}
                placeholder='Text goes here'
                onChangeText = {(value) => this.setState({text:value})}
              />
              <TouchableHighlight
                onPress={() => {
                  this.itemRef.push({title: this.state.text})
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Save Item</Text>
              </TouchableHighlight>


              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Cancel</Text>
              </TouchableHighlight>

            </View>
          </View>
        </Modal>



       <Text> Hello </Text>
        <FlatList
          data={this.state.itemDataSource}
          renderItem={({item}) =>
           <TouchableHighlight
            onPress={() => this._onPress(item._key)}>
            <View>
            <Text style={{margin:10}}>{item.title}</Text>
            </View>
            </TouchableHighlight>
          }
          keyExtractor={(item, index) =>String(item._key)}
          />
          <Button 
            title="Add Item"
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            </Button>
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
