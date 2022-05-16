import { useEffect, useState } from 'react';
import { addPoints, getPoints } from '../../firebase';
import './Profile.scss';

interface Props {
    user: any;
}

export default function Profile({ user }: Props) {
    const [points, setPoints] = useState(null);
    useEffect(() => {
        getPoints("" + user.uid).then(data => {
            console.log(data);
            setPoints(data.points);
        })
        .catch(err => console.log(err))
       // addPoints("" + user.uid, user.displayName, 50)
    }, [])
    return (
        <div>
          
                {
                    user ? (
                        <>
                           <h1>Signed in as { user.displayName } </h1>
                            <br/>
                            Points: {points}
                            
                        </>
                    ) : (
                        <>
                            Not signed in
                        </>
                    )
                }
          
        </div>
    )
}