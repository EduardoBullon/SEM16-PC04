import { useState } from "react";
import { updateSubmission } from "../services/submission.service";

const GradeForm = ({ submissionId, onGrade }) => {
  const [grade, setGrade] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGradeSubmit = async (e) => {
    e.preventDefault();
    const parsedGrade = parseFloat(grade);
    if (isNaN(parsedGrade) || parsedGrade < 0 || parsedGrade > 20) {
      alert("La nota debe estar entre 0 y 20");
      return;
    }

    try {
      setLoading(true);
      await updateSubmission(submissionId, {
        status: "graded",
        grade: parsedGrade,
      });
      onGrade(); // recargar entregas
    } catch (err) {
      console.error("Error al calificar:", err);
      alert("No se pudo calificar la entrega.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleGradeSubmit} style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      flexWrap: 'wrap'
    }}>
      <div style={{ position: 'relative' }}>
        <input
          type="number"
          className="form-control-modern"
          placeholder="Nota (0-20)"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          min="0"
          max="20"
          step="0.1"
          required
          disabled={loading}
          style={{ 
            maxWidth: "120px",
            fontSize: '0.9rem',
            padding: '0.5rem 0.75rem'
          }}
        />
        <div style={{
          position: 'absolute',
          right: '0.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          pointerEvents: 'none'
        }}>
          /20
        </div>
      </div>
      <button 
        type="submit" 
        className="btn-modern btn-success-modern"
        disabled={loading}
        style={{ 
          fontSize: '0.9rem',
          padding: '0.5rem 1rem'
        }}
      >
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <div className="loading-spinner" style={{ width: '12px', height: '12px' }}></div>
            <span>Calificando...</span>
          </div>
        ) : (
          '📝 Calificar'
        )}
      </button>
    </form>
  );
};

export default GradeForm;
