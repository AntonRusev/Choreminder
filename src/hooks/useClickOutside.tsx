import { useEffect, useRef } from "react";

export const useClickOutside = (handler: any) => {
    const domNode = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const innerHandler = (e: any) => {
            if (domNode.current) {
                if (!domNode.current.contains(e.target)) {
                    handler();
                };
            };
        };

        document.addEventListener("mousedown", innerHandler);

        return () => {
            document.removeEventListener("mousedown", innerHandler);
        };
    });

    return domNode;
};