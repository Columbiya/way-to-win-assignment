import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { lazy, Suspense } from "react";
import { Header } from "./widgets/Header";
import { Box, CircularProgress } from "@mui/material";

const HomePage = lazy(() => import("./pages/Home"));
const DoctorsPage = lazy(() => import("./pages/Doctors"));
const NursesPage = lazy(() => import("./pages/Nurses"));

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense
        fallback={
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <Routes>
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/nurses" element={<NursesPage />} />
          <Route index element={<HomePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
