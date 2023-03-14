import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "components/HomePage/HomePage";
import LoginPage from "loginPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import CreateTask from "components/CreateTask/CreateTask";
import UpdateTask from "components/UpdateTask/UpdateTask";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route path="/createTask" element={<CreateTask />} />
            <Route path="/updateTask" element={<UpdateTask />} />
            <Route path="/homePage" element={<HomePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
