type ProgressBarProps = {
  current: number
  total: number
}

function ProgressBar({
  current,
  total,
}: ProgressBarProps) {
  const percent = (current / total) * 100

  return (
    <div className="question-progress">
      <div className="question-progress-track">
        <div
          className="question-progress-value"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>

      <span>
        {current} / {total}
      </span>
    </div>
  )
}

export default ProgressBar