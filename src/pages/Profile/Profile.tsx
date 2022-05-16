import './Profile.scss';

interface Props {
    user: any;
}

export default function Profile({ user }: Props) {
    return (
        <div>
            <h1>
                {
                    user ? (
                        <>
                            Signed in as { user.displayName }
                        </>
                    ) : (
                        <>
                            Not signed in
                        </>
                    )
                }
            </h1>
        </div>
    )
}