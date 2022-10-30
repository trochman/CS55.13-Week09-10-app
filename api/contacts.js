import { db } from "../firebase";
import {
collection,
addDoc,
updateDoc,
doc,
deleteDoc,
} from "firebase/firestore";
const addContacts = async ({ userId, contactName, description, contactAdress, contactRelation }) => {
try {
await addDoc(collection(db, "contacts"), {
user: userId,
name: contactName,
description: description,
adress: contactAdress,
relation: contactRelation,
createdAt: new Date().getTime(),
});
} catch (err) {}
};
const deleteContacts = async (docId) => {
try {
const contactsRef = doc(db, "contacts", docId);
await deleteDoc(contactsRef);
} catch (err) {
console.log(err);
}
};
export { addContacts, deleteContacts };