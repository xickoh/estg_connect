import React, { FC, useEffect, useMemo, useState } from "react";
import "./Styles.css";

type CountdownProps = {
  targetIso?: string;
  eventLabel?: string;
  dateLabel?: string;
};

type TimeLeft = {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const pad = (value: number) => value.toString().padStart(2, "0");

const Countdown: FC<CountdownProps> = ({
  targetIso = "2026-05-27T00:00:00+01:00",
  eventLabel = "FALTA POUCO",
  dateLabel = "27 DE MAIO 2026",
}) => {
  const targetMs = useMemo(() => new Date(targetIso).getTime(), [targetIso]);

  const getTimeLeft = (): TimeLeft => {
    const now = Date.now();
    const diff = Math.max(0, targetMs - now);

    return {
      totalMs: diff,
      days: Math.floor(diff / DAY),
      hours: Math.floor((diff % DAY) / HOUR),
      minutes: Math.floor((diff % HOUR) / MINUTE),
      seconds: Math.floor((diff % MINUTE) / SECOND),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetMs]);

  return (
    <section className="countdown" id="countdown">
      <div className="countdown__badge">{eventLabel}</div>

      <div className="countdown__row">
        <div className="countdown__unit">
          <p className="countdown__value">{timeLeft.days}</p>
          <p className="countdown__label">DIAS</p>
        </div>

        <span className="countdown__separator">:</span>

        <div className="countdown__unit">
          <p className="countdown__value">{pad(timeLeft.hours)}</p>
          <p className="countdown__label">HORAS</p>
        </div>

        <span className="countdown__separator">:</span>

        <div className="countdown__unit">
          <p className="countdown__value">{pad(timeLeft.minutes)}</p>
          <p className="countdown__label">MIN</p>
        </div>

        <span className="countdown__separator">:</span>

        <div className="countdown__unit">
          <p className="countdown__value">{pad(timeLeft.seconds)}</p>
          <p className="countdown__label">SEG</p>
        </div>
      </div>

      <div className="countdown__divider" />
      <p className="countdown__date">{dateLabel}</p>
    </section>
  );
};

export default Countdown;
