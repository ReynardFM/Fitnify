import React from "react";

const bodyContainer = {
    width: "400px",
    height: "100%",
    backdropFilter: "blur(5px)",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    margin: "40px 40px 40px 0",
    padding: "30px",
    borderRadius: "20px",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    display: "flex",
    justifyContent: "center",
    position: "relative"
};

const redMaker = {
    filter: "brightness(0) saturate(100%) invert(18%) sepia(83%) saturate(7500%) hue-rotate(0deg) brightness(101%) contrast(107%)"
};

const baseMuscleStyle = {
    position: "absolute",
    height: "340px",
};

const bodyStyles = {
    height: "340px",
    objectFit: "cover"
};

const muscleMap = {
    pectorals: { src: "/resources/chest.svg", style: { ...baseMuscleStyle, left: "28px" } },
    abs: { src: "/resources/abs.svg", style: { ...baseMuscleStyle, left: "28px" } },
    delts: { src: "/resources/shoulders.svg", style: { ...baseMuscleStyle, left: "28px" } },
    biceps: { src: "/resources/biceps.svg", style: { ...baseMuscleStyle, left: "28px" } },
    forearms: { src: "/resources/forearms.svg", style: { ...baseMuscleStyle, left: "28px" } },
    quads: { src: "/resources/quadriceps.svg", style: { ...baseMuscleStyle, left: "28px" } },
    calves: { src: "/resources/calves.svg", style: { ...baseMuscleStyle, right: "28px" } },
    hamstrings: { src: "/resources/hamstrings.svg", style: { ...baseMuscleStyle, right: "28px" } },
    glutes: { src: "/resources/glutes.svg", style: { ...baseMuscleStyle, right: "28px" } },
    triceps: { src: "/resources/triceps.svg", style: { ...baseMuscleStyle, right: "28px" } },
    "lower back": { src: "/resources/lowerBack.svg", style: { ...baseMuscleStyle, right: "28px" } },
    "upper back": { src: "/resources/back.svg", style: { ...baseMuscleStyle, right: "28px" } },
    traps: { src: "/resources/trapezius.svg", style: { ...baseMuscleStyle, right: "28px" } },
};

export default function Body({ targetMuscle }) {
    const normalizedTarget = targetMuscle?.toLowerCase();

    return (
        <div style={bodyContainer}>
            <img src="/resources/bodyBase.svg" style={bodyStyles} />

            {Object.entries(muscleMap).map(([muscle, { src, style }]) => (
                <img
                    key={muscle}
                    src={src}
                    style={{
                        ...style,
                        ...(normalizedTarget === muscle ? redMaker : {})
                    }}
                />
            ))}
        </div>
    );
}
