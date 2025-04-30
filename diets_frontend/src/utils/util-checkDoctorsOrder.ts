export function validateDoctorsOrder(userlevel: any, weight: any, height: any) {

  if (isNaN(weight) || isNaN(height)) {
    weight = parseInt(weight);
    height = parseInt(height);
  }
  return (userlevel === 1 || userlevel === 0) && (weight > 0 && weight !== null) && (height > 0 && height !== null);

}