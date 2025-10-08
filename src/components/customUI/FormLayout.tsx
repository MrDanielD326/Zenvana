import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { FC } from "react";
import type { iFormLayout } from "@/types/types";
import { ROUTES } from "@/utils/constants";

const FormLayout: FC<iFormLayout> = ({ title, forms }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navSignup = () => navigate(ROUTES.SIGNUP);
    const navLogin = () => navigate(ROUTES.LOGIN);

    return (
        <div className="max-w-md w-full text-center px-6">
            <Card className="w-full max-w-sm border-transparent shadow-none">
                <CardHeader>
                    <CardTitle className="flex flex-col items-center text-center">
                        <span
                            className={`font-bold ${location.pathname === "/"
                                ? "text-2xl sm:text-3xl md:text-4xl text-primary"
                                : "text-xl"
                                }`}
                        >
                            {location.pathname === "/" ? "Welcome to" : title}
                        </span>
                        {location.pathname === ROUTES.HOME && (
                            <img
                                src="/brandTitle.svg"
                                alt="Brand Title"
                                className="h-12 sm:h-16 md:h-20 w-auto"
                            />
                        )}
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-8 w-full max-h-[80vh] overflow-y-auto">
                    {location.pathname === ROUTES.HOME ? (
                        <>
                            <Button type="button" className="w-full" onClick={navSignup}>
                                Gym Owner - Sign Up
                            </Button>
                            <Button type="button" className="w-full" onClick={navLogin} variant="ghost">
                                Log in
                            </Button>
                        </>
                    ) : forms}
                </CardContent>
            </Card>
        </div>
    );
};

export default FormLayout;
