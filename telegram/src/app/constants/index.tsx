export const DEPOSIT_ADDRESS = "UQARMY0cdifWNXid-CxBUn-S-gjmx8AhEZ8BLZZpld1jLJLC"
export const DEFAULT_MAGGOO_URL = "https://raw.githubusercontent.com/ersanyakit/maggoo/refs/heads/main/maggoo-app/public/assets/%s/Worm_%s.png"

export const getUserAvatarUrl = (userId: number) => {
    const totalAvatars = 62;
    const positiveUserId = Math.abs(userId);
    const avatarIndex = positiveUserId % totalAvatars;
    const folder = Math.floor(avatarIndex / 10) + 1;  // Klasörü belirlemek için
    console.log(userId,folder)

    return DEFAULT_MAGGOO_URL.replace("%s", folder.toString()).replace("%s", folder.toString());
};
