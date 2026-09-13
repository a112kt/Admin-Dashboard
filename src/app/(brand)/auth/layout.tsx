import GuestGuardLayout from "@/app/guards/guestGuradLayout";


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <GuestGuardLayout>
            {children}
        </GuestGuardLayout>
    );

}
