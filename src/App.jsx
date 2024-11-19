import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import HomeFeed from "./components/HomeFeed";
import CreatePost from "./components/CreatePost";
import PostPage from "./components/PostPage";
import EditPost from "./components/EditPost";
import ProtectedRoutes from "./components/ProtectedRoute";
import Login from "./components/Login";
import "./index.css";

function App() {
  const session = useSession();
  const supabase = useSupabaseClient();

  // Handle Logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error logging out:", error.message);
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        {/* Navigation Bar */}
        <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Runner's Hub
          </Link>
          <div>
            {session ? (
              <>
                <span className="mr-4">Welcome, {session.user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Login
              </Link>
            )}
          </div>
        </nav>

        {/* Application Routes */}
        <Routes>
          <Route path="/" element={<HomeFeed />} />
          <Route
            path="/create"
            element={
              <ProtectedRoutes>
                <CreatePost />
              </ProtectedRoutes>
            }
          />
          <Route path="/post/:id" element={<PostPage />} />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoutes>
                <EditPost />
              </ProtectedRoutes>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
