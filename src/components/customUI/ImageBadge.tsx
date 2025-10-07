import { Badge } from "@/components/ui/badge";
import type { iImageBadge } from "@/types/types";

const ImageBadge = ({ isActive, onClick }: iImageBadge) => {
    return (
        <Badge
            onClick={onClick}
            className={`w-4 h-4 p-0 rounded-full cursor-pointer flex items-center justify-center ${isActive ? "bg-green-500" : "bg-white"
                }`}
        >
            &nbsp;
        </Badge>
    );
};

export default ImageBadge;
