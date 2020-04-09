package com.parmi;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.provider.Telephony;
import android.telephony.SmsMessage;
import android.util.Log;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;


public class SmsReceiver extends BroadcastReceiver {
    private final String TAG = this.getClass().getSimpleName();

    @Override
    public void onReceive(Context context, Intent intent) {
        Bundle extras = intent.getExtras();

        String strMessage = "";

        if (extras != null) {
            Object[] smsextras = (Object[]) extras.get("pdus");

            for (int i = 0; i < smsextras.length; i++) {
                SmsMessage smsmsg = SmsMessage.createFromPdu((byte[]) smsextras[i]);

                String strMsgBody = smsmsg.getMessageBody().toString();
                String strMsgSrc = smsmsg.getOriginatingAddress();

                strMessage += "SMS from " + strMsgSrc + " : " + strMsgBody;

                Log.i(TAG, strMessage);
                Bundle bundle = new Bundle();

                Intent service = new Intent(context, HeartbeatEventService.class);
                bundle.putString("body", strMsgBody);
                bundle.putString("from", strMsgSrc);
                service.putExtras(bundle);
                context.startService(service);
                HeadlessJsTaskService.acquireWakeLockNow(context);
            }

        }

    }
}