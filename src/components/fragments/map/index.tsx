import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

export const Map: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <MapContainer
            center={[-6.193627, 106.823214]}
            zoom={13}
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {children}
        </MapContainer>
    )
}