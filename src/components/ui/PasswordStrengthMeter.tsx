// src/components/ui/PasswordStrengthMeter.tsx — NEW
//
// Renders a 4-bar strength meter that updates as the user types.
// Matches the server-side validatePasswordStrength() rules exactly.

import { useMemo } from 'react';

interface PasswordStrength {
  score:    0 | 1 | 2 | 3 | 4;  // 0=empty, 1=weak, 2=fair, 3=good, 4=strong
  label:    string;
  color:    string;              // Tailwind bg class
  textColor: string;
  hints:    string[];
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: '', color: 'bg-gray-200', textColor: 'text-gray-400', hints: [] };

  const hints: string[] = [];
  let score = 0;

  if (password.length >= 8)                       score++; else hints.push('At least 8 characters');
  if (/[A-Z]/.test(password))                     score++; else hints.push('One uppercase letter');
  if (/[0-9]/.test(password))                     score++; else hints.push('One number');
  if (/[^a-zA-Z0-9]/.test(password))              score++; else hints.push('One special character (!@#$%...)');

  const map: Record<number, { label: string; color: string; textColor: string }> = {
    1: { label: 'Weak',   color: 'bg-red-500',    textColor: 'text-red-500'    },
    2: { label: 'Fair',   color: 'bg-amber-500',  textColor: 'text-amber-500'  },
    3: { label: 'Good',   color: 'bg-blue-500',   textColor: 'text-blue-500'   },
    4: { label: 'Strong', color: 'bg-emerald-500', textColor: 'text-emerald-600' },
  };

  return {
    score:     score as PasswordStrength['score'],
    hints,
    ...(map[score] ?? map[1]),
  };
}

interface Props {
  password: string;
  className?: string;
}

export const PasswordStrengthMeter = ({ password, className = '' }: Props) => {
  const strength = useMemo(() => getPasswordStrength(password), [password]);

  if (!password) return null;

  return (
    <div className={`mt-2 space-y-1.5 ${className}`}>
      {/* Bar */}
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className={`h-1 flex-1 transition-all duration-300 ${
              i <= strength.score ? strength.color : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Label */}
      <div className="flex items-center justify-between">
        {strength.label && (
          <span className={`text-xs font-semibold ${strength.textColor}`}>
            {strength.label}
          </span>
        )}
      </div>

      {/* Hints */}
      {strength.hints.length > 0 && (
        <ul className="space-y-0.5">
          {strength.hints.map(hint => (
            <li key={hint} className="text-xs text-gray-400 flex items-center gap-1.5">
              <span className="w-1 h-1 bg-gray-300 rounded-full inline-block flex-shrink-0" />
              {hint}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
