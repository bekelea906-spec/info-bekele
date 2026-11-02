const FORM_ID = '1FAIpQLScHNH8aT6xm1Dh84L6800a8u6bk-gkj9rWBefhvSdXaOlk2Jw'

export const GOOGLE_FORM_CONFIG = {
  endpoint: `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`,
  fields: {
    academicYear: 'entry.116927091',
    feedback: 'entry.948915635',
  },
}

export function submitFeedback({ academicYear, feedback }) {
  const iframe = document.createElement('iframe')
  iframe.name = `google-form-submit-${Date.now()}`
  iframe.title = 'Google Forms submission'
  iframe.hidden = true
  document.body.appendChild(iframe)

  const form = document.createElement('form')
  form.method = 'POST'
  form.action = GOOGLE_FORM_CONFIG.endpoint
  form.target = iframe.name
  form.hidden = true

  const fields = [
    [GOOGLE_FORM_CONFIG.fields.academicYear, academicYear],
    [GOOGLE_FORM_CONFIG.fields.feedback, feedback],
  ].filter(([name]) => Boolean(name))

  for (const [name, value] of fields) {
    const input = document.createElement('input')
    input.name = name
    input.value = value
    form.appendChild(input)
  }

  document.body.appendChild(form)
  form.submit()
  window.setTimeout(() => {
    form.remove()
    iframe.remove()
  }, 10000)

  return { status: 'attempted' }
}
