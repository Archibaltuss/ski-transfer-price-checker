export interface Route {
  id: string
  from_airport: string
  from_name: string
  to_resort: string
  to_name: string
}

export interface CalculateResponse {
  price_chf: number
  route_name: string
  distance_km: number
  passengers: number
  currency: string
}
