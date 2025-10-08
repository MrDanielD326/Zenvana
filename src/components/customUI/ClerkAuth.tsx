import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const LoginSSO = () => {
    const navigate = useNavigate();

    const navLead = () => {
        navigate('/leadManagement');
    };

    const googleIcon = <img src="buttonGoogle.svg" alt="Google Icon" className="w-4 h-4" />;

    return (
        <SignedOut>
            <SignInButton>
                <Button variant="outline" onClick={navLead} className="cursor-pointer">
                    {googleIcon} Continue with Google
                </Button>
            </SignInButton>
        </SignedOut>
    );
};

export const LogoutSSO = () => {
    const { user, isLoaded } = useUser();

    return (
        <div className="flex items-center gap-3">
            <SignedIn>
                <UserButton />
            </SignedIn>
            <p className="text-sm font-medium text-gray-800 truncate">
                {isLoaded && user ? user.fullName : 'Loading...'}
            </p>
        </div>
    );
};
