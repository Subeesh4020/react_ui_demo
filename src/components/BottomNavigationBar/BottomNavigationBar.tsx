import React, { useState } from 'react';
import {
    Home,
    Search,
    FolderKanban,
    Trash2,
    User,
    X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import styles from './BottomNavigationBar.module.css';

export interface BottomNavItem {
    id: string;
    label: string;
    icon: LucideIcon;
    path?: string;
    badgeCount?: number;
}

interface BottomNavProps {
    items?: BottomNavItem[];
    activeId?: string;
    onSelect?: (item: BottomNavItem) => void;
}

const DEFAULT_ITEMS: BottomNavItem[] = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'search', label: 'Search', icon: Search, path: '/search' },
    { id: 'projects', label: 'Projects', icon: FolderKanban, path: '/projects', badgeCount: 2 },
    { id: 'trash', label: 'Trash', icon: Trash2, path: '/trash' },
    { id: 'profile', label: 'Account', icon: User, path: '/account' },
];

export function BottomNavBar({
    items = DEFAULT_ITEMS,
    activeId: controlledActiveId,
    onSelect,
}: BottomNavProps) {
    const [internalActiveId, setInternalActiveId] = useState<string>(items[0]?.id ?? 'home');

    const currentActiveId = controlledActiveId ?? internalActiveId;
    const navigate = useNavigate();

    const handleItemClick = (item: BottomNavItem) => {
        if (controlledActiveId === undefined) {
        setInternalActiveId(item.id);
        }
        onSelect?.(item);
    };

    return (
        <>
            <button className={styles.close} onClick={() => navigate('/')}>
                <X
                    className={styles.closeIcon}
                />
            </button>

            <nav className={styles.bottomNav} aria-label="Bottom navigation">
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentActiveId === item.id;

                    return (
                        <button
                            key={item.id}
                            type="button"
                            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                            onClick={() => handleItemClick(item)}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            <span className={styles.iconWrapper}>
                                <Icon size={21} strokeWidth={isActive ? 2.4 : 1.9} />
                                {item.badgeCount !== undefined && item.badgeCount > 0 && (
                                    <span className={styles.badge}>
                                        {item.badgeCount > 9 ? '9+' : item.badgeCount}
                                    </span>
                                )}
                            </span>
                            <span className={styles.label}>{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </>
    );
}
