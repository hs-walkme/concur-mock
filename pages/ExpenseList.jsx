import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Receipt } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function ExpenseList() {
  const { reportId } = useParams();
  const decodedReportName = decodeURIComponent(reportId);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      // urlから取得したレポート名に一致する経費だけを取得
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('report_name', decodedReportName)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('取得エラー:', error);
      } else {
        setExpenses(data);
      }
    };
    
    fetchExpenses();
  }, [decodedReportName]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{decodedReportName}</h1>
          <p className="text-gray-500">経費一覧</p>
        </div>
        <Link 
          to={`/report/${reportId}/add`} 
          className="flex items-center gap-2 px-4 py-2 bg-sap-blue text-white rounded hover:bg-blue-700 font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          新規経費を追加
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b px-6 py-4 flex items-center gap-2">
          <Receipt className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-700">登録済みの明細 ({expenses.length}件)</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-6 py-3 font-medium">取引日</th>
                <th className="px-6 py-3 font-medium">経費タイプ</th>
                <th className="px-6 py-3 font-medium">目的・メモ</th>
                <th className="px-6 py-3 font-medium text-right">金額</th>
                <th className="px-6 py-3 font-medium text-center">領収書</th>
                <th className="px-6 py-3 font-medium text-center">ステータス</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{expense.expense_date}</td>
                  <td className="px-6 py-4">{expense.category}</td>
                  <td className="px-6 py-4 truncate max-w-xs">{expense.memo}</td>
                  <td className="px-6 py-4 text-right font-medium">¥{expense.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    {expense.receipt_url ? (
                      <a href={expense.receipt_url} target="_blank" rel="noopener noreferrer" className="text-sap-blue hover:underline">
                        表示
                      </a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      {expense.status}
                    </span>
                  </td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    まだ経費が追加されていません。<br/>
                    右上の「新規経費を追加」から登録してください。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
