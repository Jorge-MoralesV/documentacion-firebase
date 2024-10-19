import { doc, setDoc } from "firebase/firestore";
import { firestore } from "./credenciales";

export const createUserDocument = async (user) => {

    if (!user) return;

    const userRef = doc(firestore, "documentos", user.email);

    try {
        await setDoc(userRef, {
            tareas: []
        }, { merge: true });
    } catch (error) {
        console.error("Error al crear documento de usuario:", error);
    }
};