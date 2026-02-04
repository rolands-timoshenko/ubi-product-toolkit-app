export interface UbiProductApiReponse {
    devices: {
        deviceType: string;
        guids: string[];
        icon: {
            id: string;
            resolutions: [number, number][];
        };
        id: string;
        images: {
            default: string;
            nopadding: string;
            topology: string;
        };
        line: {
            id: string;
            name: string;
        };
        product: {
            abbrev: string;
            name: string;
        };
        shortnames: string[];
        sku: string;
        sysid: string;
        sysids: string[];
        triplets: {
            k1: string;
            k2?: string;
        }[];
        uisp: {
            bleServices: Record<string, unknown>;
            firmware: {
                board: string[];
                platform: string;
            };
            line: string;
            nameLegacy: string[];
        };
        videos: Record<string, unknown>;
    }[];
}
