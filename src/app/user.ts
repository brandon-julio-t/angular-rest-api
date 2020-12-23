export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geolocation;
}

interface Geolocation {
  lat: number;
  lng: number;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
