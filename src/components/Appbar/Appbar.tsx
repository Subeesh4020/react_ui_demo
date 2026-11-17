import React, { useState } from 'react';
import {
    Menu,
    Search,
    Bell,
    Settings,
    Trash2,
    User,
    Moon,
    Sun,
    X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Appbar.module.css';

interface AppbarProps {
  brandName?: string;
  userName?: string;
  unreadCount?: number;
  onMenuClick?: () => void;
  onSearch?: (query: string) => void;
  onNotificationsClick?: () => void;
  onTrashClick?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
}

export function Appbar({
    brandName = 'Workspace',
    userName = 'Account',
    unreadCount = 2,
    onMenuClick,
    onSearch,
    onNotificationsClick,
    onTrashClick,
    onSettingsClick,
    onProfileClick,
}: AppbarProps) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isDark, setIsDark] = useState<boolean>(true);
    
    const navigate = useNavigate();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        onSearch?.(value);
    };

    return (
        <>
            <header className={styles.appbar}>
                {/* Left: Sidebar Toggle Button + App Title */}
                <div className={styles.leftSection}>
                    <button
                        type="button"
                        className={styles.iconButton}
                        onClick={onMenuClick}
                        aria-label="Toggle navigation menu"
                        title="Open Menu"
                    >
                        <Menu size={20} />
                    </button>

                    <a href="/" className={styles.brand}>
                        {brandName}
                    </a>
                </div>

                {/* Center: Search Bar */}
                <div className={styles.searchWrapper}>
                    <Search size={16} className={styles.searchIcon} />
                    <input
                        type="search"
                        className={styles.searchInput}
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        aria-label="Search"
                    />
                </div>

                {/* Right: Icon Action Buttons */}
                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.iconButton}
                        onClick={() => setIsDark((prev) => !prev)}
                        aria-label="Toggle theme"
                        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {isDark ? <Sun size={19} /> : <Moon size={19} />}
                    </button>

                    <button
                        type="button"
                        className={styles.iconButton}
                        onClick={onTrashClick}
                        aria-label="Trash"
                        title="Trash"
                    >
                        <Trash2 size={19} />
                    </button>

                    <button
                        type="button"
                        className={styles.iconButton}
                        onClick={onNotificationsClick}
                        aria-label="Notifications"
                        title="Notifications"
                    >
                        <Bell size={19} />
                        {unreadCount > 0 && <span className={styles.badge} />}
                    </button>

                    <button
                        type="button"
                        className={styles.iconButton}
                        onClick={onSettingsClick}
                        aria-label="Settings"
                        title="Settings"
                    >
                        <Settings size={19} />
                    </button>

                    <div className={styles.divider} />

                    <button
                        type="button"
                        className={styles.profileButton}
                        onClick={onProfileClick}
                        aria-label="User Profile"
                    >
                        <User size={18} />
                        <span>{userName}</span>
                    </button>
                </div>
            </header>

            <button className={styles.close} onClick={() => navigate('/')}>
                <X
                    className={styles.closeIcon}
                />
            </button>
        </>
    );
}
