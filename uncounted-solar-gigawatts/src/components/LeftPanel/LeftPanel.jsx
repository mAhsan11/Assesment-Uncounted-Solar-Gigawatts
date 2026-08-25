import "./LeftPanel.css";

function LeftPanel({
  selectedAOI,
  onAOIChange,
  statistics,
  loading,
  error,
}) {
  const formatNumber = (value, decimals = 2) => {
    if (value === null || value === undefined) {
      return "--";
    }

    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <aside className="left-panel">
      <section className="panel-section">
        <h2>Area of Interest (City)</h2>

        <label htmlFor="aoi-select">
          AOI
        </label>

        <select
          id="aoi-select"
          value={selectedAOI}
          onChange={(event) =>
            onAOIChange(event.target.value)
          }
        >
          <option value="ISLD">Islamabad</option>
          <option value="LHR">Lahore</option>
          <option value="KHI">Karachi</option>
        </select>

        <span className="select-type">
          Single-select
        </span>
      </section>

      <section className="panel-section">
        <h2>Summary Statistics</h2>

        {loading && (
          <div className="statistics-status">
            Loading...
          </div>
        )}

        {error && (
          <div className="statistics-error">
            <strong>Unable to load statistics</strong>
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && statistics && (
          <>
            <div className="stat-item">
              <span className="stat-label">
                Installed Capacity
              </span>

              <strong className="stat-value">
                {formatNumber(
                  statistics.installedCapacity / 1000000
                )}{" "}
                MW
              </strong>
            </div>

            <div className="stat-item">
              <span className="stat-label">
                Total Solar Area
              </span>

              <strong className="stat-value">
                {formatNumber(
                  statistics.totalSolarArea
                )}{" "}
                m²
              </strong>
            </div>

            <div className="stat-item">
              <span className="stat-label">
                Total Rooftop Area
              </span>

              <strong className="stat-value">
                {formatNumber(
                  statistics.totalRooftopArea
                )}{" "}
                m²
              </strong>
            </div>

            <div className="stat-item">
              <span className="stat-label">
                Total AOI Area
              </span>

              <strong className="stat-value">
                {formatNumber(
                  statistics.totalAOIArea
                )}{" "}
                m²
              </strong>
            </div>
          </>
        )}
      </section>
       {/* Legend */}
      <section className="panel-section legend-section">
        <h2>Legend</h2>

        <div className="legend-item">
          <span
            className="legend-color legend-boundary"
          />
          <span>AOI Boundary</span>
        </div>

        <div className="legend-item">
          <span
            className="legend-color legend-building"
          />
          <span>Buildings</span>
        </div>

        <div className="legend-item">
          <span
            className="legend-color legend-solar"
          />
          <span>Solar PV</span>
        </div>
      </section>
    </aside>
  );
}

export default LeftPanel;