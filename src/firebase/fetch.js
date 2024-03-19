import app from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";

export const fetchData = async () => {
	const db = getDatabase(app);
	const dbRef = ref(db, "nannies");
	const snapshot = await get(dbRef);
	if (snapshot.exists()) {
		// setFruitArray(Object.values(snapshot.val()));
		console.log(snapshot.val());
	} else {
		alert("error");
	}
	return snapshot.val();
};
