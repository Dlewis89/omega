import {db} from './config'
import { setDoc, doc, getDoc, getDocs, addDoc, collection, query, where, orderBy, arrayUnion, Timestamp} from "firebase/firestore"; 
import { GoogleAuthProvider, getRedirectResult } from "firebase/auth";

export const addPost = (uid, post, callback)=> {
    // db.collection("posts").add(post)
    addDoc(collection(db, "posts"), post)
    .then((res) => {
        console.log("success, post has been added", res.id)
        callback()
        updateRecentPosts(uid, post, res.id)
    })
    .catch(err => {
        console.error("Error adding document", err)
    })
}
export const updateRecentPosts = (uid ,post, postId)=> {
    setDoc(doc(db, "followers", uid), {
        recentPosts: arrayUnion({...post, postId: postId}),
        lastPost: Timestamp.now(),
        uid: uid
    }, {merge: true})
      .then((res) => {
          console.log("success, post has been added to recent posts", res)
      })
      .catch(err => {
          console.error("Error adding document", err)
      })
  }
export const fetchPostsByUserId = async (uid, setPosts) => {
    try {
        const q = query(collection(db, "posts"), where("uid", "==", uid), orderBy("createdAt", "desc"))
        const querySnapshot = await getDocs(q);
        let postsArray = []
        querySnapshot.forEach((doc) => {
            postsArray.push(doc.data())
        })
        setPosts(postsArray)
    }
    catch(err) {
        console.log(err.message)
    }
}

export const fetchRecentPosts = async (uid)=> {
    try {
        const q = query(collection(db, "followers"), 
        where("followerList", "array-contains", uid), 
        orderBy("lastPost", "desc"))
        const querySnapshot = await getDocs(q)
        let postsArray = []
        querySnapshot.forEach((doc) => {
            postsArray.push(doc.data())
        })
        console.log("RECENT POSTS ==============>", postsArray)        
    }
    catch(err) {
        console.log(err.message)
    }

}

// export const _fetchPostsByUserId = async (uid, posts, setPosts) => {
//     // let postsArray = []
//     try {
//         const q = query(collection(db, "posts"), where("uid", "==", uid), orderBy("createdAt", "desc"))
//         const querySnapshot = await onSnapshot(q, (snapShot)=> {
//             snapShot.forEach(post => {
//                 // console.log(post.data())
//                 setPosts([...posts, post.data()])
//             //    return post.type === "added" ? setPosts([...posts, post.data()]) : null
//             })
//         })
//         return querySnapshot
//     }
//     catch(err) {
//         console.log(err.message)
//     }
//     // querySnapshot.forEach((doc) => {
//     //     postsArray.push(doc.data())
//     // // doc.data() is never undefined for query doc snapshots
//     // // console.log(doc.id, " => ", doc.data());
//     // })
//     // setPosts(postsArray)
// }



export const updateUser = (user)=> {
  setDoc(doc(db, "users", user.uid), user)
    .then(() => {
        console.log("success, user has been added", user.uid)
        window.location.reload()
    })
    .catch(err => {
        console.error("Error adding document", err)
    })
}
export const addUser = (user, setError)=> {
    setDoc(doc(db, "users", user.uid), user)
      .then(() => {
          console.log("success, user has been added", user.uid)
          setError("")
      })
      .catch(err => {
          console.error("Error adding document", err)
          setError(err.message)
      })
  }
export const addUserFromRedirectResult = (auth)=> {
    getRedirectResult(auth)
    .then((result) => {
     const token = GoogleAuthProvider.credentialFromResult(result)?.accessToken
     const user = result.user;
     addUser(user)
     console.log('user', user)
     console.log("token", token)
   }).catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     const email = error.customData.email;
     const credential = GoogleAuthProvider.credentialFromError(error);
     console.log(errorCode, errorMessage, email, credential)
     alert(error)
   });
}


export const getUserById = user => {
    console.log("get users by ID", user)
    return getDoc(doc(db, "users", user.uid))
        .then(res => {
            console.log("users document data", res.data())
            return res.data()
        })
        .catch(err => console.log("Error getting document:", err))
}

export const fetchUser = uid => {
  return getDoc(doc(db, "users", uid))
    .then(res => {
      console.log("users document data", res.data())
      return res.data()
    })
    .catch(err => console.log("Error getting document:", err))
}