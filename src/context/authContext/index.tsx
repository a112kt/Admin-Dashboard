"use client";
import { createContext } from "react";
import { useState, useEffect } from "react";


export type AuthContextType = {
    step: number;
    setStep: (step: number) => void;
    email: string;
    setEmail: (email: string) => void;
    user: any;
    setUser: (user: any) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    verificationErrorState: boolean;
    setVerificationErrorState: (verificationErrorState: boolean) => void;
    verificationTimer: number;
    setVerificationTimer: (verificationTimer: number) => void;
    roles: string[] | null;
    setRoles: (roles: string[] | null) => void;
    initialized: boolean;
    setInitialized: (initialized: boolean) => void;
    brandStatus: string | null;
    setBrandStatus: (status: string | null) => void;
    resetRegistration: () => void;
};
export const AuthContext = createContext<AuthContextType>({
    step: 1,
    setStep: (step: number) => { },
    email: "",
    setEmail: (email: string) => { },
    user: null,
    setUser: (user: any) => { },
    token: null,
    setToken: (token: string | null) => { },
    verificationErrorState: false,
    setVerificationErrorState: (verificationErrorState: boolean) => { },
    verificationTimer: 60,
    setVerificationTimer: (verificationTimer: number) => { },
    roles: [],
    setRoles: (roles: string[] | null) => { },
    initialized: false,
    setInitialized: (initialized: boolean) => { },
    brandStatus: null,
    setBrandStatus: (status: string | null) => { },
    resetRegistration: () => { },
});



export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [verificationErrorState, setVerificationErrorState] = useState(false);
    const [verificationTimer, setVerificationTimer] = useState(60);
    const [roles, setRoles] = useState<string[] | null>(null);
    const [initialized, setInitialized] = useState(false);
    const [brandStatus, setBrandStatus] = useState<string | null>(null);

    // Load from localStorage on mount
    useEffect(() => {
        const storedStep = localStorage.getItem("step");
        if (storedStep) setStep(parseInt(storedStep));

        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));

        const storedToken = localStorage.getItem("BrandToken");
        if (storedToken) setToken(storedToken);

        const storedVerificationError = localStorage.getItem("verificationErrorState");
        if (storedVerificationError) setVerificationErrorState(JSON.parse(storedVerificationError));

        const storedEmail = localStorage.getItem("email");
        if (storedEmail) setEmail(storedEmail);

        const storedRoles = localStorage.getItem("AlluvoRole");
        if (storedRoles) {
            try {
                setRoles(JSON.parse(storedRoles) as string[]);
            } catch {
                localStorage.removeItem("AlluvoRole");
            }
        }

        const storedBrandStatus = localStorage.getItem("BrandStatus");
        if (storedBrandStatus) setBrandStatus(storedBrandStatus);

        setInitialized(true);
    }, []);

    const resetRegistration = () => {
        localStorage.removeItem("step");
        localStorage.removeItem("user");
        localStorage.removeItem("BrandToken");
        localStorage.removeItem("verificationErrorState");
        localStorage.removeItem("email");
        localStorage.removeItem("AlluvoRole");
        localStorage.removeItem("BrandStatus");
        setStep(1);
        setEmail("");
        setUser(null);
        setToken(null);
        setVerificationErrorState(false);
        setVerificationTimer(60);
        setRoles(null);
        setBrandStatus(null);
    };

    const value: AuthContextType = { step, setStep, email, setEmail, user, setUser, token, setToken, verificationErrorState, setVerificationErrorState, verificationTimer, setVerificationTimer, roles, setRoles, initialized, setInitialized, brandStatus, setBrandStatus, resetRegistration };


    useEffect(() => {
        localStorage.setItem("step", step.toString());
        localStorage.setItem("user", JSON.stringify(user));
        if (!token) {
            localStorage.removeItem("BrandToken");
        } else {
            localStorage.setItem("BrandToken", token);
        }
        localStorage.setItem("verificationErrorState", verificationErrorState.toString());
        localStorage.setItem("email", email);
        if (!roles) {
            localStorage.removeItem("AlluvoRole");
        } else {
            localStorage.setItem("AlluvoRole", JSON.stringify(roles));
        }
    }, [step, user, token, verificationErrorState, email, roles, brandStatus]);

    useEffect(() => {
        if (!brandStatus) {
            localStorage.removeItem("BrandStatus");
        } else {
            localStorage.setItem("BrandStatus", brandStatus);
        }
    }, [brandStatus]);
    useEffect(() => {
        setVerificationTimer(59);
    }, [verificationErrorState]);



    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}
