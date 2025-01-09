'use client';

export default function InboxPage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1E1E2D] rounded-lg p-6">
        <h2 className="text-xl text-white font-semibold mb-6">Inbox</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-[#151521] rounded-lg hover:bg-gray-800 cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-white font-medium">Transfer Offer Received</h3>
                  <p className="text-gray-400 text-sm">Manchester United has made an offer for your player</p>
                </div>
                <span className="text-gray-400 text-sm">2h ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
