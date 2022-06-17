import { NimmstaLayout } from "nimmsta-web-library";

export class PickingLayout extends NimmstaLayout {
    constructor(name: string, ean: string) {
        const xml = `
        <?xml version="1.0" encoding="utf-8"?>
        <NimmstaLayout name="Picking Layout">
            <device width="1.54" height="1.54" pxx="200" pxy="200">
                <screen default="true" name="default">
                    <staticElements>
                        <statusbar />
                        <cell x="3" horizontalAlignment="left" fontSize="11pt">Name</cell>
                        <cell x="3" horizontalAlignment="left" fontSize="auto" name="name"></cell>
                        <horizontalLine y="110"></horizontalLine>
                        <cell x="3" horizontalAlignment="left" fontSize="11pt">EAN</cell>
                        <cell x="3" horizontalAlignment="left" fontSize="auto" name="ean"></cell>
                    </staticElements>
                </screen>
            </device>
        </NimmstaLayout>
        `;
        super(xml, { "name": name, "ean": ean });
    }
}