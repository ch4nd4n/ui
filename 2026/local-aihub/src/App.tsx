import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "@/components/shared/nav-bar";
import { Home } from "@/pages/home";
import { OcrPage } from "@/pages/ocr";
import { MarkdownToJsonPage } from "@/pages/markdown-to-json";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ocr" element={<OcrPage />} />
            <Route path="/tools/markdown-to-json" element={<MarkdownToJsonPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
