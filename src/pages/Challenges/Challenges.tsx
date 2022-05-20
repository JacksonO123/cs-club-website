import {useNavigate} from "react-router-dom";
export const challenges = [
    {
        id: 0,
        title: "Multiply 2 numbers",
        text: (
            <div>
                <h1> Multiply two numbers </h1>
                Given an input of two numbers, a and b, output a * b
            </div>

        ),
        tests: [
            {input: "1 1", output: "1\n"},
            {input: "2 5", output: "10\n"},
            {input: "4050 4959", output: "20083950\n"}
        
        ]
    }
]

export default function Challenges() {
    const navigate = useNavigate();
    return (
        <div>
            {
                challenges.map((challenge: any, i) => (
                    <div key = {i} style = {{margin: 10, border: "1px solid", padding: "1em"}}>
                        <h2> {challenge.title} </h2>
                        <button onClick = {() => navigate(`/solve/${i}`)}> Solve </button>
                    </div>
                ))
            }
        </div>
    );
}