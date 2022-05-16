import { useEffect, useState } from 'react';
import { addPoints, getPoints } from '../../firebase';
import './Profile.scss';

interface Props {
    user: any;
}

export default function Profile({ user }: Props) {
    const [points, setPoints] = useState(null);
    const [updated, setUpdated] = useState(false);
    useEffect(() => {
        getPoints("" + user.uid).then(data => {
            console.log(data);
            setPoints(data.points);
        })
        .catch(err => console.log(err))
       // addPoints("" + user.uid, user.displayName, 50)
    }, [updated])
    return (
        <div>
          
                {
                    user ? (
                        <>
                           <h1>Signed in as { user.displayName } </h1>
                            <br/>
                            Points: {points}
                            <button  onClick={() => {
                                addPoints(user.uid, user.displayName, 50)
                                    .then(() => {

                                        setUpdated(prev => !prev);
                                    })
                            }}> Get 50 points</button>
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