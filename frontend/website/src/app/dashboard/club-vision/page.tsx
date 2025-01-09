'use client';

export default function ClubVisionPage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1E1E2D] rounded-lg p-6">
        <h2 className="text-xl text-white font-semibold mb-6">Club Vision</h2>

        {/* Current Objectives */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#151521] p-4 rounded-lg">
            <h3 className="text-white mb-4">Short Term</h3>
            <div className="space-y-3">
              {[
                { goal: 'Finish in top 8', priority: 'High' },
                { goal: 'Reach FA Cup Quarter Finals', priority: 'Medium' },
                { goal: 'Develop youth players', priority: 'Medium' },
              ].map((objective) => (
                <div key={objective.goal} className="p-3 bg-[#1E1E2D] rounded">
                  <div className="flex justify-between items-start">
                    <span className="text-white">{objective.goal}</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      objective.priority === 'High' ? 'bg-red-500/20 text-red-500' :
                      objective.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-green-500/20 text-green-500'
                    }`}>
                      {objective.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#151521] p-4 rounded-lg">
            <h3 className="text-white mb-4">Medium Term</h3>
            <div className="space-y-3">
              {[
                { goal: 'Qualify for Europe', priority: 'High' },
                { goal: 'Expand Stadium', priority: 'Medium' },
                { goal: 'Improve Training Facilities', priority: 'Low' },
              ].map((objective) => (
                <div key={objective.goal} className="p-3 bg-[#1E1E2D] rounded">
                  <div className="flex justify-between items-start">
                    <span className="text-white">{objective.goal}</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      objective.priority === 'High' ? 'bg-red-500/20 text-red-500' :
                      objective.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-green-500/20 text-green-500'
                    }`}>
                      {objective.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#151521] p-4 rounded-lg">
            <h3 className="text-white mb-4">Long Term</h3>
            <div className="space-y-3">
              {[
                { goal: 'Establish as Top 6 Club', priority: 'High' },
                { goal: 'Win Major Trophy', priority: 'Medium' },
                { goal: 'World Class Facilities', priority: 'Medium' },
              ].map((objective) => (
                <div key={objective.goal} className="p-3 bg-[#1E1E2D] rounded">
                  <div className="flex justify-between items-start">
                    <span className="text-white">{objective.goal}</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      objective.priority === 'High' ? 'bg-red-500/20 text-red-500' :
                      objective.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-green-500/20 text-green-500'
                    }`}>
                      {objective.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="bg-[#151521] p-4 rounded-lg mb-8">
          <h3 className="text-white mb-4">Current Progress</h3>
          <div className="space-y-4">
            {[
              { objective: 'League Position', target: 'Top 8', current: '6th', progress: 75 },
              { objective: 'Youth Development', target: '3 Debuts', current: '2 Debuts', progress: 66 },
              { objective: 'Financial Growth', target: '£10M Profit', current: '£7M Profit', progress: 70 },
            ].map((item) => (
              <div key={item.objective} className="p-4 bg-[#1E1E2D] rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-white">{item.objective}</span>
                  <span className="text-gray-400">
                    {item.current} / {item.target}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Board Confidence */}
        <div className="bg-[#151521] p-4 rounded-lg">
          <h3 className="text-white mb-4">Board Confidence</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { area: 'Overall', rating: 85 },
              { area: 'League Performance', rating: 80 },
              { area: 'Financial Management', rating: 90 },
              { area: 'Youth Development', rating: 75 },
            ].map((item) => (
              <div key={item.area} className="p-3 bg-[#1E1E2D] rounded">
                <p className="text-gray-400 mb-2">{item.area}</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${item.rating}%` }}
                    ></div>
                  </div>
                  <span className="text-white">{item.rating}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
