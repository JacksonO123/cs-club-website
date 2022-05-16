import { useEffect, useState } from 'react';
import { addPoints, getPoints } from '../../firebase';
import './Profile.scss';

interface Props {
    user: any;
}

export default function Profile({ user }: Props) {

    const [points, setPoints] = useState<number | null>(null);

    const handleAddPoints = (): void => {
        addPoints(user.uid, user.displayName, 50);
    }

    useEffect(() => {
        async function handleGetPoints(): Promise<void> {
            const points = await getPoints(user?.uid);
            setPoints(points);
        }
        handleGetPoints();
    }, [user])

    return (
        <div>
            {
                user ? (
                    <>
                        <h1>Signed in as { user.displayName }</h1>
                        <br/>
                        Points: {points}
                        <button  onClick={handleAddPoints}>Get 50 points</button>
                    </>
                ) : (
                    <>
                        Not signed in
                    </>
                )
            }
        </div>
    );
}