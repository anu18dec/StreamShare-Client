import { useRef } from "react";
import UseOnClickOutside from "../../Hooks/UseOnClickOutside.jsx";

function PopoverDropdown({ children, dropdownOpen, setdropdownOpen }) {
    const ref = useRef();

    UseOnClickOutside(ref, (e) => {
        if (dropdownOpen) setdropdownOpen((prev) => !prev);
    });

    return (
        <>
            <div
                className="flex items-center gap-2 justify-center "
                ref={ref}
                onClick={() => setdropdownOpen((prev) => !prev)}
            >
                {children}
            </div>
        </>
    );
}

export default PopoverDropdown;
