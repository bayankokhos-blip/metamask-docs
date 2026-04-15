import React, { useState } from 'react'
import styles from './styles.module.css'

type Rating = 'yes' | 'no' | null
type Phase = 'initial' | 'comment' | 'submitted' | 'error'

function stripHtml(text: string): string {
  let prev = text
  for (;;) {
    const next = prev.replace(/<[^>]*>/g, '')
    if (next === prev) return next
    prev = next
  }
}

function sanitizeReason(text: string): string {
  return stripHtml(text)
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .trim()
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export default function FeedbackWidget(): React.ReactNode {
  const [rating, setRating] = useState<Rating>(null)
  const [phase, setPhase] = useState<Phase>('initial')
  const [reason, setReason] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const reasonIsEmpty = !sanitizeReason(reason)

  const handleRating = (selected: Rating) => {
    setRating(selected)
    setPhase('comment')
  }

  const handleSubmit = async () => {
    if (rating === 'no' && reasonIsEmpty) return
    setSubmitting(true)

    window.dataLayer?.push({
      event: 'docs_feedback',
      page_url: window.location.pathname,
      rating,
      reason: reason.trim(),
    })

    try {
      const res = await fetch('/api/docs-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_url: window.location.pathname,
          rating,
          reason: reason.trim(),
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error || `Request failed (${res.status})`)
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Something went wrong. Please try again later.'
      )
      setPhase('error')
      setSubmitting(false)
      return
    }

    setPhase('submitted')
    setSubmitting(false)
  }

  if (phase === 'submitted') {
    return (
      <div className={styles.widget}>
        <p className={styles.thanks}>Thanks for your feedback!</p>
      </div>
    )
  }

  if (phase === 'error') {
    return (
      <div className={styles.widget}>
        <p className={styles.error}>{errorMsg}</p>
      </div>
    )
  }

  return (
    <div className={styles.widget}>
      {phase === 'initial' && (
        <>
          <p className={styles.prompt}>Was this page helpful?</p>
          <div className={styles.buttons}>
            <button type="button" className={styles.ratingBtn} onClick={() => handleRating('yes')}>
              Yes
            </button>
            <button type="button" className={styles.ratingBtn} onClick={() => handleRating('no')}>
              No
            </button>
          </div>
        </>
      )}

      {phase === 'comment' && (
        <div className={styles.commentSection}>
          <label htmlFor="feedback-reason" className={styles.label}>
            {rating === 'yes' ? 'What worked well? (optional)' : 'What went wrong?'}
          </label>
          <textarea
            id="feedback-reason"
            className={styles.textarea}
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder={
              rating === 'yes' ? 'Tell us what you liked...' : 'Tell us what we can improve...'
            }
            maxLength={1000}
            rows={3}
            required={rating === 'no'}
          />
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={submitting || (rating === 'no' && reasonIsEmpty)}>
              {submitting ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
