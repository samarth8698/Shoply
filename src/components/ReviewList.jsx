import StarRating from "./StarRating";

const ReviewList = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-6 text-center">
        <h3 className="text-lg font-semibold">
          No Reviews Yet
        </h3>

        <p className="mt-2 text-slate-500">
          Be the first customer to review this product.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {reviews.map((review) => (

        <div
          key={review.id}
          className="rounded-2xl border bg-white p-6 shadow"
        >

          <div className="flex items-center justify-between">

            <h3 className="font-bold text-lg">
              {review.username}
            </h3>

            <StarRating rating={review.rating} />

          </div>

          <p className="mt-4 text-slate-600">
            {review.comment}
          </p>

        </div>

      ))}

    </div>
  );
};

export default ReviewList;