import React from 'react';
import { Select } from '../ui';

interface GenerationOptionsProps {
  tone: 'professional' | 'casual' | 'enthusiastic';
  length: 'short' | 'medium' | 'long';
  onToneChange: (tone: 'professional' | 'casual' | 'enthusiastic') => void;
  onLengthChange: (length: 'short' | 'medium' | 'long') => void;
}

const TONE_OPTIONS = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'enthusiastic', label: 'Enthusiastic' }
];

const LENGTH_OPTIONS = [
  { value: 'short', label: 'Short' },
  { value: 'medium', label: 'Medium' },
  { value: 'long', label: 'Long' }
];

export const GenerationOptions: React.FC<GenerationOptionsProps> = ({
  tone,
  length,
  onToneChange,
  onLengthChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Select
        label="Tone"
        value={tone}
        onChange={(e) => onToneChange(e.target.value as typeof tone)}
        options={TONE_OPTIONS}
      />
      <Select
        label="Length"
        value={length}
        onChange={(e) => onLengthChange(e.target.value as typeof length)}
        options={LENGTH_OPTIONS}
      />
    </div>
  );
}; 