declare interface Window {
    TelegramLoginWidget: (params: {
        bot_id: string;
        data_auth_url: string;
        corner_radius?: number;
        request_access?: boolean;
        callback?: (user: TelegramUser) => void;
    }) => void;
}

interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    auth_date: number;
    hash: string;
}
