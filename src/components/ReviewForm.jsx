import { useState } from "react";
import { addReview } from "../services/reviewService";

const ReviewForm = ({ productId, onReviewAdded }) => {
  const [review, setReview] = useState({
    username: "",
    comment: "",
    rating: 5,
  });

  const handleChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addReview({
        productId,
        username: review.username,
        comment: review.comment,
        rating: Number(review.rating),
      });

      alert("Review Submitted Successfully");

      setReview({
        username: "",
        comment: "",
        rating: 5,
      });

      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit review");
    }
  };

  return (
    <div className="mt-10 rounded-2xl border bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Write a Review
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          name="username"
          placeholder="Your Name"
          value={review.username}
          onChange={handleChange}
          required
          className="w-full rounded-xl border p-3"
        />

        <select
          name="rating"
          value={review.rating}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        >
          <option value="5">★★★★★ (5)</option>
          <option value="4">★★★★☆ (4)</option>
          <option value="3">★★★☆☆ (3)</option>
          <option value="2">★★☆☆☆ (2)</option>
          <option value="1">★☆☆☆☆ (1)</option>
        </select>

        <textarea
          rows="4"
          name="comment"
          placeholder="Write your review..."
          value={review.comment}
          onChange={handleChange}
          required
          className="w-full rounded-xl border p-3"
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700"
        >
          Submit Review
        </button>

      </form>
    </div>
  );
};

export default ReviewForm;