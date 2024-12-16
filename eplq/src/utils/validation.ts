export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

export function validatePassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
}

export function validateLocationData(data: string): boolean {
  // This is a simple check. You might want to implement more robust validation
  try {
    const parsed = JSON.parse(data);
    return typeof parsed === 'object' && parsed !== null;
  } catch {
    return false;
  }
}

