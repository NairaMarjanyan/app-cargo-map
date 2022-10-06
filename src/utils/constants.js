export const SERVER_URL =
    process.env.REACT_APP_SERVER_URL || window.location.origin;

export const COMPANY_TYPE = {
    transport: "vehicle",
    load: "load",
    expediter: "expediter"
};

export const VEHICLE_CATEGORY_TYPE = {
    trailer: "trailer",
    truck: "truck",
    semitrailer: "semitrailer",
    minibus: "minibus"
};

export const COMPANY_STATUSES = {
    unverified: "unverified",
    verified: "verified",
    blocked: "blocked"
};

export const PALLET_TYPES = {
    euro: "euro",
    other: "other"
};

export const PACKING_TYPES = {
    pallet: "pallet",
    box: "box",
    bag: "bag",
    other: "other"
};

export const LOADING_TYPES = {
    top: "верхняя",
    side: "боковая",
    back: "задняя",
    withFullUncovering: "с полной растентовкой",
    withRacksRemoval: "со снятием поперечных перекладин",
    withoutGates: "без ворот",
    withCrossBarsRemoved: "со снятием стоек",
    tailLift: "гидроборт",
    ramp: "аппарели",
    withCrate: "с обрешеткой",
    withSides: "с бортами",
    lateralFrom2Sides: "боковая с 2-х сторон",
    notSpecified: "не указан"
};

export const ADR_TYPES = {
    noadr: "noadr",
    adr1: "adr1",
    adr2: "adr2",
    adr3: "adr3",
    adr4: "adr4",
    adr5: "adr5",
    adr6: "adr6",
    adr7: "adr7",
    adr8: "adr8",
    adr9: "adr9"
};

const adrOptions = Object.values(ADR_TYPES);
adrOptions[0] = "No ADR";
export const ADR_OPTIONS = adrOptions;

export const LOADING_OPTIONS = [
    {
        id: "top",
        name: "верхняя"
    },
    {
        id: "side",
        name: "боковая"
    },
    { id: "back", name: "задняя" },
    { id: "withFullUncovering", name: "с полной растентовкой" },
    { id: "withRacksRemoval", name: "со снятием поперечных перекладин" },
    { id: "withoutGates", name: "без ворот" },
    { id: "withCrossBarsRemoved", name: "со снятием стоек" },
    { id: "tailLift", name: "гидроборт" },
    { id: "ramp", name: "аппарели" },
    { id: "withCrate", name: "с обрешеткой" },
    { id: "withSides", name: "с бортами" },
    { id: "lateralFrom2Sides", name: "боковая с 2-х сторон" },
    { id: "notSpecified", name: "не указан" }
];

export const PERMIT_TYPES = {
    cmr: "cmr",
    tir: "tir",
    t1: "t1",
    cemt: "cemt"
};
export const PERMIT_OPTIONS = Object.values(PERMIT_TYPES);
export const VEHICLE_TYPE_OPTIONS = Object.values(VEHICLE_CATEGORY_TYPE);
