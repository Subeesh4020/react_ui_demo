import { useState } from 'react';
import {
    Routes,
    Route
} from 'react-router-dom';
import defaultAvatar from './assets/images/default-avatar.png';
import type { UserData } from './Interface';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar/SideBar';
import { ArrowRight } from 'lucide-react';
import { AuthPage } from './components/AuthPage/AuthPage';
import { Appbar } from './components/Appbar/Appbar';
import { BottomNavBar } from './components/BottomNavigationBar/BottomNavigationBar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { MessageBox } from './components/MessageBox/MessageBox';
import { Overlay } from './components/Overlay/Overlay';
import { UserProfile } from './components/UserProfile/UserProfile';

import styles from './App.module.css';

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [openMsgBox, setOpenMsgBox] = useState(false);
    const [openOverlay, setOpenOverlay] = useState(false);

    const mockUser: UserData = {
        name: 'Robin',
        username: 'rrobin_dev',
        role: 'Frontend Engineer',
        bio: 'Building clean web interfaces with React and TypeScript. Coffee enthusiast and open-source contributor.',
        location: 'San Francisco, USA',
        email: 'rrobin@example.com',
        avatarUrl: defaultAvatar,
        stats: {
            posts: 42,
            followers: 1280,
            following: 310,
        },
        };

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                setOpenMsgBox={() => setOpenMsgBox(true)}
                setOpenOverlay={() => setOpenOverlay(true)}
                // setIsLoggedIn={() => setIsLoggedIn(true)}
            />
            <button
                className={styles.sidebarBtn}
                onClick={() => setIsSidebarOpen(true)}
            >
                
                <ArrowRight size={18} />
            </button>
            <h1 className={styles.heading}>React UI demo</h1>
            
            <Routes>
                <Route path='/auth-page' element={<AuthPage />} />
                <Route path='/app-bar' element={
                    <Appbar
                        brandName="MyApp"
                        userName="Robin"
                        unreadCount={3}
                    />
                } />
                <Route path='/bottom-nav-bar' element={<BottomNavBar />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/message-box' element={
                    <MessageBox
                        isOpen={openMsgBox}
                        variant="error"
                        title="Move item to Trash?"
                        message="This item will be moved to your trash folder. You can restore it anytime within 30 days."
                        onClose={() => setOpenMsgBox(false)}
                    />
                } />
                <Route path='/blured-overlay' element={
                    <Overlay
                        isOpenOverlay={openOverlay}
                        onClose={() => setOpenOverlay(false)}
                        text="This is an overlay example"
                    />
                } />
                <Route path='/user-profile' element={
                    <UserProfile
                        initialUser={mockUser}
                        onClose={() => navigate('/')}
                    />
                } />
            </Routes>
            
        </div>
    );
};

export default App;
