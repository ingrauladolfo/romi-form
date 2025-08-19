import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../shared/Loading'
import type { FormState, SymptomItem } from '../../interfaces/components/SymptomForm'
import { validateInputs } from '../../utils/validateInputs'
import { useLanguage } from '../../context'
import { textSymptomForm } from '../../assets/data/components/SymptomForm'
import { api } from '../../assets/api'
import { getBaseButton, getButtonWebsiteLinks } from '../../assets/styles/Home'

const getCDMXDate = () =>
  new Date().toLocaleDateString('en-CA', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }) // YYYY-MM-DD

const getInitialState = (): FormState => ({
  patientName: '',
  age: 0,
  email: '',
  phone: '',
  onsetDate: getCDMXDate(),
  symptoms: {},
  painLevel: {},
  notes: ''
})

const generateId = () => Math.random().toString(16).slice(2, 6)

type LabelShape = { es: string; en: string }
const toLabelShape = (raw: string | LabelShape | undefined): LabelShape =>
  typeof raw === 'string' ? { es: raw, en: raw } : raw ?? { es: '', en: '' }

type ThemeProp = 'light' | 'dark' | string

export default function SymptomForm({ theme }: { theme?: ThemeProp }) {
  const { lang } = useLanguage()
  const t = textSymptomForm[lang]
  const navigate = useNavigate()
  const redirectTimer = useRef<number | null>(null)

  const [form, setForm] = useState<FormState>(getInitialState())
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState<any | null>(null)

  const [symptomList, setSymptomList] = useState<(SymptomItem & { labelTrans?: LabelShape })[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)

  // modal and bottom message state
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showBottomMessage, setShowBottomMessage] = useState<boolean>(false)

  const isDark = theme === 'dark'
  const containerCls = isDark ? 'bg-gray-950 text-gray-100' : 'bg-gray-100 text-black'
  const inputCls = isDark
    ? 'mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-300 bg-slate-800 text-white'
    : 'mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white text-black'
  const cardCls = isDark ? 'p-2 bg-slate-800 text-white rounded' : 'p-2 bg-white text-black rounded'
  const asideCls = isDark ? 'mt-6 p-4 border rounded bg-slate-900 text-gray-100' : 'mt-6 p-4 border rounded bg-slate-50 text-black'

  useEffect(() => {
    return () => {
      if (redirectTimer.current) {
        window.clearTimeout(redirectTimer.current)
      }
    }
  }, [])

  useEffect(() => {
    let mounted = true
    setLoading(true)
    api
      .get<SymptomItem[]>('/symptoms')
      .then(res => {
        if (!mounted) return
        const normalized = res.data.map(s => {
          const rawLabel = (s as any).label
          const labelTrans = toLabelShape(rawLabel)
          return { ...s, labelTrans }
        })
        setSymptomList(normalized)
        if (Object.keys(form.symptoms).length === 0) {
          const record: Record<string, boolean> = {}
          normalized.forEach(s => (record[s.key] = false))
          setForm(prev => ({ ...prev, symptoms: record }))
        }
      })
      .catch(() => {
        if (!mounted) return
        setFetchError(t.fetchError)
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const tmp = { ...form, notes: form.notes || '' }
      const result = validateInputs(tmp, lang)
      setErrors(result.errors)
    }
  }, [lang])

  function handleCheckbox(key: string) {
    setForm(prev => ({
      ...prev,
      symptoms: { ...prev.symptoms, [key]: !prev.symptoms[key] }
    }))
  }

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function validate(): boolean {
    const tmp = { ...form, notes: form.notes || '' }
    const result = validateInputs(tmp, lang)
    setErrors(result.errors)
    return result.isValid
  }

  function handlePainLevel(symptomKey: string, value: number) {
    setForm(prev => ({
      ...prev,
      painLevel: { ...prev.painLevel, [symptomKey]: value }
    }))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitError(null)
    setSubmitSuccess(null)
    if (!validate()) return

    const selectedKeys = Object.entries(form.symptoms).filter(([, v]) => v).map(([k]) => k)

    const symptomsPayload = selectedKeys.map(k => {
      const item = symptomList?.find(s => s.key === k)
      const labelTrans = item?.labelTrans ?? toLabelShape((item as any)?.label)
      const labelStr = typeof labelTrans === 'string' ? labelTrans : (labelTrans[lang] || labelTrans.es)
      const level = Number(form.painLevel?.[k] ?? 0)
      return { key: k, label: labelStr, level }
    })

    const payload: Record<string, any> = {
      id: generateId(),
      patientName: form.patientName.trim(),
      age: form.age,
      email: form.email.trim(),
      phone: form.phone.trim(),
      onsetDate: form.onsetDate,
      symptoms: symptomsPayload,
      createdAt: new Date().toISOString()
    }
    const notesTrim = form.notes?.trim()
    if (notesTrim) payload.notes = notesTrim

    try {
      setSubmitLoading(true)
      const res = await api.post('/prescription', payload, { timeout: 10000 })

      const resultData = res.data ?? payload
      setSubmitted(resultData)
      setSubmitSuccess(t.submitSuccess ?? (lang === 'es' ? 'Registro enviado con éxito.' : 'Record sent successfully.'))

      // show modal with data (do NOT auto-redirect)
      setShowModal(true)
      // reset form
      const resetSymptoms: Record<string, boolean> = {}
      Object.keys(form.symptoms).forEach(k => (resetSymptoms[k] = false))
      setForm({ ...getInitialState(), symptoms: resetSymptoms })
      setErrors({})
    } catch (err) {
      console.error(err)
      setSubmitError(t.submitError)
    } finally {
      setSubmitLoading(false)
    }
  }

  if (loading) return <Loading />

  const renderSymptomsText = (symptomsArr: any[]) =>
    symptomsArr && symptomsArr.length
      ? symptomsArr
          .map(s => {
            const label = typeof s.label === 'string' ? s.label : s.label?.[lang] || s.label?.es || ''
            return `${label} (nivel ${s.level})`
          })
          .join(', ')
      : '—'

  return (
    <section aria-labelledby="form-title" className={`${containerCls} shadow-sm rounded p-6`}>
      <h2 id="form-title" className="sr-only">{t.symptoms}</h2>

      <form onSubmit={onSubmit} className="space-y-6" noValidate aria-busy={submitLoading}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium">{t.patientName}</span>
            <input
              aria-invalid={!!errors.patientName}
              aria-describedby={errors.patientName ? 'err-name' : undefined}
              value={form.patientName}
              onChange={e => handleChange('patientName', e.target.value)}
              className={inputCls}
              placeholder={t.patientName}
              required
              disabled={submitLoading}
            />
            {errors.patientName && (
              <span id="err-name" role="alert" className="text-xs text-red-600 mt-1">
                {errors.patientName}
              </span>
            )}
          </label>

          <label className="flex flex-col">
            <span>{t.age}</span>
            <input
              type="number"
              value={form.age}
              onChange={e => {
                const raw = e.target.value.trim()
                if (raw === '') {
                  handleChange('age', 0)
                  return
                }
                const sanitizedValue = raw.replace(/^0+(?=\d)/, '')
                const numericValue = Number(sanitizedValue)
                if (!isNaN(numericValue) && numericValue >= 0) {
                  handleChange('age', numericValue)
                }
              }}
              className={inputCls}
            />
            {errors.age && <span className="text-red-600 text-xs">{errors.age}</span>}
          </label>

          <div className="flex flex-col">
            <span className="text-sm font-medium">{t.onsetDate}</span>
            <input
              type="date"
              value={form.onsetDate}
              readOnly
              className={inputCls}
              disabled
            />
          </div>

          <label className="flex flex-col">
            <span className="text-sm font-medium">{t.email}</span>
            <input
              type="email"
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
              className={inputCls}
              placeholder={t.email}
              required
              disabled={submitLoading}
            />
            {errors.email && (<span role="alert" className="text-xs text-red-600 mt-1"> {errors.email} </span>)}
          </label>
        </div>

        <label className="flex flex-col">
          <span>{t.phone}</span>
          <input
            type="tel"
            value={form.phone}
            onChange={e => handleChange('phone', e.target.value)}
            className={inputCls}
            placeholder={t.phone}
            required
          />
          {errors.phone && <span className="text-red-600 text-xs">{errors.phone}</span>}
        </label>

        {fetchError && <p className="text-sm text-red-500 mt-2">{fetchError}</p>}

        <fieldset className="border rounded p-3">
          <legend className="flex items-center justify-between">
            <span className="font-medium">{t.symptoms}</span>
            {errors.symptoms && (
              <span className="text-red-600 text-xs ml-3" role="alert">
                {errors.symptoms}
              </span>
            )}
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {(symptomList || []).map(s => {
              const labelObj = s.labelTrans ?? toLabelShape((s as any).label)
              return (
                <div key={s.key} className={cardCls}>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!form.symptoms[s.key]}
                      onChange={() => handleCheckbox(s.key)}
                    />
                    {labelObj[lang]}
                  </label>
                  {form.symptoms[s.key] && (
                    <div className="mt-2">
                      <label className="text-xs block mb-1">
                        {t.painLevelLabel}: {form.painLevel[s.key] ?? 0}
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        value={form.painLevel[s.key] ?? 0}
                        onChange={e => handlePainLevel(s.key, Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </fieldset>

        <div className="flex flex-col">
          <label className="text-sm font-medium">{t.notes}</label>
          <textarea
            value={form.notes}
            onChange={e => handleChange('notes', e.target.value)}
            rows={4}
            placeholder={t.notes}
            className={inputCls}
            disabled={submitLoading}
          />
          {errors.notes && <span className="text-red-600 text-xs">{errors.notes}</span>}
        </div>

        <div className="flex gap-3 items-center">
          <button
            type="submit"
            className={`${getBaseButton()} ${getButtonWebsiteLinks(theme === 'dark' ? 'dark' : 'light')}  w-48 
            text-center 
            text-xl 
            px-6 
            py-3`}
            aria-label={t.submit}
            disabled={submitLoading}
          >
            {submitLoading ? t.submitting : t.submit}
          </button>

          <button
            type="button"
            onClick={() => {
              const resetSymptoms: Record<string, boolean> = {}
              Object.keys(form.symptoms).forEach(k => (resetSymptoms[k] = false))
              setForm({ ...getInitialState(), symptoms: resetSymptoms })
              setErrors({})
              setSubmitError(null)
              setSubmitSuccess(null)
            }}
            className={`${getBaseButton()} ${getButtonWebsiteLinks(theme === 'dark' ? 'dark' : 'light')}  w-48 
            text-center 
            text-xl 
            px-6 
            py-3`}
            disabled={submitLoading}
          >
            {t.clear}
          </button>

          <div className="ml-auto text-xs text-slate-400">{t.requiredHint}</div>
        </div>

        {submitError && <p className="text-sm text-red-500 mt-2">{submitError}</p>}
      </form>

      {submitted && (
        <aside className={asideCls} aria-live="polite">
          <h3 className="font-semibold">{t.recordSent}</h3>
          <p className="text-sm">{t.patientName}: {submitted.patientName}</p>
          <p className="text-sm">{t.age}: {submitted.age ?? '—'}</p>
          <p className="text-sm">{t.email}: {submitted.email ?? '—'}</p>
          <p className="text-sm">{t.phone}: {submitted.phone ?? '—'}</p>
          <p className="text-sm">{t.onsetDate}: {submitted.onsetDate}</p>
          <p className="text-sm">
            {t.symptoms}: {renderSymptomsText(submitted.symptoms || [])}
          </p>
          <p className="text-sm">{t.notes}: {submitted.notes || '—'}</p>
        </aside>
      )}

      {/* Modal */}
      {showModal && submitted && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative max-w-lg w-full mx-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 z-10">
            {/* X close (explicit, triggers bottom message) */}
            <button
              aria-label={lang === 'es' ? 'Cerrar y permanecer' : 'Close and stay'}
              onClick={() => {
                setShowModal(false)
                setShowBottomMessage(true)
              }}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white"
            >
              ✕
            </button>

            {/* success text inside modal */}
            <h3 className="text-lg font-semibold mb-2">
              {submitSuccess ?? (lang === 'es' ? 'Registro enviado con éxito.' : 'Record sent successfully.')}
            </h3>
            <p className="text-sm text-green-500 mb-3">
              {submitSuccess ?? (lang === 'es' ? 'Registro enviado con éxito.' : 'Record sent successfully.')}
            </p>

            <div className="text-sm space-y-1 mb-4 text-slate-700 dark:text-slate-200">
              <p><strong>{t.patientName}:</strong> {submitted.patientName}</p>
              <p><strong>{t.age}:</strong> {submitted.age ?? '—'}</p>
              <p><strong>{t.email}:</strong> {submitted.email ?? '—'}</p>
              <p><strong>{t.phone}:</strong> {submitted.phone ?? '—'}</p>
              <p><strong>{t.onsetDate}:</strong> {submitted.onsetDate}</p>
              <p><strong>{t.symptoms}:</strong> {renderSymptomsText(submitted.symptoms || [])}</p>
              <p><strong>{t.notes}:</strong> {submitted.notes || '—'}</p>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false)
                  navigate(lang === 'es' ? '/ver-sintomas' : '/list-symptoms', { replace: true })
                }}
                className={`${getBaseButton()} ${getButtonWebsiteLinks(theme === 'dark' ? 'dark' : 'light')}`}
              >
                {lang === 'es' ? 'Ir a ver los síntomas' : 'Go to view symptoms'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowModal(false)
                  navigate('/', { replace: true })
                }}
                className={`${getBaseButton()} ${getButtonWebsiteLinks(theme === 'dark' ? 'dark' : 'light')}`}
              >
                {lang === 'es' ? 'Ir a casa' : 'Go home'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom message: only shown when user explicitly clicked X (stay on page) */}
      {showBottomMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 max-w-3xl w-[calc(100%-2rem)]">
          <div className="rounded border px-4 py-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-md flex items-center justify-between">
            <div className="text-sm">
              {submitSuccess ?? (lang === 'es' ? 'Registro enviado con éxito.' : 'Record sent successfully.')}
            </div>
            <button
              aria-label={lang === 'es' ? 'Cerrar mensaje' : 'Dismiss message'}
              onClick={() => setShowBottomMessage(false)}
              className="ml-4 text-slate-500 hover:text-slate-700 dark:text-slate-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
