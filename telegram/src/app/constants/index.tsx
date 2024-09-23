export const DEPOSIT_ADDRESS = "UQARMY0cdifWNXid-CxBUn-S-gjmx8AhEZ8BLZZpld1jLJLC"
export const DEPOSIT_RECEIVER_ADDRESS = "0:a34909e3de87433929dfa6c7664e4c4a662fe5867d96c346f673bf9304c4871b"
export const DEFAULT_MAGGOO_URL = "https://raw.githubusercontent.com/ersanyakit/maggoo/refs/heads/main/maggoo-app/public/assets/%s/%s_%s.png"

export const DEFAULT_API_URL = "https://api.kewl.exchange"
export const getUserAvatarUrl = (userId: number) => {
    const totalAvatars = 62;
    const positiveUserId = Math.abs(userId);
    const avatarIndex = positiveUserId % totalAvatars;
    const folder = Math.floor(avatarIndex / 10) + 1;  // Klasörü belirlemek için
    return DEFAULT_MAGGOO_URL.replace("%s", folder.toString()).replace("%s", "Worm").replace("%s", folder.toString());
};

export const generateImage = (tokenId: number, part: string) => {
    return DEFAULT_MAGGOO_URL.replace("%s", tokenId.toString()).replace("%s", part).replace("%s", tokenId.toString());
};

 
