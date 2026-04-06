import { useEffect, useState } from "react"
import { fetchVehicle } from "../services/api";
import VehicleCard from "../components/VehicleCard";

export default function HomePage() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadVehicle() {
      try {
        const data = await fetchVehicle();
        setVehicles(data);
      } catch (error) {
        console.error('Error loading vehicle', error);
      } finally {
        setLoading(false);
      }
    }

    loadVehicle();
  }, []);

  if (loading) {
    return <p>Loading...</p>
  }

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <section className="search-section">
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Car search..."
          />
          <p className="search-count">
            Cars found: <strong>{filteredVehicles.length}</strong>
          </p>
        </div>
      </section>

      <main className="vehicles-grid">
        {filteredVehicles.length === 0 ? (
          <p>Unfortunately, nothing was found for your query.</p>
        ) : (
          filteredVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))
        )}
      </main>


    </>
  )
}
