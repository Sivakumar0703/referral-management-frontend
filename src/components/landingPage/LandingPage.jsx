import { useNavigate } from 'react-router-dom';
import './landingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    function navigateToLogin(){
        navigate('/login');
    }

    // if user is already logged in then restrict user to visiting signup page
    if(token){
        navigate('/');
        toast.warn('please logout and try again'.toUpperCase());
    }

    return (
        <div className="landing-page">
            <header className="landing-header">
                <h1>Welcome to Job Referral App</h1>
                <p>Find the best jobs through referrals and grow your career</p>
                <button className="btn btn-primary" onClick={navigateToLogin}>Get Started</button>
            </header>
            <section className="landing-features">
                <h2>Why Choose Us?</h2>
                <div className="features-container">
                    <div className="feature">
                        <h3>Trusted Referrals</h3>
                        <p>Get job referrals from verified professionals.</p>
                    </div>
                    <div className="feature">
                        <h3>Vast Network</h3>
                        <p>Connect with a wide range of companies and recruiters.</p>
                    </div>
                    <div className="feature">
                        <h3>Career Growth</h3>
                        <p>Boost your career with top-notch job opportunities.</p>
                    </div>
                </div>
            </section>
            <footer className="landing-footer">
                <p>&copy; 2025 Job Referral App. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default LandingPage;
