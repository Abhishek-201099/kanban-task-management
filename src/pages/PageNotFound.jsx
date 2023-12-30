import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="page-not-found-container">
      <p>⚠️ Page Not Found 🤕</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}
