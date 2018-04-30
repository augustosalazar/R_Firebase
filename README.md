
Steps

1. install firebase
    npm install firebase --save

2. Include firebase
    import * as firebase from 'firebase';

3. Add config from "Add firebase to web app" on the firebase console
    const firebaseConfig = {
    apiKey: "AIzaSyDbykhy44Gzio9gL39-4Lkxt9g-lDbvGCg",
    authDomain: "itemlister-a54b2.firebaseapp.com",
    databaseURL: "https://itemlister-a54b2.firebaseio.com",
    projectId: "itemlister-a54b2",
    storageBucket: "itemlister-a54b2.appspot.com",
    messagingSenderId: "228135842817"
    } 

4. Intialize the firebase
    const firebaseApp = firebase.initializeApp(firebaseConfig);

5. Get firebase reference
    getRef(){
        return firebaseApp.database().ref();
    }

6. On the constructor get the reference
    this.itemRef = this.getRef().child('items');

7. Get Items and store them on array

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

8. Call getItems
    componentDidMount(){
        this.getItems(this.itemRef); 
    }

9. To add new item
    this.itemRef.push({title: this.state.text})

10. To delete
    this.itemRef.child(key).remove();