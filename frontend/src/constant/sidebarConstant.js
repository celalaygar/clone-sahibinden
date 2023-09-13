import * as ROLE from "./roleConstant";

export const linkList = [
    {
        to: "/index",
        icon: "home",
        name: "Anasayfa",
        submenu: [],
        role: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]
    },
    {
        to: "/search-user",
        icon: "user-circle",
        name: "Personel",
        submenu: [],
        role: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]
    },
    {
        to: "/search-company",
        icon: "minus",
        name: "Şirket İşlemleri",
        submenu: [],
        role: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]
    },
    {
        to: "",
        icon: "users",
        name: "Müşteri İşlemleri",
        submenu: [
            {
                to: "/search-company",
                icon: "minus",
                name: "Şirket İşlemleri",
                submenu: [],
                role: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]
            }, {
                to: "/search-customer",
                icon: "minus",
                name: "Müşteri İşlemleri",
                submenu: [],
                role: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]
            }, {
                to: "/search-customer-orders",
                icon: "minus",
                name: "Sipariş İşlemleri",
                submenu: [],
                role: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]
            }],
        role: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]
    }, {
        to: "/contact-page",
        icon: "phone",
        name: "İletişim",
        submenu: [],
        role: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]
    }, {
        to: "/info-page",
        icon: "question-circle",
        name: "Bilgi",
        submenu: [],
        role: [ROLE.ROLE_ADMIN, ROLE.ROLE_MANAGER]
    },
];