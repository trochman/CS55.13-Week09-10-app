import { db } from "../firebase";
import {
collection,
addDoc,
updateDoc,
doc,
deleteDoc,
} from "firebase/firestore";
const addContacts = async ({ userId, title, description, status }) => {
try {
await addDoc(collection(db, "contacts"), {
user: userId,
title: title,
description: description,
status: status,
createdAt: new Date().getTime(),
});
} catch (err) {}
};
const toggleContactsStatus = async ({ docId, status }) => {
try {
const contactsRef = doc(db, "contacts", docId);
await updateDoc(contactsRef, {
status,
});
} catch (err) {
console.log(err);
}
};
const deleteContacts = async (docId) => {
try {
const contactsRef = doc(db, "contacts", docId);
await deleteDoc(contactsRef);
} catch (err) {
console.log(err);
}
};
export { addContacts, toggleContactsStatus, deleteContacts };