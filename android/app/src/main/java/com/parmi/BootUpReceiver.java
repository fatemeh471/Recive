package com.parmi;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class BootUpReceiver extends BroadcastReceiver {
 
    @Override
    public void onReceive(Context context, Intent intent) {
        
  if (intent.getAction().equals(Intent.ACTION_BOOT_COMPLETED)) {
            
                         // Open the app
   Intent sintent = context.getPackageManager().getLaunchIntentForPackage( "com.parmi");
            context.startActivity( sintent );
            
                         // Open the service code
            context.startService( new Intent(context,  HeartbeartService.class) );
            // Log.e(TAG, "Brodcast received!!!");
        }
    }
}




