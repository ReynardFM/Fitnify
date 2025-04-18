import React, { useState, useEffect } from "react";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["600"] });

const header = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "30px",
    backdropFilter: "blur(5px)",
    backgroundColor: " rgba(255, 255, 255, 0.06)",
    borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
    position: "fixed",
    zIndex: "2",
    width: "100%",
}

const logo = {
    fontWeight: "600",
    fontSize: "30px",
    letterSpacing: "6px",
}

const headerNav = {
    display: "flex",
    flexDirection: "row",
}

export default function Header(){
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        // Only check localStorage, don't modify it here
        if(localStorage.getItem("Plan")) {
            setDisabled(false); // Enable button if Plan exists
        }
    }, []);

    const reset = () => {
        if(!disabled) {
            localStorage.removeItem("Plan");
            window.location.reload();
        }
    }

    return(
        <div style={header}>
            <h1 className={outfit.className} style={logo}>FITNIFY™</h1>
            <nav style={headerNav}>   
                <a 
                    href="#" 
                    className={`headerButton ${outfit.className}`}
                    onClick={(e) => {
                        e.preventDefault();
                        reset();
                    }}
                    style={{
                        pointerEvents: disabled ? 'none' : 'auto',
                        opacity: disabled ? 0.5 : 1,
                        cursor: disabled ? 'default' : 'pointer'
                    }}
                >
                    RESET
                </a>
            </nav>
        </div>
    );
};