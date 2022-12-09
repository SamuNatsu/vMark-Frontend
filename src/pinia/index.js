import { useI18NStore } from "./I18N";
import { useSkinStore } from "./Skin";
import { useUserStore } from "./User";

const stores = {};

export const registerStore = async ()=>{
    stores.i18n = useI18NStore();
    stores.skin = useSkinStore();
    stores.user = useUserStore();

    await stores.i18n.init();
    await stores.skin.init();
    await stores.user.init();
}

export default stores;
