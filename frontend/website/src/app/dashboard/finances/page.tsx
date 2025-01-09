'use client';

export default function FinancesPage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1E1E2D] rounded-lg p-6">
        <h2 className="text-xl text-white font-semibold mb-6">Finances</h2>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Balance', value: '£45.2M', change: '+2.3M', positive: true },
            { label: 'Transfer Budget', value: '£25M', change: '-5M', positive: false },
            { label: 'Wage Budget', value: '£1.2M/week', change: '+0.1M', positive: true },
            { label: 'Projected Profit', value: '£15M', change: '+3M', positive: true },
          ].map((item) => (
            <div key={item.label} className="bg-[#151521] p-4 rounded-lg">
              <h3 className="text-gray-400 mb-2">{item.label}</h3>
              <p className="text-2xl text-white mb-1">{item.value}</p>
              <p className={item.positive ? 'text-green-500' : 'text-red-500'}>
                {item.change} this month
              </p>
            </div>
          ))}
        </div>

        {/* Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#151521] p-4 rounded-lg">
            <h3 className="text-white mb-4">Revenue Sources</h3>
            <div className="space-y-4">
              {[
                { source: 'Match Day', amount: '£2.5M', percentage: 30 },
                { source: 'Broadcasting', amount: '£4.2M', percentage: 50 },
                { source: 'Commercial', amount: '£1.7M', percentage: 20 },
              ].map((item) => (
                <div key={item.source} className="p-3 bg-[#1E1E2D] rounded">
                  <div className="flex justify-between mb-2">
                    <span className="text-white">{item.source}</span>
                    <span className="text-gray-400">{item.amount}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#151521] p-4 rounded-lg">
            <h3 className="text-white mb-4">Expenditure</h3>
            <div className="space-y-4">
              {[
                { category: 'Wages', amount: '£3.8M', percentage: 60 },
                { category: 'Transfers', amount: '£1.5M', percentage: 25 },
                { category: 'Operations', amount: '£0.9M', percentage: 15 },
              ].map((item) => (
                <div key={item.category} className="p-3 bg-[#1E1E2D] rounded">
                  <div className="flex justify-between mb-2">
                    <span className="text-white">{item.category}</span>
                    <span className="text-gray-400">{item.amount}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Financial Fair Play */}
        <div className="bg-[#151521] p-4 rounded-lg mb-8">
          <h3 className="text-white mb-4">Financial Fair Play Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-[#1E1E2D] rounded">
              <p className="text-gray-400 mb-2">FFP Limit</p>
              <p className="text-white text-lg">£125M</p>
            </div>
            <div className="p-3 bg-[#1E1E2D] rounded">
              <p className="text-gray-400 mb-2">Current Spending</p>
              <p className="text-white text-lg">£95M</p>
            </div>
            <div className="p-3 bg-[#1E1E2D] rounded">
              <p className="text-gray-400 mb-2">Status</p>
              <p className="text-green-500 text-lg">Compliant</p>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-[#151521] p-4 rounded-lg">
          <h3 className="text-white mb-4">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Amount</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b border-gray-700">
                    <td className="p-4">Jan {i}, 2025</td>
                    <td className="p-4">Transaction Description</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        i % 2 === 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                      }`}>
                        {i % 2 === 0 ? 'Income' : 'Expense'}
                      </span>
                    </td>
                    <td className={`p-4 ${i % 2 === 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {i % 2 === 0 ? '+' : '-'}£{(Math.random() * 1000000).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
