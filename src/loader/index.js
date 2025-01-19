import store from "../store/store";

export const roomLoader = async () => {
    const dump = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("");
        }, 2000);
    });

    return dump;
};
