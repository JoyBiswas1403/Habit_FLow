import { useLocation } from "wouter";
import { useSyncExternalStore } from "react";

// returns the current hash location (minus the # symbol)
const currentLoc = () => window.location.hash.replace(/^#/, "") || "/";

const useHashLocation = () => {
    const location = useSyncExternalStore(
        (onChange) => {
            window.addEventListener("hashchange", onChange);
            return () => window.removeEventListener("hashchange", onChange);
        },
        () => currentLoc()
    );

    const navigate = (to: string) => {
        window.location.hash = to;
    };

    return [location, navigate];
};

export default useHashLocation;
