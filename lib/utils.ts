import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function winChance(qtdTickets: number, qtdSelledTickets: number) {
  const result = (qtdTickets / qtdSelledTickets) * 100;
  return result.toFixed(2).replace('.00', '');
}