"use client";

import { useMemo, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const LanguageTest = dynamic(() => import("@/components/LanguageTest"), { ssr: false });

const copy = {
  fr: {
    titleKids: "Inscrire mon enfant en cours particulier",
    titleAdults: "M'inscrire en cours particulier",
    intro: "Dites-nous qui vous êtes et quels créneaux reviennent chaque semaine.",
    formStep: "Informations et horaires",
    testStep: "Test de niveau",
    confirmationStep: "Confirmation",
    parentName: "Nom du parent",
    firstNameKids: "Prénom de l'enfant",
    firstNameAdults: "Prénom",
    lastName: "Nom",
    email: "E-mail",
    phone: "WhatsApp / téléphone",
    country: "Pays",
    age: "Âge de l'enfant",
    language: "Langue souhaitée",
    goals: "Objectifs",
    schedule: "Créneaux hebdomadaires souhaités",
    scheduleHelp: "Chaque créneau se répète chaque semaine. Vous pourrez les confirmer avec notre équipe.",
    day: "Jour",
    time: "Heure de début",
    duration: "Durée",
    addSlot: "Ajouter un créneau",
    remove: "Supprimer",
    submit: "Continuer",
    saving: "Enregistrement…",
    choose: "Votre demande est enregistrée. Choisissez la suite.",
    takeTest: "Passer le test de niveau",
    takeTestHelp: "Votre résultat sera ajouté à votre demande.",
    skip: "Je commence de zéro",
    skipHelp: "Aucun niveau ne sera attribué maintenant.",
    done: "Merci, nous vous contacterons au plus vite.",
    error: "L'enregistrement a échoué. Vérifiez vos informations puis réessayez.",
  },
  ar: {
    titleKids: "تسجيل طفلي في الدروس الفردية",
    titleAdults: "التسجيل في الدروس الفردية",
    intro: "أخبرونا بمعلومات المتعلم والمواعيد الأسبوعية المناسبة.",
    formStep: "المعلومات والمواعيد",
    testStep: "اختبار المستوى",
    confirmationStep: "تأكيد التسجيل",
    parentName: "اسم ولي الأمر",
    firstNameKids: "الاسم الشخصي للطفل",
    firstNameAdults: "الاسم الشخصي",
    lastName: "الاسم العائلي",
    email: "البريد الإلكتروني",
    phone: "واتساب / الهاتف",
    country: "البلد",
    age: "عمر الطفل",
    language: "اللغة المطلوبة",
    goals: "الأهداف",
    schedule: "المواعيد الأسبوعية المناسبة",
    scheduleHelp: "يتكرر كل موعد أسبوعياً، وسيتواصل فريقنا معكم لتأكيده.",
    day: "اليوم",
    time: "وقت البداية",
    duration: "المدة",
    addSlot: "إضافة موعد",
    remove: "حذف",
    submit: "متابعة",
    saving: "جارٍ الحفظ…",
    choose: "تم تسجيل طلبكم. اختاروا الخطوة التالية.",
    takeTest: "إجراء اختبار المستوى",
    takeTestHelp: "سنضيف النتيجة إلى طلب التسجيل.",
    skip: "البدء من الصفر",
    skipHelp: "سيبقى المستوى والنتيجة فارغين حالياً.",
    done: "شكراً، سنتواصل معكم في أقرب وقت ممكن.",
    error: "تعذر تسجيل الطلب. تحققوا من المعلومات ثم حاولوا مجدداً.",
  },
};

const days = {
  fr: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
  ar: ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"],
};

const languages = ["English", "Spanish", "French", "Arabic"];

export default function OneToOneRegistrationClient() {
  const locale = useLocale() === "ar" ? "ar" : "fr";
  const t = copy[locale];
  const searchParams = useSearchParams();
  const audience = searchParams.get("audience") === "adults" ? "adults" : "kids";
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [intakeToken, setIntakeToken] = useState("");
  const submissionKey = useRef(null);
  const [form, setForm] = useState({
    parentName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Morocco",
    age: "",
    language: "English",
    goals: "",
  });
  const [schedule, setSchedule] = useState([{ weekday: 0, start_time: "18:00", duration_minutes: 60 }]);
  const durationOptions = audience === "kids" ? [60, 75, 90] : [60, 75, 90, 120];
  const direction = locale === "ar" ? "rtl" : "ltr";
  const testSupported = ["English", "Spanish"].includes(form.language);

  const testFormData = useMemo(() => ({
    language: form.language === "English" && audience === "kids" ? "childEnglish" : form.language,
    userType: audience === "kids" ? "parent" : "student",
    childInfo: audience === "kids" ? { firstName: form.firstName, lastName: form.lastName, age: form.age } : undefined,
    studentInfo: audience === "adults" ? { firstName: form.firstName, lastName: form.lastName, email: form.email, phoneNumber: form.phone } : undefined,
  }), [audience, form]);

  const updateSlot = (index, field, value) => {
    setSchedule((current) => current.map((slot, slotIndex) => (
      slotIndex === index ? { ...slot, [field]: field === "start_time" ? value : Number(value) } : slot
    )));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    submissionKey.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/one-to-one/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionKey: submissionKey.current,
          email: form.email,
          phone: form.phone,
          firstName: form.firstName,
          lastName: form.lastName,
          audienceType: audience,
          language: form.language,
          formData: { ...form, audience_type: audience, enrollment_type: "one_to_one" },
          schedule,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.data?.intake_token) throw new Error(result.error || "Intake failed");
      setIntakeToken(result.data.intake_token);
      setStep(testSupported ? "choice" : "done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (submissionError) {
      console.error(submissionError);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  const completePlacement = async (results) => {
    const response = await fetch("/api/one-to-one/placement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intakeToken, score: results.score, level: results.level }),
    });
    if (!response.ok) throw new Error("Placement update failed");
  };

  if (step === "test") {
    return <LanguageTest formData={testFormData} onComplete={completePlacement} />;
  }

  return (
    <main className="cp-root min-h-screen bg-[#eef4fc] px-4 py-16 text-[#243349]" dir={direction}>
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-center gap-3 text-sm font-bold">
          <span className="rounded-full bg-[#3a6cb4] px-4 py-2 text-white">1 · {t.formStep}</span>
          <span className={`rounded-full px-4 py-2 ${step !== "form" ? "bg-[#3a6cb4] text-white" : "bg-white text-[#6a7994]"}`}>
            2 · {testSupported ? t.testStep : t.confirmationStep}
          </span>
        </div>

        <section className="rounded-[32px] border border-[#e4ecf7] bg-white p-6 shadow-xl shadow-blue-900/10 md:p-10">
          <h1 className="text-3xl font-black text-[#22345a] md:text-4xl">
            {audience === "kids" ? t.titleKids : t.titleAdults}
          </h1>
          <p className="mt-3 text-[#6a7994]">{t.intro}</p>

          {step === "form" ? (
            <form onSubmit={submitForm} className="mt-8 space-y-8">
              <div className="grid gap-5 md:grid-cols-2">
                {audience === "kids" && <Field label={t.parentName} value={form.parentName} onChange={(value) => setForm({ ...form, parentName: value })} />}
                <Field label={audience === "kids" ? t.firstNameKids : t.firstNameAdults} value={form.firstName} onChange={(value) => setForm({ ...form, firstName: value })} />
                <Field label={t.lastName} value={form.lastName} onChange={(value) => setForm({ ...form, lastName: value })} />
                <Field label={t.email} type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
                <Field label={t.phone} type="tel" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
                <Field label={t.country} value={form.country} onChange={(value) => setForm({ ...form, country: value })} />
                {audience === "kids" && <Field label={t.age} type="number" min="8" max="17" value={form.age} onChange={(value) => setForm({ ...form, age: value })} />}
                <label className="block text-sm font-bold text-[#22345a]">
                  {t.language}
                  <select required value={form.language} onChange={(event) => setForm({ ...form, language: event.target.value })} className="mt-2 w-full rounded-xl border border-[#d7e3f6] bg-white px-4 py-3 font-medium outline-none focus:border-[#3a6cb4]">
                    {languages.map((language) => <option key={language}>{language}</option>)}
                  </select>
                </label>
                <label className="block text-sm font-bold text-[#22345a] md:col-span-2">
                  {t.goals}
                  <textarea required rows="3" value={form.goals} onChange={(event) => setForm({ ...form, goals: event.target.value })} className="mt-2 w-full rounded-xl border border-[#d7e3f6] px-4 py-3 font-medium outline-none focus:border-[#3a6cb4]" />
                </label>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#22345a]">{t.schedule}</h2>
                <p className="mt-1 text-sm text-[#6a7994]">{t.scheduleHelp}</p>
                <div className="mt-4 space-y-3">
                  {schedule.map((slot, index) => (
                    <div key={index} className="grid gap-3 rounded-2xl bg-[#f4f8ff] p-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
                      <Select label={`${t.day} ${index + 1}`} value={slot.weekday} onChange={(value) => updateSlot(index, "weekday", value)} options={days[locale].map((label, value) => ({ value, label }))} />
                      <Field label={t.time} type="time" value={slot.start_time} onChange={(value) => updateSlot(index, "start_time", value)} />
                      <Select label={t.duration} value={slot.duration_minutes} onChange={(value) => updateSlot(index, "duration_minutes", value)} options={durationOptions.map((minutes) => ({ value: minutes, label: `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, "0")}` }))} />
                      {schedule.length > 1 && <button type="button" onClick={() => setSchedule(schedule.filter((_, slotIndex) => slotIndex !== index))} className="rounded-xl px-3 py-3 text-sm font-bold text-[#e26b4d]">{t.remove}</button>}
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => setSchedule([...schedule, { weekday: 0, start_time: "18:00", duration_minutes: 60 }])} className="mt-4 rounded-full border border-[#3a6cb4] px-5 py-2.5 text-sm font-bold text-[#3a6cb4]">+ {t.addSlot}</button>
              </div>

              {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-700">{error}</p>}
              <button disabled={loading} className="w-full rounded-full bg-[#ef8266] px-7 py-4 font-extrabold text-white shadow-lg shadow-orange-900/20 disabled:opacity-60">{loading ? t.saving : t.submit}</button>
            </form>
          ) : step === "choice" ? (
            <div className="mt-8">
              <p className="text-lg font-bold text-[#22345a]">{t.choose}</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <button type="button" onClick={() => setStep("test")} className="rounded-2xl border-2 border-[#3a6cb4] p-6 text-start transition hover:bg-[#eef4fc]">
                  <strong className="block text-xl text-[#22345a]">{t.takeTest}</strong>
                  <span className="mt-2 block text-sm text-[#6a7994]">{t.takeTestHelp}</span>
                </button>
                <button type="button" onClick={() => setStep("done")} className="rounded-2xl border border-[#e4ecf7] p-6 text-start transition hover:bg-[#eef4fc]">
                  <strong className="block text-xl text-[#22345a]">{t.skip}</strong>
                  <span className="mt-2 block text-sm text-[#6a7994]">{t.skipHelp}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-2xl bg-[#eef4fc] p-6 text-lg font-bold text-[#22345a]">
              {t.done}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function Field({ label, type = "text", value, onChange, ...props }) {
  return (
    <label className="block text-sm font-bold text-[#22345a]">
      {label}
      <input required type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-[#d7e3f6] px-4 py-3 font-medium outline-none focus:border-[#3a6cb4]" {...props} />
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="block text-sm font-bold text-[#22345a]">
      {label}
      <select required value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-[#d7e3f6] bg-white px-4 py-3 font-medium outline-none focus:border-[#3a6cb4]">
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}
