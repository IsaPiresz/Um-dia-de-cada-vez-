import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Layout from "@/components/Layout";
import OnboardingModal from "@/components/OnboardingModal";
import Index from "./pages/Index";
import Routines from "./pages/Routines";
import CalmMode from "./pages/CalmMode";
import Reports from "./pages/Reports";
import About from "./pages/About";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <OnboardingModal />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/rotinas" element={<Routines />} />
              <Route path="/calmo" element={<CalmMode />} />
              <Route path="/relatorios" element={<Reports />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/ajuda" element={<Help />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
