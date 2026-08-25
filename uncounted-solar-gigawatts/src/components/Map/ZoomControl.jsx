import { useMap } from "@vis.gl/react-google-maps";
import "./css/ZoomControl.css";

function ZoomControls() {
  const map = useMap();

  const zoomIn = () => {
    if (!map) return;

    const zoom = map.getZoom() ?? 12;
    map.setZoom(zoom + 1);
  };

  const zoomOut = () => {
    if (!map) return;

    const zoom = map.getZoom() ?? 12;
    map.setZoom(zoom - 1);
  };

  return (
    <div className="zoom-controls">
      <button
        type="button"
        onClick={zoomIn}
        aria-label="Zoom in"
      >
        +
      </button>

      <button
        type="button"
        onClick={zoomOut}
        aria-label="Zoom out"
      >
        −
      </button>
    </div>
  );
}

export default ZoomControls;