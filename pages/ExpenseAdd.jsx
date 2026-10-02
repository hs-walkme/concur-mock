import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function ExpenseAdd() {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const decodedReportName = decodeURIComponent(reportId);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    expense_date: '',
    category: '',
    amount: '',
    memo: ''
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let receiptUrl = '';
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('receipts')
          .upload(fileName, file);
        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('receipts')
          .getPublicUrl(fileName);
        receiptUrl = publicUrlData.publicUrl;
      }

      // レポート名を含めてDBに保存
      const { error: dbError } = await supabase.from('expenses').insert([
        {
          ...formData,
          report_name: decodedReportName,
          amount: parseInt(formData.amount, 10),
          receipt_url: receiptUrl,
          status: '未提出'
        }
      ]);
      if (dbError) throw dbError;

      // 保存が完了したら、一覧画面へ戻る
      navigate(`/report/${reportId}/list`);

    } catch (error) {
      console.error(error);
      alert('エラーが発生しました。');
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">経費の追加</h1>
          <p className="text-gray-500 text-sm mt-1">レポート: {decodedReportName}</p>
        </div>
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-medium">
          キャンセル
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-6 h-[70vh]">
        {/* 左ペイン: 経費詳細（順番を入れ替えました） */}
        <div className="w-1/2 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
          <div className="border-b px-6 py-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-700">経費詳細</h2>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">取引日 <span className="text-red-500">*</span></label>
              <input type="date" name="expense_date" required value={formData.expense_date} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-sap-blue outline-none transition-shadow" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">経費タイプ <span className="text-red-500">*</span></label>
              <select name="category" required value={formData.category} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-sap-blue outline-none bg-white transition-shadow">
                <option value="">選択してください</option>
                <optgroup label="出張関連">
                  <option value="交通費">交通費 (電車・バス等)</option>
                  <option value="タクシー">タクシー代</option>
                  <option value="宿泊費">宿泊費</option>
                </optgroup>
                <optgroup label="一般経費">
                  <option value="交際費">交際費 (飲食)</option>
                  <option value="事務用品">事務用品・消耗品</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">金額 (JPY) <span className="text-red-500">*</span></label>
              <input type="number" name="amount" required min="1" value={formData.amount} onChange={handleInputChange} placeholder="例: 1500" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-sap-blue outline-none transition-shadow text-right" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">目的・メモ</label>
              <textarea name="memo" rows="3" value={formData.memo} onChange={handleInputChange} placeholder="訪問先や用途を入力してください" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-sap-blue outline-none transition-shadow" />
            </div>
          </div>

          <div className="border-t px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end">
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2 bg-sap-blue text-white rounded font-medium hover:bg-blue-700 disabled:bg-blue-300 transition-colors">
              <CheckCircle className="w-5 h-5" />
              {isSubmitting ? '保存中...' : '経費を保存'}
            </button>
          </div>
        </div>

        {/* 右ペイン: 領収書（順番を入れ替えました） */}
        <div className="w-1/2 bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center relative">
          {preview ? (
            <div className="w-full h-full relative">
              <img src={preview} alt="領収書プレビュー" className="w-full h-full object-contain" />
              <button type="button" onClick={() => { setFile(null); setPreview(null); }} className="absolute top-2 right-2 bg-white p-2 rounded-full shadow border text-red-500 hover:bg-gray-50">削除</button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-12 h-12 text-gray-400 mb-3" />
                <p className="mb-2 text-sm text-gray-500 font-semibold">クリックして領収書をアップロード</p>
                <p className="text-xs text-gray-500">PNG, JPG, PDF (最大 5MB)</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          )}
        </div>
      </form>
    </div>
  );
}
