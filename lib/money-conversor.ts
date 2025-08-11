export function centsToBRL(cents: number): string {
  const reais = cents / 100;
  return reais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function centsToFloatString(cents: number): string {
    const amout = centsToBRL(cents);
    return amout.replace('R$', '').replace(',','.').trim();
}