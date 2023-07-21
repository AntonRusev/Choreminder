import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { useClickOutside } from "../../hooks/useClickOutside";

import style from './Profile.module.scss';

export const Profile = () => {
    const [showProfile, setShowProfile] = useState(false);

    const { auth } = useContext(AuthContext);


    // Toggle the profile menu
    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    // Close on click outside the menu
    const domNode = useClickOutside(() => {
        setShowProfile(false);
    });

    return (
        <div ref={domNode} className={style.profile} >
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