import type { ReactNode } from "react";

export interface iAuthLayout {
    image: string;
    text?: string;
    form: ReactNode;
    carousel?: ReactNode;
}

export interface iImageLayer {
    background: string;
    overlay?: boolean;
}

export interface iImageBadge {
    isActive: boolean;
    onClick: () => void;
}

export interface iFormLayout {
    title?: string;
    forms?: ReactNode;
}

export interface iProtectedRoute {
    children: ReactNode;
}
