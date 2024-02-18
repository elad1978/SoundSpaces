import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";

function App() {
  const mode = useSelector((state) => state.mode); //grabbing state from Store
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); //creating theme based on mode
  const isAuthenticated = Boolean(useSelector((state) => state.token)); //grabbing state from Store
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/*resetting the css (a MUI version) */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              //if user is authenticated, then allow them to see the home page
              element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              //if user is authenticated, then allow them to see the profile page
              path="/profile/:userId"
              element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
