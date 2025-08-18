"use client"

export default function Reflawood() {
  

  return (
       <div className="max-h-screen h-screen flex flex-col w-full overflow-hidden" style={{ backgroundColor: '#fef8f5' }}>
      <header className="py-6 px-8" style={{ backgroundColor: '#432219' }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#fef8f5] mb-1">Reflawood Dashboard</h1>
            <p className="text-[#fef8f5] text-sm opacity-90">Professional Wood Furniture Management System</p>
          </div>
          <div className="text-right">
            <p className="text-[#fef8f5] text-sm opacity-75">Welcome back!</p>
            <p className="text-[#fef8f5] text-xs opacity-60">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1  gap-8 p-8 overflow-auto"  style={{ backgroundColor: '#f5f1ed' }}>
        <section className="p-9 ">
          <h2 className="text-2xl font-semibold mb-6 text-Text border-b-2 border-Text pb-2">Dashboard Capabilities</h2>
          <div className="space-y-6">
            <div className="p-4 rounded-sm shadow-sm" style={{ backgroundColor: '#432219' }}>
              <h3 className="text-white font-semibold mb-2 text-lg">Product Management</h3>
              <p className="text-white text-sm opacity-90 leading-relaxed">
                Add new mirrors and tables to your collection with detailed specifications, 
                pricing information, and high-quality product images for comprehensive inventory tracking.
              </p>
            </div>
            <div className="p-4 rounded-sm shadow-sm" style={{ backgroundColor: '#432219' }}>
              <h3 className="text-white font-semibold mb-2 text-lg">Advanced Organization</h3>
              <p className="text-white text-sm opacity-90 leading-relaxed">
                Organize products by categories, materials, dimensions, and price ranges. 
                Create custom tags and filters to efficiently manage your extensive furniture catalog.
              </p>
            </div>
            <div className="p-4 rounded-sm shadow-sm" style={{ backgroundColor: '#432219' }}>
              <h3 className="text-white font-semibold mb-2 text-lg">Inventory Cleanup</h3>
              <p className="text-white text-sm opacity-90 leading-relaxed">
                Remove old mirrors and tables from your collection with smart archiving options. 
                Track discontinued items and maintain clean, up-to-date product listings.
              </p>
            </div>
          </div>
        </section>

  
        {/* Quick Actions */}
     
      </main>

      {/* Enhanced Footer */}
      <footer className="py-4 px-8" style={{ backgroundColor: '#432219' }}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[#fef8f5] text-sm font-medium">Reflawood Dashboard</p>
            <p className="text-[#fef8f5] text-xs opacity-75">Manage your wood mirror and table business with precision</p>
          </div>
          <div className="text-right">
            <p className="text-[#fef8f5] text-xs opacity-60">Crafted for Professional Woodworkers</p>
          </div>
        </div>
      </footer>
    </div>

  )
}