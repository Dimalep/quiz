export default  interface User {
    id: number,
    login: string;
    password?: string;
    create_at: string;
    update_at: string;
    role?: string;
    is_registered: boolean;
}