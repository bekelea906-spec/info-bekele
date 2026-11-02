import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Heart, LockKeyhole, Send, Sparkles } from 'lucide-react'
import { ACADEMIC_YEARS } from './config/googleForm'
import { submitFeedback } from './services/googleFormsService'

const translations = {
  am: {
    language: 'አማርኛ',
    title: 'የንስሐ አባት',
    subtitle: 'Spiritual Father Feedback System',
    intro: 'የንስሐ አባት አሰራርና አገልግሎት እንዲህ እንዲሆን የምትሹት ወይም ማንኛውም ማሻሻያ ሀሳብ፣ አስተያየት ወይም ጥቆማ ካላችሁ በነፃነት መግለጽ ትችላላችሁ።',
    introTwo: 'አስተያየት ለመስጠት ሁሉም ሰው ይችላል፤ ግን በአክብሮት፣ በእውነትና በፍቅር መሆን አለበት።',
    formTitle: 'አስተያየትዎን ያካፍሉ',
    formHint: 'የእርስዎ ግብዓት አገልግሎቱን ለማሻሻል ይረዳል።',
    year: 'የትምህርት ዓመት',
    choose: 'የትምህርት ዓመትዎን ይምረጡ',
    feedback: 'አስተያየት፣ ሐሳብ እና ጥቆማ',
    placeholder: 'እባክዎ የንስሐ አባት አሰራርና አገልግሎት ላይ ያለዎትን አስተያየት፣ የማሻሻያ ሐሳብ ወይም ጥቆማ በነፃነት ይግለጹ።',
    send: 'አስተያየት ላክ',
    sending: 'በመላክ ላይ...',
    requiredYear: 'እባክዎ የትምህርት ዓመትዎን ይምረጡ።',
    requiredFeedback: 'እባክዎ አስተያየትዎን ያስገቡ።',
    minFeedback: 'ቢያንስ 3 ቁምፊዎችን ያስገቡ።',
    maxFeedback: 'ከ1000 ቁምፊዎች በላይ አይጠቀሙ።',
    error: 'መረጃውን መላክ አልተሳካም። እባክዎ እንደገና ይሞክሩ።',
    successTitle: '🙏 እናመሰግናለን!',
    success: 'አስተያየትዎ ወደ Google Forms ለመላክ ተሞክሯል። በአሳሹ ደህንነት ምክንያት መመዝገቡን ማረጋገጥ አንችልም።',
  },
  en: {
    language: 'English',
    title: 'Spiritual Father',
    subtitle: 'Feedback System',
    intro: 'If you have opinions, suggestions, or recommendations about how the Spiritual Father’s activities and services can improve, please share them freely.',
    introTwo: 'Everyone is welcome to give feedback; it should be shared with respect, truth, and love.',
    formTitle: 'Share your feedback',
    formHint: 'Your input helps improve the service.',
    year: 'Academic Year',
    choose: 'Select your academic year',
    feedback: 'Feedback, Ideas & Suggestions',
    placeholder: 'Please freely share your opinions, suggestions, and recommendations for improving the Spiritual Father’s activities and services.',
    send: 'Submit Feedback',
    sending: 'Submitting...',
    requiredYear: 'Please select your academic year.',
    requiredFeedback: 'Please enter your feedback.',
    minFeedback: 'Please enter at least 3 characters.',
    maxFeedback: 'Please use no more than 1000 characters.',
    error: 'Your feedback could not be submitted. Please try again.',
    successTitle: '🙏 Thank you!',
    success: 'Your feedback was sent to Google Forms. Because of browser security, we cannot confirm that it was recorded.',
  },
}

const years = [
  ['First Year', '1ኛ ዓመት'],
  ['Second Year', '2ኛ ዓመት'],
  ['Third Year', '3ኛ ዓመት'],
  ['Fourth Year', '4ኛ ዓመት'],
  ['Fifth Year', '5ኛ ዓመት'],
]

