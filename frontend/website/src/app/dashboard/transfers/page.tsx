'use client';

export default function TransfersPage() {
  return (
    <div className="flex h-screen bg-futsim-primary">
      <main className="flex-1 overflow-auto bg-futsim-secondary p-6">
        <div className="bg-futsim-primary rounded-lg p-6">
          <h2 className="text-xl text-futsim-primary font-semibold mb-6">Transfer Hub</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Transfer Budget Section */}
            <div className="bg-futsim-secondary rounded-lg p-4">
              <h3 className="text-lg text-futsim-primary font-medium mb-4">Transfer Budget</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-futsim-accent p-4 rounded">
                  <div className="text-futsim-secondary">Available Budget</div>
                  <div className="text-xl text-futsim-primary font-semibold">£50M</div>
                </div>
                <div className="bg-futsim-accent p-4 rounded">
                  <div className="text-futsim-secondary">Wage Budget</div>
                  <div className="text-xl text-futsim-primary font-semibold">£100K/week</div>
                </div>
              </div>
            </div>

            {/* Transfer Activity Section */}
            <div className="bg-futsim-secondary rounded-lg p-4">
              <h3 className="text-lg text-futsim-primary font-medium mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="bg-futsim-accent p-3 rounded flex justify-between items-center">
                  <div>
                    <div className="text-futsim-primary">John Smith</div>
                    <div className="text-sm text-futsim-secondary">Incoming - £15M</div>
                  </div>
                  <div className="text-futsim-warning">Pending</div>
                </div>
                <div className="bg-futsim-accent p-3 rounded flex justify-between items-center">
                  <div>
                    <div className="text-futsim-primary">Mike Johnson</div>
                    <div className="text-sm text-futsim-secondary">Outgoing - £8M</div>
                  </div>
                  <div className="text-futsim-success">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
