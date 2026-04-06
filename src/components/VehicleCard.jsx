import { Link } from 'react-router-dom';

export default function VehicleCard({ vehicle }) {
  return (
    <article className="vehicle-card">
      <Link to={`/vehicles/${vehicle.id}`} className="card-link-wrapper">
        <div className="card-image-container">
          <img
            className="card-image"
            src={vehicle.thumbnail}
            alt={vehicle.title}
          />

          {vehicle.discountPercentage > 0 && (
            <span className="badge-discount">
              -{vehicle.discountPercentage}%
            </span>
          )}
        </div>

        <div className="card-content">
          <div className="card-header">
            <p className="brand-name">
              {vehicle.brand}
            </p>
            <h3 className="vehicle-title">
              {vehicle.title}
            </h3>
          </div>


          <div className="vehicle-rating">
            <p className="rating">⭐ {vehicle.rating}</p>
            <p className="availability">{vehicle.availabilityStatus}</p>
          </div>

          <div className="vehicle-price">
            <strong className="price">${vehicle.price.toLocaleString()}</strong>
          </div>
        </div>


        <div className="card-action">
          <span className="card-button">
            View more
          </span>

        </div>
      </Link>
    </article >

  );
}