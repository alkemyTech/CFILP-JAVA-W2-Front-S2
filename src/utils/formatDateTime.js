import { format } from 'date-fns';

export function formatDateTime(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm:ss');
}