import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

import styles from './SideBar.module.css';

interface SidebarProps {
    isSidebarOpen: boolean;
    onClose: () => void;
    setOpenMsgBox: () => void;
    setOpenOverlay: () => void;
    // setIsLoggedIn: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    isSidebarOpen,
    onClose,
    setOpenMsgBox,
    setOpenOverlay,
    // setIsLoggedIn
}) => {

    const navigate = useNavigate();
  
    const allSidebarActions: { [key: string]: () => void } = {
        'AppBar': async () => {
            navigate('/app-bar'); //Appbar
            onClose();
        },
        'AuthPage': async () => {
            navigate('/auth-page');
            onClose();
        },
        'BottomNavigationBar': () => {
            navigate('/bottom-nav-bar');
            onClose();
        },
        'Dashboard': () => {
            navigate('/dashboard');
            onClose();
        },
        'MessageBox': () => {
            setOpenMsgBox();
            navigate('/message-box');
            onClose();
        },
        'Overlay': () => {
            setOpenOverlay();
            navigate('/blured-overlay');
            onClose();
        },
        'UserProfile': () => {
            // setIsLoggedIn();
            navigate('/user-profile');
            onClose();
        },
        'UserRegistrationForm': () => {
            // setIsLoggedIn();
            navigate('/user-registration-form');
            onClose();
        },
    };

    const sidebarItems = [
        'AppBar',
        'AuthPage',
        'BottomNavigationBar',
        'Dashboard',
        'MessageBox',
        'Overlay',
        'UserProfile',
        'UserRegistrationForm'
    ];
   
    const handleSidebarItemClick = (actionName: string) => {
        const action = allSidebarActions[actionName];
        if (action) {
            action();
        } else {
            console.log(`No action defined for: ${actionName}`);
        }
    };

    return (
        <>
            {/* Side bar */}
            <div
                className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}
            >
                
                {/* Close button inside sidebar */}
                <button className={styles.closeSidebar} onClick={onClose}>
                    <X
                        className={styles.closeIcon}
                    />
                </button>
                
                <div className={styles.sidebarContent}>
                    <h3
                        className={styles.menuTitle}
                    >
                        SideBar
                    </h3>
                    
                    <nav className={styles.nav}>
                        {sidebarItems.map((item) => (
                            <button
                                key={item}
                                className={styles.navItem}
                                onClick={() => handleSidebarItemClick(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
                
            {/* Overlay if no active components */}
            {isSidebarOpen && (
                <div
                    className={styles.overlay}
                    onClick={onClose}
                />
            )}
        </>
    );
};