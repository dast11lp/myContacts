export default function calcularEdad(date_birth: string): number {
    const today = new Date();
    const birth = new Date(date_birth);

    return today.getFullYear() - birth.getFullYear() - 
        (today < new Date(birth.setFullYear(birth.getFullYear())) ? 1 : 0);
}

const fecha: string = '1990-10-20'; 
console.log(calcularEdad(fecha)); 
