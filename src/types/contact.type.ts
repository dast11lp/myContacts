export interface Contact {
    id: number;
    name: string;
    phone: string;
    date_of_birth: string;
    address: string;
    email: string;
    
}

export type NewContact = Omit<Contact, 'id'>;