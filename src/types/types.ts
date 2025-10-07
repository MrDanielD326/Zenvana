import type { ReactNode } from "react";

export interface iAuthLayout {
    image: any;
    text?: string;
    form: ReactNode;
    carousel?: any;
}

export interface iImageLayer {
    background: string;
    overlay?: boolean
}

export interface iImageBadge {
    isActive: boolean;
    onClick: () => void;
}

export interface iFormLayout {
    title?: string;
    forms?: any;
}

export interface iAdminLayout {
    children: any
}