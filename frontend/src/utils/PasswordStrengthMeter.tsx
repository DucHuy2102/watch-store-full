import { Check, X } from 'lucide-react';
import React from 'react';

interface PasswordCriteriaProps {
    password: string;
}

const PasswordCriteria: React.FC<PasswordCriteriaProps> = ({ password }) => {
    const criteria = [
        { label: 'At least 6 characters', isMet: password.length >= 6 },
        { label: 'Contains uppercase letter', isMet: /[A-Z]/.test(password) },
        { label: 'Contains lowercase letter', isMet: /[a-z]/.test(password) },
        { label: 'Contains a number', isMet: /\d/.test(password) },
        { label: 'Contains special character', isMet: /[^A-Za-z0-9]/.test(password) },
    ];

    return (
        <div className='mt-2 space-y-1.5'>
            {criteria.map((item) => (
                <div key={item.label} className='flex items-center text-xs'>
                    {item.isMet ? (
                        <Check className='size-3.5 text-green-500 mr-2' />
                    ) : (
                        <X className='size-3.5 text-gray-500 mr-2' />
                    )}
                    <span className={item.isMet ? 'text-green-500' : 'text-gray-400'}>
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

interface PasswordStrengthMeterProps {
    password: string;
}

export const getStrength = (pass: string): number => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
};

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
    const strength = getStrength(password);

    const getColor = (strength: number): string => {
        switch (strength) {
            case 0:
                return 'text-red-500';
            case 1:
                return 'text-red-400';
            case 2:
                return 'text-yellow-500';
            case 3:
                return 'text-yellow-400';
            default:
                return 'text-green-500';
        }
    };

    const getBarColor = (strength: number): string => {
        switch (strength) {
            case 0:
                return 'bg-red-500';
            case 1:
                return 'bg-red-400';
            case 2:
                return 'bg-yellow-500';
            case 3:
                return 'bg-yellow-400';
            default:
                return 'bg-green-500';
        }
    };

    const getStrengthText = (strength: number): string => {
        switch (strength) {
            case 0:
                return 'Very Weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            default:
                return 'Strong';
        }
    };

    return (
        <div className='bg-black/20 p-3 rounded-lg border border-white/5'>
            <div className='flex justify-between items-center mb-2'>
                <span className='text-xs text-gray-400'>Password strength</span>
                <span className={`text-xs font-medium ${getColor(strength)}`}>
                    {getStrengthText(strength)}
                </span>
            </div>

            <div className='flex items-center space-x-1'>
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className={`h-1.5 flex-1 rounded-full transition-colors duration-300 
                        ${index < strength ? getBarColor(strength) : 'bg-gray-700'}`}
                    />
                ))}
            </div>
            <PasswordCriteria password={password} />
        </div>
    );
};

export default PasswordStrengthMeter;
