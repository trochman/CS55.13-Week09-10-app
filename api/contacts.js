import { db } from "../firebase";
import {
collection,
addDoc,
updateDoc,
doc,
deleteDoc,
} from "firebase/firestore";
const addContacts = async ({ userId, contactName, description, contactAdress, contactRelation, status }) => {
try {
await addDoc(collection(db, "contacts"), {
user: userId,
name: contactName,
description: description,
adress: contactAdress,
relation: contactRelation,
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