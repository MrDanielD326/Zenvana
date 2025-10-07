import type { FC } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import type { iAuthLayout, iImageLayer } from "@/types/types";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ImageLayer = ({ background, overlay = false }: iImageLayer) => {
    const location = useLocation();
    const isMobile = useIsMobile();

    return (
        <>
            <img
                src={background}
                alt={`${background} image`}
                aria-hidden={overlay ? "true" : undefined}
                className={`w-full h-full object-cover ${overlay ? "absolute inset-0 brightness-75 z-[-1000]" : ""}`}
            />

            {location.pathname !== "/" && (
                <div className={isMobile
                    ? "absolute top-12 left-1/2 -translate-x-1/2"
                    : "absolute inset-0 flex items-center justify-center"
                }>
                    <img src={isMobile ? "brandTitle.svg" : "brandLogo.svg"} alt="Brand Title" />
                </div>
            )}
        </>
    );
};

const AuthLayout: FC<iAuthLayout> = ({ image, text, form, carousel }) => {
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const location = useLocation();

    const imageSrc = typeof image === "string" ? image.replaceAll("\\", "/").replace(/^(?!https?:\/\/|data:|blob:|\/)/, "/") : image;

    return (
        <div className="min-h-screen flex relative">
            <div className="hidden md:flex md:w-1/2 relative h-screen">

                {location.pathname !== "/" && (
                    <ArrowLeft onClick={() => navigate("/")} className="absolute top-4 left-4 z-30 cursor-pointer w-6 h-6" />
                )}

                <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-20 w-4/5">
                    <p className="text-white font-medium drop-shadow-lg text-2xl"> {text} </p>
                </div>

                <ImageLayer background={imageSrc} />

                {carousel && <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-2 z-30"> {carousel} </div>}
            </div>

            {isMobile && <ImageLayer background={imageSrc} overlay />}

            <div className="flex w-full md:w-1/2 justify-center items-center relative z-10 bg-transparent md:bg-white">
                <div className="max-w-md w-full text-center px-6"> {form} </div>
            </div>
        </div>
    );
};

export default AuthLayout;
