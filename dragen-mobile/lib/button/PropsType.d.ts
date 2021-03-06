import React from 'react';
export interface ButtonProps {
    type?: 'primary' | 'warning' | 'ghost';
    size?: 'large' | 'small';
    activeStyle?: boolean | Object;
    disabled?: boolean;
    onClick?: (x?: any) => void;
    loading?: boolean;
    delayPressIn?: number;
    delayPressOut?: number;
    style?: React.CSSProperties;
}
//# sourceMappingURL=PropsType.d.ts.map