import { useRef } from "react";
import useOnClickOutside from "../../Hooks/useOnClickOutside.jsx";

function PopoverDropdown({ children, dropdownOpen, setdropdownOpen }) {
    const ref = useRef();

    useOnClickOutside(ref, (e) => {
        if (dropdownOpen) setdropdownOpen((prev) => !prev);
    });

    return (
        <>
            <div
                className="flex items-center gap-2 justify-center hover:cursor-pointer"
                ref={ref}
                onClick={() => setdropdownOpen((prev) => !prev)}
            >
                {children}
            </div>
        </>
    );
}

export default PopoverDropdown;
