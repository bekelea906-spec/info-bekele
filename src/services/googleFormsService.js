import { ACADEMIC_YEARS, GOOGLE_FORM_CONFIG } from '../config/googleForm'

export async function submitFeedback({ academicYear, feedback }) {
  const trimmedFeedback = feedback.trim()
  if (!ACADEMIC_YEARS.includes(academicYear)) {
    throw new Error('Invalid academic year')
  }
  if (trimmedFeedback.length < 3 || trimmedFeedback.length > 1000) {
    throw new Error('Invalid feedback length')
  }

  const body = new URLSearchParams({
    [GOOGLE_FORM_CONFIG.fields.academicYear]: academicYear,
    [GOOGLE_FORM_CONFIG.fields.feedback]: trimmedFeedback,
  })

  await fetch(GOOGLE_FORM_CONFIG.endpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  return { status: 'submitted' }
}
