export function isValid(data: any) {
  const values = Object.keys(data)

  if(values.length > 2) return false
  if(!data.name) return false
  if(!data.sex) return false
  return true
}