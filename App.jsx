import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Top from './pages/Top';
import ReportHeader from './pages/ReportHeader';
import ExpenseList from './pages/ExpenseList';
import ExpenseAdd from './pages/ExpenseAdd';

// 共通のナビゲーションバー（ヘッダー）
function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-sap-blue text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex gap-6 font-bold">
          <Link to="/" className="hover:text-blue-200">SAP Concur</Link>
          <Link to="/" className="hover:text-blue-200 font-normal">ホーム</Link>
          <Link to="/" className="hover:text-blue-200 font-normal">経費</Link>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/report/new" element={<ReportHeader />} />
          {/* :reportId でURLからレポート名などを受け取る想定 */}
          <Route path="/report/:reportId/list" element={<ExpenseList />} />
          <Route path="/report/:reportId/add" element={<ExpenseAdd />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
