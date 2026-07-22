import type {ReactNode} from 'react';
import s from './MovieGrid.module.css';

export const MovieGrid = ({children}: {children: ReactNode}) => (
  <div className={s.grid}>{children}</div>
);
