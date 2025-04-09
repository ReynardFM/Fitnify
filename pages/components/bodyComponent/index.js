import react from "react";

const bodyContainer = {
    width: "600px",
    height: "100%",
    backdropFilter: "blur(5px)",
    backgroundColor: " rgba(255, 255, 255, 0.06)",
    margin: "40px 40px 40px 0",
    padding: "30px",
    borderRadius: "20px",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    display: "flex",
    justifyContent: "center",
    position: "relative"
}

const bodySTyles = {
    height: "480px",
    objectFit: "cover"
}

const chestStyles = {
    position: "absolute",
    height: "480px",
    left: "58px",
}

const absStyles = {
    position: "absolute",
    height: "480px",
    left: "58px",
    filter: "brightness(0) saturate(100%) invert(18%) sepia(83%) saturate(7500%) hue-rotate(0deg) brightness(101%) contrast(107%)"
}

const shoulderStyles = {
    position: "absolute",
    height: "480px",
    left: "58px"
}

const bicepStyles = {
    position: "absolute",
    height: "480px",
    left: "58px",
}

const forearmStyles = {
    position: "absolute",
    height: "480px",
    left: "58px"
}

const quadricepStyles = {
    position: "absolute",
    height: "480px",
    left: "58px"
}

const calvesStyles = {
    position: "absolute",
    height: "480px",
    right: "58px"
}

const hamstringStyles = {
    position: "absolute",
    height: "480px",
    right: "58px"
}

const glutesStyles = {
    position: "absolute",
    height: "480px",
    right: "58px"
}

const tricepsStyles = {
    position: "absolute",
    height: "480px",
    right: "58px"
}

const lowerBackStyles = {
    position: "absolute",
    height: "480px",
    right: "58px"
}

const backStyles = {
    position: "absolute",
    height: "480px",
    right: "58px"
}

const trapeziusStyles = {
    position: "absolute",
    height: "480px",
    right: "58px",
}

export default function Body() {
    return(
        <div style={bodyContainer}> 
            <img src="/resources/bodyBase.svg" style={bodySTyles}/>
            <img src="/resources/chest.svg" style={chestStyles}/>
            <img src="/resources/abs.svg" style={absStyles}/>
            <img src="/resources/shoulders.svg" style={shoulderStyles}/>
            <img src="/resources/biceps.svg" style={bicepStyles}/>
            <img src="/resources/forearms.svg" style={forearmStyles}/>
            <img src="/resources/quadriceps.svg" style={quadricepStyles}/>


            <img src="/resources/calves.svg" style={calvesStyles}/>
            <img src="/resources/hamstrings.svg" style={hamstringStyles}/>
            <img src="/resources/glutes.svg" style={glutesStyles}/>
            <img src="/resources/triceps.svg" style={tricepsStyles}/>
            <img src="/resources/lowerBack.svg" style={lowerBackStyles}/>
            <img src="/resources/back.svg" style={backStyles}/>
            <img src="/resources/trapezius.svg" style={trapeziusStyles}/>
        </div>
    );
};