import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore, addDoc, query, where, orderBy, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, User, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import { Item } from '../../models/Item';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommentInterface } from '../../models/Comment';

const firebaseConfig = {
  // Firebase App Config
};

export class DoAquiFirebase {
  #db: Firestore
  #storage: FirebaseStorage

  constructor() {
    let initializedApps = getApps().filter(app => app.name === 'DoAqui');
    if(initializedApps.length == 0) {
      initializeApp(firebaseConfig);
    }

    this.#storage = getStorage(getApp());
    this.#db = getFirestore();
  }

  async getItems(): Promise<Item[]> {
    const itemsCollection = collection(this.#db, "items");

    // const q = query(itemsCollection, orderBy("timestamp", "asc"));

    // let snapshot = await getDocs(q);
    
    let snapshot = await getDocs(itemsCollection);
    let items: Item[] = [];
    for (let i = 0; i < snapshot.size; i++) {
      let doc = snapshot.docs[i];
      let params = doc.data();
      let imageRef = ref(this.#storage, "/" + params.imageRef);
      let imageUrl = await getDownloadURL(imageRef);
      let item = new Item(doc.id, params.title, params.description, params.localization, params.tags, imageUrl, params.userEmail, params.createdAt);
      items.push(item);
    }
    return items;
  }

  async getItemsWhere(field: string, comparison: string, value: string): Promise<Item[]> {
    const itemsCollection = collection(this.#db, "items");

    const q = query(itemsCollection, where(field, comparison, value));
    
    let snapshot = await getDocs(q);
    let items: Item[] = [];
    for (let i = 0; i < snapshot.size; i++) {
      let doc = snapshot.docs[i];
      let params = doc.data();
      let imageRef = ref(this.#storage, "/" + params.imageRef);
      let imageUrl = await getDownloadURL(imageRef);
      let item = new Item(doc.id, params.title, params.description, params.localization, params.tags, imageUrl, params.userEmail, params.createdAt);
      items.push(item);
    }
    return items;
  }

  async createItem(title: string, description: string, imageUrl: string, tags: string[], userEmail: string, long: number, lat: number): Promise<boolean> {
    const itemsCollection = collection(this.#db, "items");
    try {
      let imageRef = ref(this.#storage, imageUrl.substring(imageUrl.lastIndexOf("/") + 1));
      let img = await fetch(imageUrl);
      let bytes = await img.blob();
      await uploadBytes(imageRef, bytes, {contentType: "image/jpg"});

      title = title.trim();
      description = description.trim();
  
      let newItem = {
        title,
        description,
        tags,
        userEmail,
        createdAt: serverTimestamp(),
        imageRef: imageRef.name,
        localization: {
          longitude: long,
          latitude: lat
        }
      };
      await addDoc(itemsCollection, newItem);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async endDonation(id: string) {
    const commentsCollection = collection(this.#db, "comments");
    let docRef = doc(this.#db, "items", id);
    try {
      await deleteDoc(docRef);
      const q = query(commentsCollection, where("itemId", "==", id));
      
      let snapshot = await getDocs(q);
      for (let i = 0; i < snapshot.size; i++) {
        let document = snapshot.docs[i];
        docRef = doc(this.#db, "comments", document.id);
        await deleteDoc(docRef);
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  async createComment(content: string, userEmail: string, itemId: string): Promise<boolean> {
    const commentsCollection = collection(this.#db, "comments");

    try {
      content = content.trim();
  
      let newComment = {
        content,
        itemId,
        userEmail,
        createdAt: serverTimestamp()
      };
      await addDoc(commentsCollection, newComment);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  
  async getComments(itemId: string): Promise<CommentInterface[]> {
    const commentsCollection = collection(this.#db, "comments");

    const q = query(commentsCollection, where("itemId", "==", itemId));
    
    let snapshot = await getDocs(q);
    let comments: CommentInterface[] = [];
    for (let i = 0; i < snapshot.size; i++) {
      let doc = snapshot.docs[i];
      let params = doc.data();
      let comment: CommentInterface = {itemId: params.itemId, userEmail: params.userEmail, content: params.content, createdAt: params.createdAt};
      comments.push(comment);
    }
    return comments;
  }

  async registerUser(email: string, password: string): Promise<User | void> {
    try {
      const auth = getAuth();
      let credential = await createUserWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem('@doaquiUser', JSON.stringify(credential.user));
      return credential.user;
    } catch (error) {
      console.log(error);
    }
  }
  
  async logIn(email: string, password: string): Promise<User | void> {
    try {
      const auth = getAuth();
      let credential = await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem('@doaquiUser', JSON.stringify(credential.user));
      return credential.user;
    } catch (error) {
      console.log(error);
    }
  }

  async signOut() {
    const auth = getAuth();
    try {
      await signOut(auth)
      await AsyncStorage.removeItem("@doaquiUser");
    } catch (error) {
      return error;
    }
    return 0
  }
}
