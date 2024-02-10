export function notEqualToZeroValidator(control:any) {
    const value = control.value;
  
    if (value !== 0) {
      return null; // Validation passes
    } else {
      return { notEqualToZero: true }; // Validation fails
    }
  }