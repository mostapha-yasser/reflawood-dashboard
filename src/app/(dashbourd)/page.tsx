"use client"

export default function Reflawood() {
  return (
    <div
      className="max-h-screen h-screen flex flex-col w-full overflow-hidden"
    >
      {/* Header */}
      <header
        className="py-6 px-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1
              className="text-xl md:text-3xl font-bold mb-1"
            >
              Reflawood Dashboard
            </h1>
            <p
              className="text-sm opacity-90"
            >
              Professional Wood Furniture Management System
            </p>
          </div>
          <div className="text-right">
            <p
              className="text-sm opacity-75"
            >
              Welcome back!
            </p>
            <p
              className="text-xs opacity-60 text-nowrap"
            >
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 grid grid-cols-1 gap-8 p-8 overflow-auto">
        <section className="p-9">
          <h2
            className="text-2xl font-semibold mb-6 border-b-2 pb-2"
            style={{
              color: "var(--color-Text)",
              borderColor: "var(--color-main)",
            }}
          >
            Dashboard Capabilities
          </h2>

          <div className="space-y-6">
            <div
              className="p-4 rounded-sm shadow-sm"
              style={{ backgroundColor: "var(--color-main)" }}
            >
              <h3
                className="font-semibold mb-2 text-lg"
                style={{ color: "var(--color-Background)" }}
              >
                Product Management
              </h3>
              <p
                className="text-sm opacity-90 leading-relaxed"
                style={{ color: "var(--color-Background)" }}
              >
                Add new mirrors and tables to your collection with detailed
                specifications, pricing information, and high-quality product
                images for comprehensive inventory tracking.
              </p>
            </div>

            <div
              className="p-4 rounded-sm shadow-sm"
              style={{ backgroundColor: "var(--color-main)" }}
            >
              <h3
                className="font-semibold mb-2 text-lg"
                style={{ color: "var(--color-Background)" }}
              >
                Advanced Organization
              </h3>
              <p
                className="text-sm opacity-90 leading-relaxed"
                style={{ color: "var(--color-Background)" }}
              >
                Organize products by categories, materials, dimensions, and price
                ranges. Create custom tags and filters to efficiently manage
                your extensive furniture catalog.
              </p>
            </div>

            <div
              className="p-4 rounded-sm shadow-sm"
              style={{ backgroundColor: "var(--color-main)" }}
            >
              <h3
                className="font-semibold mb-2 text-lg"
                style={{ color: "var(--color-Background)" }}
              >
                Inventory Cleanup
              </h3>
              <p
                className="text-sm opacity-90 leading-relaxed"
                style={{ color: "var(--color-Background)" }}
              >
                Remove old mirrors and tables from your collection with smart
                archiving options. Track discontinued items and maintain clean,
                up-to-date product listings.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="py-4 px-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <p
              className="text-sm font-medium"
            >
              Reflawood Dashboard
            </p>
            <p
              className="text-xs opacity-75"
            >
              Manage your wood mirror and table business with precision
            </p>
          </div>
          <div className="text-right">
            <p
              className="text-xs opacity-60"
            >
              Crafted for Professional Woodworkers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
