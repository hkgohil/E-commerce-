import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

function UnAuthPage() {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-black mb-4">Access Denied</h1>
                <p className="text-black mb-6">You don't have access to this page. Please sign in to continue.</p>
                <Button 
                    className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                    onClick={() => navigate("/auth/login")}
                >
                    Sign In
                </Button>
            </div>
        </div>
    )
}

export default UnAuthPage;