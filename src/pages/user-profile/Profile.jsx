import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';
import useSolidNavbar from '../../hooks/useSolidNavbar';
import Favorites from './favorites/Favorites';
import { getUserService } from '../../services/profile';
import UserInfo from './userInfo/UserInfo';
import EmailConfirmation from './profile/EmailConfirmation';
import ProfileList from './profile/ProfileList';
import OrdersHistory from './orders/OrdersHistory';
import OrderDetails from './orders/OrderDetails';
import Support from './support/Support';


const Profile = () => {

    useSolidNavbar(true);
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('ordersHistory');
    const [userData, setUserData] = useState({ phone: '', });
    const [currentOrderId, setCurrentOrderId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token && window.location.pathname !== '/login') {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await getUserService();
                if (res.status === 200) {
                    setUserData(res.data.user);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchUserData();
    }, []);

    const renderSection = () => {
        switch (activeSection) {
            case 'ordersHistory':
                return (
                    <OrdersHistory handleViewDetails={(orderId) => {
                        setCurrentOrderId(orderId);
                        setActiveSection('orderDetails');
                    }} />
                );
            case 'orderDetails':
                return <OrderDetails orderId={currentOrderId} />;
            case 'favorites':
                return <Favorites />;
            case 'userInfo':
                return <UserInfo />;
            case 'support':
                return <Support />;
            case 'logout':
                return <Logout />;
            default:
                return <OrdersHistory />
        }
    }

    const handleSectionChange = (section) => {
        setActiveSection(section);
    }

    return (
        <>
            <div className='container pt-20'>
                <div className="grid grid-cols-7 gap-4 py-5">
                    <EmailConfirmation renderSection={renderSection} />
                    <ProfileList
                        handleSectionChange={handleSectionChange}
                        userData={userData}
                    />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Profile
