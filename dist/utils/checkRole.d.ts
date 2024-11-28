export declare function checkRoleLevel(userId: number, level: string): Promise<void>;
export declare function checkUserHasAccount(jwtId: number): Promise<void>;
export declare function checkuserIsAdmin(jwtId: number): Promise<{
    role: {
        id: number;
        name: string;
    };
} & {
    id: number;
    first_name: string;
    last_name: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    gdpr: Date;
    created_at: Date;
    updated_at: Date;
    is_active: boolean;
    token: string | null;
    role_id: number;
}>;
