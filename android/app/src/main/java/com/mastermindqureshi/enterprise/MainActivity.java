package com.mastermindqureshi.enterprise;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    public MainActivity() {
        registerPlugin(DownloadPdfPlugin.class);
    }
}
