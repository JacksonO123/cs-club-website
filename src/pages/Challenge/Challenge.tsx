import { useState } from "react";
import { useParams } from "react-router-dom"
import {challenges} from "../Challenges/Challenges";
import {addPoints} from "../../firebase";

export default function Challenge({user}: {user:any}) {
    const {id}: any = useParams();
    const challenge = challenges[+id];
    const [language, setLanguage] = useState("java");
    const languages = [["java", "Java"]];
    const [code, setCode] = useState("");
    const [status, setStatus] = useState("");

    const submit = () => {
        let solved: boolean = true;
        challenge.tests.forEach((test: any, i:number) => {
            if (!solved) return;
            //console.log(code);
            fetch(`http://cs-club-api.eba-dmppb5a2.us-west-2.elasticbeanstalk.com/submit/${code}/${language}/${test.input}`, { //?code='${code}'&language='${language}'&input='${test.input}'`, {
                method: "post",
               // mode: "no-cors",
                // body: JSON.stringify({
                //     code,
                //     language,
                //     input: test.input
                // }),
               
            })
            .then(res => res.json())
            .then(data => {
               // console.log(data)
               if (data.error) {
                   setStatus("Runtime error: " + data.error);
                   solved = false;
               }
               else if ((data.output != test.output || test.output + "\n" == data.output)  && solved) {
                    setStatus("Wrong answer on test " + (i + 1) + ", input: " + test.input + " expected: " + test.output + ", got: " + data.output);
                    solved = false;
                    return;
                }
                else if (i == challenge.tests.length - 1 && solved) {
                   // if (solved) {
                        setStatus(`Congratulations! Passed ${challenge.tests.length}/${challenge.tests.length} test cases!`);
                    //    addPoints(user.uid, user.displayName, "Solving problem " + challenge.title, 100);
                    //}
                }
            })
        })
      
    }
    return (
        <div>
            {challenge.text}
            <select onChange={e => setLanguage(e.target.value)} value = {language}>
                {languages.map((l: any, i) => (
                    <option key = {i} value = {l[0]}>
                        {l[1]}
                    </option>
                ))}
            </select>

            <br />
            <br />
            <textarea style = {{width: 500, height: 300}}value = {code} onChange = {e => {
               setCode(e.target.value);
            }}/>
            <br />
            <button onClick = {submit}> Submit </button>
            <h2> {status} </h2>
         
        </div>
    )
}