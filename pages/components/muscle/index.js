import React, { useEffect, useState } from "react";

export default function Muscle(){

    const [all_muscle, addMuscle] = useState([]);

    const url = 'https://exercisedb.p.rapidapi.com/status';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd8ea3011bemsh94792d8164d1bcfp1d5fdfjsn636fe5314fde',
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
    };

    useEffect(() => {        
        fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
                const muscles = data.map((item) => ({
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