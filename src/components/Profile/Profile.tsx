import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import style from './Profile.module.scss';

export const Profile = () => {
    const [showProfile, setShowProfile] = useState(false);

    const { auth } = useContext(AuthContext);

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    return (
        <div className={style.profile} >
            <p className={style.trigger} onClick={() => toggleProfile()}>Profile</p>
            {showProfile
                ?
                <div className={style.profileOptions}>
                    <p>User: {auth.email}</p>
                    <Link to='/logout'>Logout</Link>
                </div>
                :
                ''
            }
        </div>
    );
};