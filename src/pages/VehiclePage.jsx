import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { fetchVehicleById } from "../services/api";
import { Link } from "react-router-dom";
import { MoveLeft, RefreshCcw, ShieldCheck, Star, Van } from "lucide-react";

export default function VehiclePage() {
  const { vehicleId } = useParams();
  const storageKey = `comments_${vehicleId}`;

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [localeComments, setLocaleComments] = useState([]);
  const [rating, setRating] = useState(5);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    async function loadVehicle() {
      try {
        const data = await fetchVehicleById(vehicleId);
        setVehicle(data);
        setActiveImage(data.thumbnail);

        const saved = localStorage.getItem(storageKey);

        if (saved) {
          const parsedComments = JSON.parse(saved);
          setLocaleComments(parsedComments);
        }
      } catch (error) {
        console.error('Error loading vehicle:', error);
      } finally {
        setLoading(false);
      }
    }

    loadVehicle();
  }, [vehicleId, storageKey]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!vehicle) {
    return <p>Vehicle not found</p>;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (userName.trim().length < 2) {
      return;
    }

    const newComment = {
      user: userName,
      text: commentText,
      rating: rating,
      date: new Date().toLocaleDateString()
    };

    const updateComments = [...localeComments, newComment];
    setLocaleComments(updateComments);

    localStorage.setItem(storageKey, JSON.stringify(updateComments));

    setUserName('');
    setCommentText('');
    setRating(5);
  }

  return (
    <main className="vehicle-details">
      <Link to="/" className="back-to-catalog"><MoveLeft /> Back to catalog</Link>

      <section className="vehicle-main">
        <div className="gallery">
          <img
            className="main-image"
            src={activeImage}
            alt={vehicle.title}
          />

          <div className="thumbnails-images">
            {vehicle.images.map((img, index) => (
              <img
                className={`thumbnail-item ${activeImage === img ? 'selected' : ''}`} 
                key={index}
                src={img}
                alt="small img"
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="vehicle-info">
          <span className="vehicle-brand">{vehicle.brand}</span>
          <h2 className="vehicle-name">{vehicle.title}</h2>
          <p className="vehicle-sku">Article: {vehicle.sku}</p>

          <div className="price-box">
            <p className="price">${vehicle.price.toLocaleString()}</p>
            <p className="discount-tag">Discount {vehicle.discountPercentage.toLocaleString()}%</p>
          </div>

          <div className="services">
            <p className="service-item"><Van size={20} color="blueviolet" /> {vehicle.shippingInformation}</p>
            <p className="service-item"><ShieldCheck size={20} color="blueviolet" /> {vehicle.warrantyInformation}</p>
            <p className="service-item"><RefreshCcw size={20} color="blueviolet" /> {vehicle.returnPolicy}</p>
          </div>
        </div>
      </section>



      <section className="vehicle-specs">
        <h2 className="section-title">Description</h2>
        <p className="vehicle-description">{vehicle.description}</p>

        <h2 className="section-title">Technical specifications</h2>

        <div className="specs">
          <div className="spec-box">
            <p className="spec-label">Category:</p>
            <p className="spec-value">{vehicle.category.toUpperCase()}</p>
          </div>
          <div className="spec-box">
            <p className="spec-label">Weight:</p>
            <p className="spec-value">{vehicle.weight} tons</p>
          </div>
          <div className="spec-box">
            <p className="spec-label">Dimensions (WxHxD):</p>
            <p className="spec-value">
              {vehicle.dimensions?.width}" x {vehicle.dimensions?.height}" x {vehicle.dimensions?.depth}"
            </p>
          </div>
          <div className="spec-box">
            <p className="spec-label">Availability:</p>
            <p className="spec-value">
              {vehicle.stock} pcs. ({vehicle.availabilityStatus})
            </p>
          </div>
        </div>
      </section>

      <h2 className="section-title">Reviews</h2>
      <section className="vehicle-reviews">

        <form className="review-form" onSubmit={handleSubmit}>
          <h3 className="form-title">Leave a comment</h3>

          <div className="rating-select">
            <div className="rating-box">
              <p className="form-rating">Your rating:</p>
              <div className="stars-row">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    size={20}
                    className={`star-icon ${star <= rating ? "active" : ""}`}
                    fill={star <= rating ? "goldenrod" : "none"}
                    stroke={star <= rating ? "goldenrod" : "grey"}
                    onClick={() => setRating(star)}
                    style={{ cursor: 'pointer', transition: '0.3s' }}
                  />
                ))}
              </div>
            </div>
            <input
              className="form-input"
              type="text"
              placeholder="Your name..."
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              required
            />

            <textarea
              className="form-textarea"
              placeholder="Your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />


            <button
              className="form-submit"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>

        <div className="reviews-list">
          {vehicle.reviews.map((rev, index) => (
            <div className="review-card" key={index}>
              <div className="review-header">
                <p className="reviewer-name"><strong>{rev.reviewerName}</strong></p>
                <p className="reviewer-rating">{"⭐".repeat(rev.rating)}</p>
              </div>

              <p className="review-date">{new Date(rev.date).toLocaleDateString()}</p>
              <p className="review-text">{rev.comment}</p>
            </div>
          ))}
          {localeComments.map((comment, index) => (
            <div className="review-card user-comment" key={index}>
              <div className="review-header">
                <p className="reviewer-name"><strong>{comment.user} (You)</strong></p>
                <p className="reviewer-rating">
                  {"⭐".repeat(comment.rating)}
                </p>
              </div>
              <p className="review-date">{comment.date}</p>
              <p className="review-text">{comment.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main >
  )
}
