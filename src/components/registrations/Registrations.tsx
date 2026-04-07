import React from "react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./Styles.css";


const REGISTRATION_CLOSE_DATE = new Date("2026-05-27T00:00:00+01:00");

const BASE_URL = "https://localhost:7131" as const
const REGISTRATION_API_ENDPOINT = `${BASE_URL}/api/Inscricao/adicionar` as const;

// ─── Zod schema ─────────────────────────────────────────────────────────────
z.config(z.locales.pt())

const schema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  email: z.email("Email inválido"),
  telefone: z
    .string()
    .min(9, "Contacto inválido")
    .regex(/^\+?[0-9\s\-()]+$/, "Apenas números, espaços e + são permitidos"),
  profissao: z.string().min(2, "Profissão é obrigatória"),
  instituicao: z.string().min(2, "Instituição é obrigatória"),
  cargo: z.string().optional(),
  numMecanografico: z.string().optional(),
  restricaoAlimentar: z.string().optional(),
  direitoImagem: z.literal(true, {
    error: () => ({ message: "É necessário aceitar para continuar" }),
  }),
});

type FormData = z.infer<typeof schema>;

// ─── Stats ───────────────────────────────────────────────────────────────────
const STATS = [
  { value: "300+", label: "Participantes" },
  { value: "5", label: "Oradores" },
  { value: "1", label: "Dia Épico" },
  { value: "∞", label: "Networking" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────
function Badge({ children }: { children: React.ReactNode }) {
  return <span className="reg-badge">{children}</span>;
}

function StatsRow() {
  return (
    <div className="reg-stats">
      {STATS.map((s) => (
        <div className="reg-stat" key={s.label}>
          <span className="reg-stat-value">{s.value}</span>
          <span className="reg-stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function ClosedContent() {
  return (
    <div className="reg-closed">
      <Badge>Inscrições encerradas</Badge>
      <h1 className="reg-title">Garante o teu passe</h1>
      <p className="reg-closed-msg">
        As inscrições para este evento já se encontram encerradas.
        <br />
        Obrigado pelo interesse, esperamos contar contigo na próxima edição!
      </p>
      <StatsRow />
    </div>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}
function Field({ label, error, required, children }: FieldProps) {
  return (
    <div className={`reg-field${error ? " reg-field--error" : ""}`}>
      <label className="reg-label">
        {label}
        {required && <span className="reg-required">*</span>}
      </label>
      {children}
      {error && <span className="reg-error-msg">{error}</span>}
    </div>
  );
}

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    await fetch(REGISTRATION_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    reset();
  }

  if (isSubmitSuccessful) {
    return (
      <div className="reg-success">
        <div className="reg-success-icon" aria-hidden="true">
          ✓
        </div>
        <h2 className="reg-success-title">Inscrição submetida!</h2>
        <p className="reg-success-text">Recebemos a tua inscrição.</p>
      </div>
    );
  }

  return (
    <div className="reg-form-wrapper">
      <div className="reg-form-header">
        <Badge>Junta-te a nós</Badge>
        <h1 className="reg-title">Garante o teu passe</h1>
        <p className="reg-subtitle">Inscrição rápida e gratuita.</p>
      </div>

      <form className="reg-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="reg-form-grid">
          <Field label="Nome" error={errors.nome?.message} required>
            <input
              className="reg-input"
              type="text"
              placeholder="O teu nome completo"
              {...register("nome")}
            />
          </Field>

          <Field label="Email" error={errors.email?.message} required>
            <input
              className="reg-input"
              type="email"
              placeholder="exemplo@email.com"
              {...register("email")}
            />
          </Field>

          <Field
            label="Contacto telefónico"
            error={errors.telefone?.message}
            required
          >
            <input
              className="reg-input"
              type="tel"
              placeholder="+351 912 345 678"
              {...register("telefone")}
            />
          </Field>

          <Field label="Profissão" error={errors.profissao?.message} required>
            <input
              className="reg-input"
              type="text"
              placeholder="A tua profissão"
              {...register("profissao")}
            />
          </Field>

          <Field
            label="Instituição (empresa/escola)"
            error={errors.instituicao?.message}
            required
          >
            <input
              className="reg-input"
              type="text"
              placeholder="Nome da instituição"
              {...register("instituicao")}
            />
          </Field>

          <Field label="Cargo (se aplicável)" error={errors.cargo?.message}>
            <input
              className="reg-input"
              type="text"
              placeholder="O teu cargo"
              {...register("cargo")}
            />
          </Field>

          <Field
            label="Número mecanográfico (se aplicável)"
            error={errors.numMecanografico?.message}
          >
            <input
              className="reg-input"
              type="text"
              placeholder="Nº mecanográfico"
              {...register("numMecanografico")}
            />
          </Field>
        </div>

        <Field
          label="Restrições alimentares"
          error={errors.restricaoAlimentar?.message}
        >
          <textarea
            className="reg-input reg-textarea"
            placeholder="Indica aqui eventuais restrições ou alergias alimentares…"
            rows={4}
            {...register("restricaoAlimentar")}
          />
        </Field>

        <div
          className={`reg-checkbox-field${errors.direitoImagem ? " reg-field--error" : ""}`}
        >
          <label className="reg-checkbox-label">
            <input
              type="checkbox"
              className="reg-checkbox"
              {...register("direitoImagem")}
            />
            <span className="reg-checkbox-custom" aria-hidden="true" />
            <span className="reg-checkbox-text">
              Autorizo a captação e utilização da minha imagem para fins de
              divulgação do evento. <span className="reg-required">*</span>
            </span>
          </label>
          {errors.direitoImagem && (
            <span className="reg-error-msg">
              {errors.direitoImagem.message}
            </span>
          )}
        </div>

        <button type="submit" className="reg-submit" disabled={isSubmitting}>
          {isSubmitting ? "A enviar…" : "Enviar inscrição"}
        </button>
      </form>

      <StatsRow />
    </div>
  );
}

const Registrations: FC = () => {
  const now = new Date();
  const closed = now >= REGISTRATION_CLOSE_DATE

  return (
    <section className="reg-section">
      <div className="reg-container">
        {closed ? <ClosedContent /> : <RegistrationForm />}
      </div>
    </section>
  );
};

export default Registrations;