function App() {
  const [locale, setLocale] = useState('am')
  const [academicYear, setAcademicYear] = useState('')
  const [feedback, setFeedback] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const submissionStarted = useRef(false)
  const t = translations[locale]

  useEffect(() => {
    document.documentElement.lang = locale === 'am' ? 'am' : 'en'
    document.documentElement.dir = 'ltr'
  }, [locale])

  function validate() {
    const next = {}
    if (!academicYear) next.academicYear = t.requiredYear
    const trimmed = feedback.trim()
    if (!trimmed) next.feedback = t.requiredFeedback
    else if (trimmed.length < 3) next.feedback = t.minFeedback
    else if (trimmed.length > 1000) next.feedback = t.maxFeedback
    if (academicYear && !ACADEMIC_YEARS.includes(academicYear)) next.academicYear = t.requiredYear
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (status === 'sending' || submissionStarted.current || !validate()) return
    submissionStarted.current = true
    setStatus('sending')
    try {
      await submitFeedback({ academicYear, feedback: feedback.trim() })
      setAcademicYear('')
      setFeedback('')
      setErrors({})
      setStatus('success')
    } catch {
      submissionStarted.current = false
      setStatus('error')
    }
  }

  return (
    <main className="page-shell" dir="ltr">
      <header className="site-header" dir="ltr">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-mark"><Heart size={22} fill="currentColor" /></div>
            <div><h1>{t.title}</h1><p>{t.subtitle}</p></div>
          </div>
          <label className="language-control">
            <span className="sr-only">Language</span>
            <select value={locale} onChange={(event) => setLocale(event.target.value)} aria-label="Language">
              <option value="am">አማርኛ</option>
              <option value="en">English</option>
            </select>
          </label>
        </div>
      </header>

      <section className="content">
        <div className="intro-card">
          <Sparkles className="intro-icon" size={22} aria-hidden="true" />
          <div><p>{t.intro}</p><p>{t.introTwo}</p></div>
        </div>

        <section className="form-card" aria-labelledby="form-title">
          <div className="form-heading"><div><p className="eyebrow">{locale === 'am' ? 'አስተያየት' : 'FEEDBACK'}</p><h2 id="form-title">{t.formTitle}</h2><p>{t.formHint}</p></div><div className="lock"><LockKeyhole size={20} /></div></div>
          {status === 'success' ? <div className="success-panel" role="status"><Heart size={44} fill="currentColor" /><h2>{t.successTitle}</h2><p>{t.success}</p><button className="secondary-button" onClick={() => { submissionStarted.current = false; setStatus('idle') }}>{locale === 'am' ? 'ሌላ አስተያየት ይስጡ' : 'Send another response'}</button></div> : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="field"><label htmlFor="academic-year">{t.year} <span>*</span></label><div className="select-wrap"><select id="academic-year" value={academicYear} onChange={(event) => { setAcademicYear(event.target.value); setErrors((current) => ({ ...current, academicYear: undefined })) }} aria-invalid={Boolean(errors.academicYear)} aria-describedby={errors.academicYear ? 'year-error' : undefined}><option value="">{t.choose}</option>{years.map(([english, amharic]) => <option key={english} value={english}>{locale === 'am' ? amharic : english}</option>)}</select><ChevronDown size={18} aria-hidden="true" /></div>{errors.academicYear && <p className="field-error" id="year-error">{errors.academicYear}</p>}</div>
              <div className="field"><label htmlFor="feedback">{t.feedback} <span>*</span></label><textarea id="feedback" rows="7" maxLength="1000" value={feedback} onChange={(event) => { setFeedback(event.target.value); setErrors((current) => ({ ...current, feedback: undefined })) }} placeholder={t.placeholder} aria-invalid={Boolean(errors.feedback)} aria-describedby={errors.feedback ? 'feedback-error feedback-count' : 'feedback-count'} />{errors.feedback && <p className="field-error" id="feedback-error">{errors.feedback}</p>}<div className="field-meta" id="feedback-count"><span>{feedback.length}/1000</span><span>{locale === 'am' ? 'ቢያንስ 3 ቁምፊዎች' : 'Minimum 3 characters'}</span></div></div>
              {status === 'error' && <div className="alert" role="alert">{t.error}</div>}
              <button className="submit-button" type="submit" disabled={status === 'sending'}><Send size={18} aria-hidden="true" />{status === 'sending' ? t.sending : t.send}</button>
              <p className="privacy-note"><LockKeyhole size={14} /> {locale === 'am' ? 'መልስዎ በGoogle Forms በኩል ብቻ ይላካል።' : 'Your response is sent only through Google Forms.'}</p>
            </form>
          )}
        </section>
        <footer>{locale === 'am' ? 'በአክብሮት፣ በእውነትና በፍቅር' : 'With respect, truth, and love'}</footer>
      </section>
    </main>
  )
}

export default App
