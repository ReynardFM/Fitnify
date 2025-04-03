import React, { useEffect, useState } from "react";

export default function Muscle(){

    const [all_muscle, addMuscle] = useState([]);

    

    useEffect(() => {        
        fetch("https://wger.de/api/v2/muscle/")
            .then((response) => response.json())
            .then((data) => {
                const muscles = data.results.map((item) => ({
                    id: item.id,
                    muscle: item.name_en || item.name // Simplify logic
                }));
                addMuscle(muscles);
            });
    }, []);

    return (
        <div>
            <ul>
                {all_muscle?.map((item) => (
                    <li key={item.id}>
                        {item.muscle}
                    </li>
                ))}
            </ul>
        </div>
    );
}