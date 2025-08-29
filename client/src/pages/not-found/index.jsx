import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <h1 className="text-4xl font-bold text-black mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-black mb-4">Page Not Found</h2>
                <p className="text-black mb-6">The page you're looking for doesn't exist or has been moved.</p>
                <Button 
                    className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                    onClick={() => navigate("/shop/home")}
                >
                    Go Home
                </Button>
            </div>
        </div>
    )
}

export default NotFound;