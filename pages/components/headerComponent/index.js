import React from "react";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["600"] });

const header = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "30px",
    backdropFilter: "blur(5px)",
    backgroundColor: " rgba(255, 255, 255, 0.06)",
    borderBottom: "2px solid rgba(255, 255, 255, 0.2)"
}

const logo = {
    fontWeight: "600",
    fontSize: "30px",
    letterSpacing: "6px"
}

const headerNav = {
    display: "flex",
    flexDirection: "row",
}

export default function Header(){
    return(
        <div style={header}>
            <h1 className={outfit.className} style={logo}>FITNIFY</h1>
            <nav style={headerNav}>
                <a href="#" className={`headerButton ${outfit.className}`}>TRAINING</a>
                <a href="#" className={`headerButton ${outfit.className}`}>USER</a>
            </nav>
        </div>
    );
};
