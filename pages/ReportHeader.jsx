import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReportHeader() {
  const [reportName, setReportName] = useState('Hiroyuki');
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    if (!reportName) return;
    navigate(`/report/${encodeURIComponent(reportName)}/list`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="text-sm text-gray-500 mb-4">/ 経費精算レポートの作成</div>
      
      <div className="bg-white rounded-md shadow-sm border border-gray-200">
        <form onSubmit={handleCreate}>
          <div className="p-6 border-b border-gray-200 space-y-6">
            <div>
              <button type="button" className="text-blue-600 font-medium text-sm hover:underline">
                承認済み申請から作成
              </button>
              <div className="text-red-500 text-xs mt-2">必須項目 *</div>
            </div>

            {/* 入力グリッド */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Policy</label>
                <input type="text" readOnly value="*WM - Default Policy" className="w-full border border-gray-300 bg-gray-50 p-2 text-sm rounded outline-none" />
              </div>
              
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
                  Report Name <span className="text-red-500">*</span>
                  <span className="bg-gray-400 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">?</span>
                </label>
                <input 
                  type="text" 
                  required 
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  className="w-full border border-gray-300 p-2 text-sm rounded focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Report Date</label>
                <input type="text" readOnly value="10/02/2026" className="w-full border border-gray-300 bg-gray-50 p-2 text-sm rounded outline-none" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Account Activation Date</label>
                <input type="text" readOnly value="03/01/2020" className="w-full border border-gray-300 bg-gray-50 p-2 text-sm rounded outline-none" />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">AI Status</label>
                <input type="text" readOnly className="w-full border border-gray-300 bg-gray-50 p-2 text-sm rounded outline-none" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Sap integration</label>
                <input type="text" readOnly className="w-full border border-gray-300 bg-gray-50 p-2 text-sm rounded outline-none" />
              </div>
            </div>

            {/* コメント欄 */}
            <div>
              <div className="flex justify-between">
                <label className="block text-xs font-medium text-gray-600 mb-1">Comment</label>
                <span className="text-xs text-gray-400">0/500</span>
              </div>
              <textarea rows="3" className="w-full border border-gray-300 p-2 text-sm rounded focus:border-blue-500 outline-none resize-none"></textarea>
            </div>

            {/* 出張手当セクション */}
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-800">出張手当</h3>
                <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded">Important Highlights</span>
              </div>
              <p className="text-xs text-gray-500 mb-3">出張し、宿泊手当、食事手当、または諸雑費出張手当が必要な場合は選択します。</p>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="radio" name="allowance" defaultChecked className="text-blue-600 focus:ring-blue-500" />
                  <span>はい、出張手当が必要です (Per Diem)</span>
                  <span className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">?</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="radio" name="allowance" className="text-blue-600 focus:ring-blue-500" />
                  <span>いいえ、出張手当は必要ありません</span>
                  <span className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">?</span>
                </label>
              </div>
            </div>
          </div>

          {/* フッター（アクションボタン） */}
          <div className="bg-gray-50 p-4 border-t flex flex-col items-end gap-2">
            <span className="text-xs text-gray-500">次: レポートを作成し、出張手当の旅程詳細を追加します</span>
            <div className="flex gap-3">
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
                次へ
              </button>
              <button type="button" onClick={() => navigate(-1)} className="text-blue-600 text-sm font-medium px-2 py-2 hover:underline">
                キャンセル
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
