import { Link } from 'react-router-dom';
import { Plane, Car, Bed, FileText, Briefcase, Receipt, Info, ChevronRight } from 'lucide-react';

export default function Top() {
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* 青いウェルカムヘッダー */}
      <div className="bg-blue-600 text-white px-8 py-10 relative">
        <h1 className="text-3xl font-light mb-1">ようこそ、Hiroyukiさん</h1>
        <p className="text-sm opacity-90">2026年10月2日</p>
        
        {/* 3つの主要アクションボタン */}
        <div className="absolute -bottom-8 left-8 right-8 flex gap-4">
          <button className="flex-1 bg-white text-gray-800 rounded-md p-4 shadow-sm border border-gray-100 flex items-start gap-3 hover:shadow-md transition-shadow">
            <div className="p-2 bg-purple-100 text-purple-600 rounded">
              <FileText className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm">事前申請の作成</h3>
              <p className="text-xs text-gray-500 mt-1">出張または経費の承認申請を開始します。</p>
            </div>
          </button>
          
          <button className="flex-1 bg-white text-gray-800 rounded-md p-4 shadow-sm border border-gray-100 flex items-start gap-3 hover:shadow-md transition-shadow">
            <div className="p-2 bg-teal-100 text-teal-600 rounded">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm">出張の計画</h3>
              <p className="text-xs text-gray-500 mt-1">出張のフライト、ホテル、および乗車を検索および予約します。</p>
            </div>
          </button>

          <Link to="/report/new" className="flex-1 bg-white text-gray-800 rounded-md p-4 shadow-sm border border-gray-100 flex items-start gap-3 hover:shadow-md transition-shadow">
            <div className="p-2 bg-blue-100 text-blue-600 rounded">
              <Receipt className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-sm">経費精算レポートの作成</h3>
              <p className="text-xs text-gray-500 mt-1">経費精算レポートを開始して、業務に関連する経費を追跡します。</p>
            </div>
          </Link>
        </div>
      </div>

      {/* メインコンテンツエリア */}
      <div className="mt-16 px-8 flex gap-6">
        {/* 左カラム：フライト検索 */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-md shadow-sm">
            <div className="flex border-b">
              <button className="p-4 border-b-2 border-blue-600 text-blue-600 flex-1 flex justify-center"><Plane className="w-5 h-5" /></button>
              <button className="p-4 text-gray-400 flex-1 flex justify-center hover:text-gray-600"><Car className="w-5 h-5" /></button>
              <button className="p-4 text-gray-400 flex-1 flex justify-center hover:text-gray-600"><Bed className="w-5 h-5" /></button>
            </div>
            <div className="p-4">
              <div className="bg-gray-50 border p-3 rounded text-xs text-gray-600 mb-4">
                Please make sure you book a full itinerary including Hotel, Rail, and Car Rental if needed in one booking.
              </div>
              <h3 className="font-semibold text-gray-700 mb-3">フライト検索</h3>
              <div className="flex text-sm mb-4 border rounded">
                <button className="flex-1 py-1 bg-blue-50 text-blue-600 font-medium">往復</button>
                <button className="flex-1 py-1 text-gray-600 border-l border-r hover:bg-gray-50">片道</button>
                <button className="flex-1 py-1 text-gray-600 hover:bg-gray-50">複数都市</button>
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <label className="block text-gray-600 mb-1">出発地 <span className="text-red-500">*</span></label>
                  <input type="text" defaultValue="HND - 羽田空港" className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">到着地 <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="場所を入力" className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">日付 <span className="text-red-500">*</span></label>
                  <input type="text" defaultValue="10/02/2026 - 10/03/2026" className="w-full border p-2 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右カラム：お知らせ・出張予定 */}
        <div className="flex-1 space-y-6">
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-md flex items-center gap-2 text-sm">
            <Info className="w-4 h-4" />
            <span>E-Receipt を受領するためのサインアップをしていません。</span>
            <a href="#" className="underline font-medium">ここでサインアップ</a>
          </div>

          <div className="bg-white border border-gray-200 rounded-md shadow-sm">
            <div className="border-b px-4 py-3">
              <h2 className="font-semibold text-gray-700">会社からのお知らせ</h2>
            </div>
            <div className="p-8 text-center">
              <a href="#" className="text-blue-600 underline text-sm">WalkMe Training Material</a>
              <p className="text-xs text-gray-500 mt-1 mb-4">This link will provide information to utilize the Concur Expense System.</p>
              <div className="bg-blue-600 text-white p-2 text-sm font-medium">Welcome to Concur Travel!</div>
              <p className="text-left text-blue-800 font-medium text-sm mt-4">Important Reminders:</p>
            </div>
            <div className="border-t px-4 py-2 text-right">
              <button className="text-blue-600 text-sm hover:underline">もっと読む</button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md shadow-sm">
            <div className="border-b px-4 py-3 flex justify-between items-center">
              <h2 className="font-semibold text-gray-700">出張予定</h2>
              <button className="text-blue-600 text-sm hover:underline">すべての出張を表示</button>
            </div>
            <div className="p-10 flex flex-col items-center justify-center text-gray-400">
               {/* モック用のイラスト代わり */}
               <div className="w-32 h-24 bg-blue-100 rounded-lg flex items-center justify-center relative mb-4">
                 <div className="absolute bg-white rounded-full p-2 shadow-md">
                   <span className="text-2xl font-bold text-gray-800">?</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
