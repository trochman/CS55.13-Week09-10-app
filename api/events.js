import { db } from "../firebase";
import {
collection,
addDoc,
updateDoc,
doc,
deleteDoc,
} from "firebase/firestore";
const addEvents = async ({ userId, title, description, status }) => {
try {
await addDoc(collection(db, "events"), {
user: userId,
title: title,
description: description,
status: status,
createdAt: new Date().getTime(),
});
} catch (err) {}
};
const toggleEventsStatus = async ({ docId, status }) => {
try {
const eventsRef = doc(db, "events", docId);
await updateDoc(eventsRef, {
status,
});
} catch (err) {
console.log(err);
}
};
const deleteEvents = async (docId) => {
try {
const eventsRef = doc(db, "events", docId);
await deleteDoc(eventsRef);
} catch (err) {
console.log(err);
}
};
export { addEvents, toggleEventsStatus, deleteEvents };