import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../credenciales";
import { createUserDocument } from "../firebaseService";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUp = async (email, password) => {
        const userCredencial = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredencial.user;
        await createUserDocument(user);
    }

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

    const logout = () => signOut(auth);

    const resetPassword = (email) => sendPasswordResetEmail(auth, email)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe()
    }, []);

    return (
        <AuthContext.Provider value={{ signUp, login, user, logout, loading, resetPassword }}>
            {children}
        </AuthContext.Provider>
    )

}