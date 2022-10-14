import { db } from "../firebase";
import {
collection,
addDoc,
updateDoc,
doc,
deleteDoc,
} from "firebase/firestore";
const addTodont = async ({ userId, title, description, status }) => {
try {
await addDoc(collection(db, "todont"), {
user: userId,
title: title,
description: description,
status: status,
createdAt: new Date().getTime(),
});
} catch (err) {}
};
const toggleTodontStatus = async ({ docId, status }) => {
try {
const todontRef = doc(db, "todont", docId);
await updateDoc(todontRef, {
status,
});
} catch (err) {
console.log(err);
}
};
const deleteTodont = async (docId) => {
try {
const todontRef = doc(db, "todont", docId);
await deleteDoc(todontRef);
} catch (err) {
console.log(err);
}
};
export { addTodont, toggleTodontStatus, deleteTodont };