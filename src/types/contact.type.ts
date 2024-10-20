export interface Address {
    street: string;
    city: string;
    department: string;
    zip_code: string;
}

export interface Contact {
    id: number;
    name: string;
    phone: string;
    date_of_birth: string;
    // address: Address;
    address: string;
    email: string;
    
}

export type NewContact = Omit<Contact, 'id'>;