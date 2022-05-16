import { useEffect, useState } from "react";
import { getUser} from "../../firebase";

export interface UserStats {
    points: number;
}

export default function Profile() {
    const [data, setData] = useState<any>(null);
   
    return (
        <div>
            <h1>
     

            Signed in as {getUser() && getUser()!.displayName}

            </h1>
           
        </div>
    )
}