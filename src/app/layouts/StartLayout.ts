import { NimmstaLayout } from "nimmsta-web-library";

export class StartLayout extends NimmstaLayout {
    constructor(title: string) {
        const xml = `
        <?xml version="1.0" encoding="utf-8"?>
        <NimmstaLayout name="Success Layout">
            <device width="1.54" height="1.54" pxx="200" pxy="200">
                <screen default="true" name="default">
                    <staticElements>
                        <statusbar/>
                        <cell horizontalAlignment="center" y="40" wrapMode="wrap" maxLines="2" name="title"></cell>
                        <horizontalLine/>
                        <button horizontalAlignment="center" x="25" y="80" fontSize="20pt" width="150" height="80" name="NEXT">NEXT ORDER</button>
                    </staticElements>
                </screen>
            </device>
        </NimmstaLayout>
        `;
        super(xml, { "title": title });
    }
}