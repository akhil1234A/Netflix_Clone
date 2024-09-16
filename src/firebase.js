// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {addDoc, collection, getFirestore} from 'firebase/firestore'
import { toast } from "react-toastify";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMRnesDT8Jk7Mvh2kBkKG1CcTgRdUGMkY",
  authDomain: "netflix-clone-eb43f.firebaseapp.com",
  projectId: "netflix-clone-eb43f",
  storageBucket: "netflix-clone-eb43f.appspot.com",
  messagingSenderId: "1084640396404",
  appId: "1:1084640396404:web:6afcd782e94adae0147d21",
  measurementId: "G-W1VFV61BL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app) 

const signup = async(name,email,password)=>{
  try{
    const result = await createUserWithEmailAndPassword(auth,email,password);
    const user = result.user;
    await addDoc(collection(db,"user"),{
      uid:user.uid,
      name,
      authProvider:"local",
      email,
    })
    toast.success('Account created successfully!');
  }catch(error){ 
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));

  }
}

const login = async(email,password)=>{
 try{
  await signInWithEmailAndPassword(auth,email,password)
  toast.success('Signed in successfully!');
 }catch(error){
   console.log(error);
   toast.error(error.code.split('/')[1].split('-').join(" "));
 }  
}

const logout = ()=>{
  signOut(auth);
  toast.success('Logged out successfully!');
}

export {auth,db,login,signup,logout};