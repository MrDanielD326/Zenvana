import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';

export const LoginSSO = () => {
    const navigate = useNavigate();

    const googleIcon = <img src="buttonGoogle.svg" alt="Google Icon" className="w-4 h-4" />;

    return (
        <>
            <SignedOut>
                <SignInButton mode="modal" forceRedirectUrl={ROUTES.LEAD_MANAGEMENT}>
                    <Button variant="outline" className="cursor-pointer">
                        {googleIcon} Continue with Google
                    </Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <Button variant="outline" onClick={() => navigate(ROUTES.LEAD_MANAGEMENT)} className="cursor-pointer">
                    {googleIcon} Go to Lead Management
                </Button>
            </SignedIn>
        </>
    );
};

export const LogoutSSO = () => {
    const { user, isLoaded } = useUser();

    return (
        <div className="flex items-center gap-3">
            <SignedIn> <UserButton /> </SignedIn>
            <p className="text-sm font-medium text-gray-800 truncate">
                {isLoaded && user ? user.fullName : 'Loading...'}
            </p>
        </div>
    );
};
